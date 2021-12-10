
import {
	ContractEvent,
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
const path = require('path')
const { buildOrg, buildWallet } = require('./AppUtil')


const appUser = 'Edu1 Admin'
const cancelSubscribeStr = 'cancel'
const subscribeContract = 'SubscriptionContract'
const chainCode = "subscription"  //"sadf"
const channelName = "edb-supervision-channel"

export const listenCreateResult = async (subscribeID: string, USVId: string, emitter) => {
	const gateway = new Gateway()
	const ccp = await buildOrg(USVId)
	const gatewayOptions = await buildGateWayOption()
	await gateway.connect(ccp, gatewayOptions)
	const channelName = getChannelName()
	const chainCodeName = getChainCodeName()
	const network = await gateway.getNetwork(channelName)
	const contract = network.getContract(chainCodeName, subscribeContract)
	const listener = async (event: ContractEvent) => {
		console.log('eventname:' + event.eventName)
		if (event.eventName.indexOf("create") > -1 && event.eventName.indexOf(USVId) > -1) {
			const payLoad = event.payload.toString()
			const payLoadSubscribeId = JSON.parse(payLoad).SubscribeID
			if (subscribeID === payLoadSubscribeId) {
				emitter.emit(payLoadSubscribeId + '_createSuccess')
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
		throw new Error(`Unable to get channel peers: ${error.message}`);
	}
}

const getChannelName = () => {
	return channelName
}

const getChainCodeName = () => {
	return chainCode
}

