
import {
	ContractEvent,
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
const path = require('path')
const { prettyJSONString, buildUSV, buildWallet } = require('./AppUtil.ts')
const events = require('events')
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil.ts')


var emitter = new events.EventEmitter()
const listenCreateResult = async (subscribeID: any, USVId: any) => {
	const gateway = new Gateway()
	const ccp = buildUSV()
	const gatewayOptions = await buildGateWayOption()

	await gateway.connect(ccp, gatewayOptions)
	const channelName = getChannelName()
	const chainCodeName = getChainCodeName()
	const network = await gateway.getNetwork(channelName)
	const contract = network.getContract(chainCodeName)
	const listener = async (event: ContractEvent) => {
		if (event.eventName.indexOf("create") > -1 && event.eventName.indexOf(USVId) > -1) {
			const payLoadSubscribeId = prettyJSONString(event.payload.toString())
			if (subscribeID === payLoadSubscribeId) {
				emitter.emit(payLoadSubscribeId + '_createSuccess')
			}
		}
	}
	await contract.addContractListener(listener)
}
async function cancelSubscribe(subscribeID: string, orgSV: string, orgUSV: string, orgFinance: string) {
	try {
		const ccp = buildUSV()
		const walletPath = path.join(__dirname, 'Edu1')
		const wallet = await buildWallet(Wallets, walletPath)
		const gatewayOptions = await buildGateWayOption()
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway()
		//connect using Discovery enabled
		await gateway.connect(ccp, gatewayOptions)

		const network = await gateway.getNetwork(channelName)
		const contract = network.getContract(chainCodeName)

		const statefulTxn = contract.createTransaction('cancelSubscribe')
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance)

		const tmapData = Buffer.from(JSON.stringify({
			"SubscribeID": subscribeID
		}))
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance)
		await statefulTxn.setTransient({
			Subscribe: tmapData
		})
		await statefulTxn.submit(subscribeID)
		gateway.disconnect()
		return "cancel Subscribe"
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`)
	}
}

const getChannelName = () => {
	return "edb-supervision-channel"
}

//todo
const getChainCodeName = () => {
	return "ChainCodeName"
}


const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Edu1')
	const wallet = await buildWallet(Wallets, walletPath)
	const ccp = buildUSV()
	const caClient = buildCAClient(ccp, 'ca.org1.example.com')//todo
	await enrollAdmin(caClient, wallet, 'Edu1')
	await registerAndEnrollUser(caClient, wallet, 'Edu1', 'appUser')
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } }
	return gateWapOption
}