import {
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
import * as path from 'path'
import { prettyJSONString, buildOrg, buildWallet } from './AppUtil'
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil')
import { Subscribe } from '../API'
const cancelSubscribeStr = 'cancel'
const appUser = 'Edb Admin'
const subscribeContract = 'SubscribeContract'

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Wallet', 'Edb')
	const wallet = await buildWallet(Wallets, walletPath)
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: appUser, discovery: { enabled: true, asLocalhost: false } }
	return gateWapOption
}

export async function cleanSubscribe(item: Subscribe, SubscribeID: string) {
	try {
		const orgSV = item.SVOrgID
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
		console.log(result.toString())
		gateway.disconnect()
		return result
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
	}
}






//todo 确认下
const getChannelName = () => {
	return "edb-supervision-channel"
}


//todo 确认下
const getChainCodeName = () => {
	return "eduTest"
}
export async function SVInit() {
	const walletPath = path.join(__dirname, 'Wallet', 'Edb')
	const wallet = await buildWallet(Wallets, walletPath)
	// const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
	// /mnt/d/wslnodeproject/supervision/fabric/dev/organizations
	const ccp = await buildOrg("Edb")
	const caClient = buildCAClient(ccp, 'edbca-api.127-0-0-1.nip.io:8080') //todo
	await enrollAdmin(caClient, wallet, 'EdbMSP');
	await registerAndEnrollUser(caClient, wallet, 'EdbMSP', appUser)
	console.log("初始化完成")
}

const getChannelPeers = async (gateway: Gateway, channelName: string, peerNames: string[]) => {
	try {
		const network = await gateway.getNetwork(channelName);
		const channel = network.getChannel();
		const channelPeers = [];
		for (const peerName of peerNames) {
			const endorser = channel.getEndorser(peerName)
			channelPeers.push(endorser);
		}
		return channelPeers;
	}
	catch (error) {
		throw new Error(`Unable to get channel peers: ${error}`);
	}
}


