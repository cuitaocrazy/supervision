
import {
	ContractEvent,
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
const path = require('path')
import { buildOrg, buildWallet } from './AppUtil'
import { Subscribe } from '../API'

const appUser = 'Edu1 Admin'
const cancelSubscribeStr = 'cancel'
const subscribeContract = 'SubscriptionContract'
const preOrderContract = 'create'
const chainCode = "subscription"  //"sadf"
const channelName = "edb-supervision-channel"
const queryContract =  'query'

export async function preOrder(item: Subscribe) {
	try {
		const orgFinance = item.BankID
		const ccp = await buildOrg(orgFinance)
		const gatewayOptions = await buildGateWayOption()
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway()
		await gateway.connect(ccp, gatewayOptions)
		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName, subscribeContract)
		console.log('preorder')
		console.log(item)
		const itemStr = JSON.stringify(item)
		const tmapDataJson = {
			Payload: Buffer.from(itemStr)
		}
		const statefulTxn = contract.createTransaction(preOrderContract)
		await statefulTxn.setTransient(tmapDataJson)
		const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
		statefulTxn.setEndorsingPeers(channelPeers)
		const subscribeID = await statefulTxn.submit()
		gateway.disconnect()
		return subscribeID.toString()
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
		return "FAIL"
	}
}

export const listenPayResult = async (subscribeID: string, USVId: string, emitter) => {
	const gateway = new Gateway()
	const ccp = await buildOrg(USVId)
	const gatewayOptions = await buildGateWayOption()
	await gateway.connect(ccp, gatewayOptions)
	const channelName = getChannelName()
	const chainCodeName = getChainCodeName()
	const network = await gateway.getNetwork(channelName)
	const contract = network.getContract(chainCodeName, subscribeContract)
	const listener = async (event: ContractEvent) => {
		if (event.eventName.indexOf("pay") > -1 && event.eventName.indexOf(USVId) > -1) { //todo 不用indexOf查找
			const payLoad = event.payload.toString()
			const payLoadSubscribeId = JSON.parse(payLoad).SubscribeID
			if (subscribeID === payLoadSubscribeId) {
				emitter.emit(payLoadSubscribeId + '_paySuccess')
			}
			
		}
	}
	await contract.addContractListener(listener)
}


export const listenPreOrderResult = async (subscribeID: string, USVId: string, emitter) => {
	const gateway = new Gateway()
	const ccp = await buildOrg(USVId)
	const gatewayOptions = await buildGateWayOption()
	await gateway.connect(ccp, gatewayOptions)
	const channelName = getChannelName()
	const chainCodeName = getChainCodeName()
	const network = await gateway.getNetwork(channelName)
	const contract = network.getContract(chainCodeName, subscribeContract)
	const listener = async (event: ContractEvent) => {
		if (event.eventName.indexOf("preorder") > -1 && event.eventName.indexOf(USVId) > -1) {
			const payLoad = event.payload.toString()
			const payLoadSubscribeId = JSON.parse(payLoad).SubscribeID
			if (subscribeID === payLoadSubscribeId) {
				const querystatefulTxn = contract.createTransaction(queryContract)
				const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])					
				querystatefulTxn.setEndorsingPeers(channelPeers)
				console.log('query:  '+payLoadSubscribeId )
				const result = await querystatefulTxn.evaluate(payLoadSubscribeId)
				const subscribe = JSON.parse(result.toString())
				console.log('event')
				console.log(subscribe)
				emitter.emit(payLoadSubscribeId + '_preorder',subscribe)
			}
		}
	}
	await contract.addContractListener(listener)
}



const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Wallet', 'Edu1')
	const wallet = await buildWallet(Wallets, walletPath)
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: appUser, discovery: { enabled: true, asLocalhost: false } }
	return gateWapOption
}

export async function cleanSubscribe(orgSV: string, SubscribeID: string) {
	try {
		const ccp = await buildOrg(orgSV)
		const gatewayOptions = await buildGateWayOption()
		const gateway = new Gateway()
		await gateway.connect(ccp, gatewayOptions)
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName, subscribeContract)
		const tmapDataJson = {
			"SubscribeID": Buffer.from(SubscribeID)
		}
		const statefulTxn = contract.createTransaction(cancelSubscribeStr)
		await statefulTxn.setTransient(tmapDataJson)
		const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
		statefulTxn.setEndorsingPeers(channelPeers)
		const result = await statefulTxn.submit() 
		gateway.disconnect()
		return "Success"
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
		return "FAIL"
	}
}


const getChannelPeers = async (gateway: Gateway, channelName: string, peerNames: string[]) => {
	try {
		const network = await gateway.getNetwork(channelName);
		const channel = network.getChannel();
		const channelPeers = channel.getEndorsers().filter(peer => peerNames.includes(peer.name))
		return channelPeers;
	}
	catch (error) {
		throw new Error(`Unable to get channel peers: ${error.message}`
		);
	}
}

const getChannelName = () => {
	return channelName
}

const getChainCodeName = () => {
	return chainCode
}

