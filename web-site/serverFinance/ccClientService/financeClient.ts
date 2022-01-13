import {
	Gateway,
	Wallets,
	GatewayOptions,
	ContractEvent
} from 'fabric-network'
import * as path from 'path'
import { buildOrg, buildWallet } from './AppUtil'
import { Subscribe } from '../API'
import { v4 } from 'uuid'
import {mockSaveLocalDB,mockgetLocalDB} from '../mockDb'
import * as moment from 'moment';

const createSubscribeStr = 'create'
const preOrderStr = 'preorder'
const payStr = 'pay'
const appUser = 'Bank Admin'
const subscribeContract = 'SubscriptionContract'
const chainCode = "subscription"
const queryContract = 'query'
export async function paySubscribe(item: Subscribe) {
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
		const itemStr = JSON.stringify(item)
		const tmapDataJson = {
			Payload: Buffer.from(itemStr)
		}
		const statefulTxn = contract.createTransaction(payStr)
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

export const listenCreateResult = async (orgBankId: string) => {
	const gateway = new Gateway()
	const ccp = await buildOrg(orgBankId)
	const gatewayOptions = await buildGateWayOption()
	await gateway.connect(ccp, gatewayOptions)
	const channelName = getChannelName()
	const chainCodeName = getChainCodeName()
	const network = await gateway.getNetwork(channelName)
	const contract = network.getContract(chainCodeName, subscribeContract)
	const listener = async (event: ContractEvent) => {

		if (event.eventName.indexOf("create") > -1 && event.eventName.indexOf(orgBankId) > -1) {
			const payLoad = event.payload.toString()
			const subscribeId = JSON.parse(payLoad).SubscribeID
			console.log('listenCreateResult')
			console.log(payLoad)
			const querystatefulTxn = contract.createTransaction(queryContract)
			const querychannelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])					
			querystatefulTxn.setEndorsingPeers(querychannelPeers)
			const result = await querystatefulTxn.evaluate(subscribeId)

			const subscribe:Subscribe = JSON.parse(result.toString())

			// const subscribe:Subscribe = JSON.parse(payLoad)
			subscribe.BankTranDate = moment(Date.now()).format('YYYYMMDD'),
			subscribe.BankTranTime =  moment(Date.now()).format('HHmmss')
			subscribe.PayerStub = genePayerStub()
			subscribe.BankTranID = geneTradeNo()
			subscribe.PayUrl = "http://localhost:3001/pay?BankTranID="+subscribe.BankTranID
			console.log(subscribe)
			const itemStr = JSON.stringify(subscribe)
			const tmapDataJson = {
				Payload: Buffer.from(itemStr)
			}
			const statefulTxn = contract.createTransaction(preOrderStr)
			await statefulTxn.setTransient(tmapDataJson)
			const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
			statefulTxn.setEndorsingPeers(channelPeers)
			const saveResult = await statefulTxn.submit()
			mockSaveLocalDB(subscribe)
			// emitter.emit(payLoadSubscribeId + '_preOrderSuccess')
		}
	} 
	await contract.addContractListener(listener)
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
	return "edb-supervision-channel"
}

const getChainCodeName = () => {
	return chainCode
}

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Wallet', 'Bank')
	const wallet = await buildWallet(Wallets, walletPath)
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: appUser, discovery: { enabled: true, asLocalhost: false } }
	return gateWapOption
}


const geneTradeNo = () => { //获取预订单号
  return v4().replaceAll('-', '')
}
const genePayerStub = () => { //获取存根
  return v4()
}





