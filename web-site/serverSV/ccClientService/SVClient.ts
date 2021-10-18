import {
	Gateway,
	Wallets,
	GatewayOptions
} from 'fabric-network';
const path = require('path');
const { prettyJSONString, buildSV, buildWallet } = require('./AppUtil.ts');
const { buildCAClient, enrollAdmin, registerAndEnrollUser } = require('./CAUtil.ts');
const completeSubscribeStr = 'completeSubscribe';


const buildGateWayOption = async () => {
	const walletPath = path.join(__dirname, 'Edb')
	const wallet = await buildWallet(Wallets, walletPath)
	const ccp = buildSV();
	const caClient = buildCAClient(ccp, 'ca.org1.example.com'); //tdo
	await enrollAdmin(caClient, wallet, 'Edb');
	await registerAndEnrollUser(caClient, wallet, 'Edb', 'appUser', 'org1.department1');
	const gateWapOption: GatewayOptions = { wallet: wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } }
	return gateWapOption
}

export async function completeSubscribe(SubscribeID: string, gatewayOptions: GatewayOptions, orgSV: any, orgUSV: any, orgFinance: any) {
	try {
		const ccp = buildSV();
		const walletPath = path.join(__dirname, 'Edb')
		const wallet = await buildWallet(Wallets, walletPath)
		const channelName = getChannelName()
		const chainCodeName = getChainCodeName()
		const gateway = new Gateway();
		//connect using Discovery enabled
		await gateway.connect(ccp, gatewayOptions);
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chainCodeName);
		const statefulTxn = contract.createTransaction(completeSubscribeStr);
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance);
		const tmapData = Buffer.from(JSON.stringify({
			"SubscribeID": SubscribeID
		}));
		await statefulTxn.setTransient({
			Subscribe: tmapData
		});
		statefulTxn.setEndorsingOrganizations(orgSV, orgUSV, orgFinance);
		await statefulTxn.submit(SubscribeID);
		gateway.disconnect();
		return prettyJSONString("complete Subscribe");
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
	}
}






const getChannelName = () => {
	return "edb-supervision-channel"
}

//todo 确认下
const getChainCodeName = () => {
	return "Edu1MSP-BankMSP-EdbMSP"
}



