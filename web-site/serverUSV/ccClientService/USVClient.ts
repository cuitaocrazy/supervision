// const { Gateway, Wallets } = require('fabric-network');
import { SubscribeWithSign } from '../API';
import {
	ContractEvent,
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network';
const path = require('path');
const { prettyJSONString, buildUSV, buildWallet } = require('./AppUtil.ts');
const events = require('events');
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil.ts');


var emitter = new events.EventEmitter()
const listenCreateResult = async (gatewayOptions: GatewayOptions, SubscribeID: any, item: SubscribeWithSign, SVId: any, USVId: any, financeId: any) => {
	const gateway = new Gateway()
	const ccp = buildUSV()
	// const walletPath = path.join(__dirname, 'Edu1')
	// const wallet = await buildWallet(Wallets, walletPath)
	await gateway.connect(ccp, gatewayOptions);
	const channelName = getChannelName()
	const chainCodeName = getChainCodeName()
	const listenerName = getListenName("Create", USVId);
	const network = await gateway.getNetwork(channelName);
	const contract = network.getContract(chainCodeName);
	const listener = async (event: ContractEvent) => {
		if (event.eventName.indexOf("create") > -1 && event.eventName.indexOf(USVId) > -1) {
			const resultJSONString = event.payload.toString()
			const subscribeId = prettyJSONString(event.payload.toString())
			emitter.emit(subscribeId + '_createSuccess');
		}
	};
	await contract.addContractListener(listener)
}
async function cancelSubscribe(SubscribeID: string, gatewayOptions: GatewayOptions, orgSV: string, orgUSV: string, orgFinance: string) {
	try {
		const ccp = buildUSV();
		const walletPath = path.join(__dirname, 'Edu1')
		const wallet = await buildWallet(Wallets, walletPath)
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway();
		//connect using Discovery enabled
		await gateway.connect(ccp, gatewayOptions);

		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chainCodeName);

		const statefulTxn = contract.createTransaction('cancelSubscribe');
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance);

		const tmapData = Buffer.from(JSON.stringify({
			"SubscribeID": SubscribeID
		}));
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance);
		await statefulTxn.setTransient({
			Subscribe: tmapData
		});
		await statefulTxn.submit(SubscribeID);
		gateway.disconnect();
		return "cancel Subscribe"
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
	}
}

const getChannelName = () => {
	return "edb-supervision-channel";
}
// const getChainCodeName = (SubscribeID,SVId,USVId,financeId)=>{
//   return SVId+USVId+financeId+SubscribeID;
// }

const getChainCodeName = () => {
	return "edb-supervision-channelCode";
}

const getListenName = (mothed: string, USVId: string) => {
	return mothed + "-" + USVId;
}

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Edb')
	const wallet = await buildWallet(Wallets, walletPath)
	const ccp = buildUSV();
	const caClient = buildCAClient(ccp, 'ca.org1.example.com'); //todo
	await enrollAdmin(caClient, wallet, 'Edu1');
	await registerAndEnrollUser(caClient, wallet, 'Edu1', 'appUser');
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } }
	return gateWapOption
}