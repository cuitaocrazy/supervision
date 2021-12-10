import {
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
import * as path from 'path'
import { buildOrg, buildWallet } from './AppUtil'
import { Subscribe } from '../API'


const createSubscribeStr = 'create'
const appUser = 'Bank Admin'
const subscribeContract = 'SubscriptionContract'
const chainCode = "subscription"

export async function createSubscribe(item: Subscribe) {
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
			Subscribe: Buffer.from(itemStr)
		}
		const statefulTxn = contract.createTransaction(createSubscribeStr)
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


//todo 确认下
const getChannelName = () => {
	return "edb-supervision-channel"
}

//todo 确认下
const getChainCodeName = () => {
	return chainCode
	// return "sadf"
}

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Wallet', 'Bank')
	const wallet = await buildWallet(Wallets, walletPath)
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: appUser, discovery: { enabled: true, asLocalhost: false } }
	return gateWapOption
}




