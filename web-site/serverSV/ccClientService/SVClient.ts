import {
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
import * as path from 'path'
import { prettyJSONString, buildOrg, buildWallet } from './AppUtil'
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil')
const cancelSubscribeStr = 'cancel'
const appUser = 'Edb Admin'
const subscribeContract = 'SubscriptionContract'
const completeSubscribeStr = "complete"
const queryStr = "query"
const chainCode = "subscription"

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Wallet', 'Edb')
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
		return result
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
		return "FAIL"
	}
}

export async function completeSubscribe(svID: string, subscribeID: string) {
	try {
		const ccp = await buildOrg(svID)
		const gatewayOptions = await buildGateWayOption()
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway()
		await gateway.connect(ccp, gatewayOptions)
		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName, subscribeContract)
		const statefulTxn = contract.createTransaction(completeSubscribeStr)
		const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
		statefulTxn.setEndorsingPeers(channelPeers)
		const tmapDataJson = {
			"SubscribeID": Buffer.from(subscribeID)
		}
		await statefulTxn.setTransient(tmapDataJson)
		await statefulTxn.submit()
		gateway.disconnect()
		return subscribeID
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
		return "FAIL"
	}
}


export async function querySubscribe(svID: string, subscribeID: string) {
	try {
		const ccp = await buildOrg(svID)
		const gatewayOptions = await buildGateWayOption()
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway()
		await gateway.connect(ccp, gatewayOptions)
		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName, subscribeContract)
		const statefulTxn = contract.createTransaction(queryStr)
		const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
		statefulTxn.setEndorsingPeers(channelPeers)
		const result = await statefulTxn.evaluate(subscribeID)
		gateway.disconnect()
		return prettyJSONString(result.toString())
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
		return "FAIL"
	}
}

const getChannelName = () => {
	return "edb-supervision-channel"
}

const getChainCodeName = () => {
	return chainCode
}
export async function SVInit() {
	const walletPath = path.join(__dirname, 'Wallet', 'Edb')
	const wallet = await buildWallet(Wallets, walletPath)
	const ccp = await buildOrg("Edb")
	const caClient = buildCAClient(ccp, 'edbca-api.127-0-0-1.nip.io:8080')
	await enrollAdmin(caClient, wallet, 'EdbMSP');
	await registerAndEnrollUser(caClient, wallet, 'EdbMSP', appUser)
	console.log("初始化完成")
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


