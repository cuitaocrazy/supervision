import {
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network'
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil.ts');
const path = require('path')
const { prettyJSONString, buildFinance, buildWallet } = require('./AppUtil.js')
import { SubscribeWithSign } from '../API';

const createSubscribeStr = 'create'
const completeSubscribeStr = 'complete'

export async function createSubscribe(SubscribeID: string, gatewayOptions: GatewayOptions, item: SubscribeWithSign, orgSV, orgUSV, orgFinance) {
	try {

		const ccp = buildFinance();
		// const walletPath = path.join(__dirname, 'Bank')
		// const wallet = await buildWallet(Wallets, walletPath)
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway();
		await gateway.connect(ccp, gatewayOptions);
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chainCodeName);
		const tmapData = Buffer.from(JSON.stringify(item));
		const statefulTxn = contract.createTransaction(createSubscribeStr);
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance);
		await statefulTxn.setTransient({
			Subscribe: tmapData
		});
		const transactionId = statefulTxn.getTransactionId();
		await statefulTxn.submit(SubscribeID);
		const result = await contract.evaluateTransaction('QuerySubscribe', SubscribeID, transactionId);
		gateway.disconnect();
		return prettyJSONString(result.toString());
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
	}
}


export async function completeSubscribe(gatewayOptions: GatewayOptions, item: SubscribeWithSign, subscribeID: string, orgSV, orgUSV, orgFinance) {
	try {

		const ccp = buildFinance();
		// const walletPath = path.join(__dirname, 'Bank')
		// const wallet = await buildWallet(Wallets, walletPath)
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway();
		//connect using Discovery enabled
		await gateway.connect(ccp, gatewayOptions);
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chainCodeName);
		const tmapData = Buffer.from(JSON.stringify(item));
		const statefulTxn = contract.createTransaction(completeSubscribeStr);
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance);
		await statefulTxn.setTransient({
			Subscribe: tmapData
		});
		const transactionId = statefulTxn.getTransactionId();
		await statefulTxn.submit(subscribeID);
		const result = await contract.evaluateTransaction('QuerySubscribe', subscribeID, transactionId);
		gateway.disconnect();
		return prettyJSONString(result.toString());
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
	}
}


//todo 确认下
const getChannelName = () => {
	return "edb-supervision-channel"
}

//todo 确认下
const getChainCodeName = () => {
	return "ChainCodeName"
}

const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Edb')
	const wallet = await buildWallet(Wallets, walletPath)
	const ccp = buildFinance();
	const caClient = buildCAClient(ccp, 'ca.org1.example.com'); //todo
	await enrollAdmin(caClient, wallet, 'Edu1');
	await registerAndEnrollUser(caClient, wallet, 'Edu1', 'appUser');
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } }
	return gateWapOption
}