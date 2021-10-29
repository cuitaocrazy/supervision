
import {
	ContractEvent,
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
const path = require('path')
const { buildOrg, buildWallet } = require('./AppUtil')


const appUser = 'Edu1 Admin'
const subscribeContract = 'SubscribeContract'

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

const getChannelName = () => {
	return "edb-supervision-channel"
}

//todo
const getChainCodeName = () => {
	return "eduTest"
}

