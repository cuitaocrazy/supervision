import {
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil')
import * as path from 'path'
import { prettyJSONString, buildOrg, buildWallet } from './AppUtil'
// const { prettyJSONString, buildOrg, buildWallet } = require('./AppUtil')
import { SubscribeWithSign } from '../API'


const createSubscribeStr = 'Create'
const completeSubscribeStr = 'complete'
const appUser = 'Bank Admin'
const subscribeContract = 'SubscribeContract'

export async function createSubscribe(item: SubscribeWithSign) {
	try {
		item.status = 'create'
		const orgSV = item.SVOrgID
		const orgUSV = item.USVOrgID
		const orgFinance = item.BankID

		const ccp = await buildOrg(orgFinance) //todo 
		const gatewayOptions = await buildGateWayOption()
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway()
		await gateway.connect(ccp, gatewayOptions)
		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName, subscribeContract)
		const itemStr = JSON.stringify(item)
		const tmapDataJson = {
			Subscribe: Buffer.from(itemStr)
		}
		const statefulTxn = contract.createTransaction(createSubscribeStr)
		await statefulTxn.setTransient(tmapDataJson)

		const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
		statefulTxn.setEndorsingPeers(channelPeers)

		const transactionId = statefulTxn.getTransactionId()
		const subscribeID = await statefulTxn.submit()
		// const subscribeID = await contract.evaluateTransaction(createSubscribeStr)
		gateway.disconnect()
		return subscribeID
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
	}
}


export async function completeSubscribe(item: SubscribeWithSign, subscribeID: string) {
	try {

		const orgFinance = item.BankID
		item.status = 'complete'
		const ccp = await buildOrg(orgFinance)

		const gatewayOptions = await buildGateWayOption()

		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway()
		await gateway.connect(ccp, gatewayOptions)
		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName, subscribeContract)
		const tmapData = Buffer.from(JSON.stringify(item))
		const statefulTxn = contract.createTransaction(completeSubscribeStr)
		const channelPeers = await getChannelPeers(gateway, channelName, ["bankpeer-api.127-0-0-1.nip.io:8080", "edbpeer-api.127-0-0-1.nip.io:8080", "edu1peer-api.127-0-0-1.nip.io:8080"])
		statefulTxn.setEndorsingPeers(channelPeers)
		await statefulTxn.setTransient({
			Subscribe: tmapData
		})
		const result = await statefulTxn.submit(subscribeID)
		gateway.disconnect()
		return prettyJSONString(result.toString())
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
	}
}


const getChannelPeers = async (gateway: Gateway, channelName: string, peerNames: string[]) => {
	try {
		const network = await gateway.getNetwork(channelName);
		const channel = network.getChannel();
		const channelPeers = [];
		console.log("sssssssssss")
		console.log(channel.getEndorsers().length)
		for (const peer of channel.getEndorsers()) {
			channelPeers.push(peer);
		}
		return channelPeers;
	}
	catch (error) {
		throw new Error(`Unable to get channel peers: ${error.message}`);
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

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Wallet', 'Bank')
	const wallet = await buildWallet(Wallets, walletPath)
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: appUser, discovery: { enabled: true, asLocalhost: false } }
	return gateWapOption
}

// export async function financeInit() {
// 	const walletPath = path.join(__dirname, 'Wallet', 'Bank')
// 	const wallet = await buildWallet(Wallets, walletPath)
// 	// const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
// 	// /mnt/d/wslnodeproject/supervision/fabric/dev/organizations
// 	const ccp = await buildOrg("Bank")
// 	const caClient = buildCAClient(ccp, 'bankca-api.127-0-0-1.nip.io:8080') //todo
// 	await enrollAdmin(caClient, wallet, 'BankMSP');
// 	await registerAndEnrollUser(caClient, wallet, 'BankMSP', appUser)
// 	console.log("初始化完成")
// }

// export async function USVInit() {
// 	const walletPath = path.join(__dirname, 'Wallet', 'Edu1')
// 	const wallet = await buildWallet(Wallets, walletPath)
// 	// const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
// 	// /mnt/d/wslnodeproject/supervision/fabric/dev/organizations
// 	const ccp = await buildOrg("Edu1")
// 	const caClient = buildCAClient(ccp, 'edu1ca-api.127-0-0-1.nip.io:8080') //todo
// 	await enrollAdmin(caClient, wallet, 'Edu1MSP');
// 	await registerAndEnrollUser(caClient, wallet, 'Edu1MSP', appUser)
// 	console.log("初始化完成")
// }



