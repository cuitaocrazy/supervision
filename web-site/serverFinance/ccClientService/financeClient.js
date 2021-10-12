const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { prettyJSONString,buildFinance} = require('./AppUtil.js');


const createSubscribe = 'CreateSubscribe';
const QuerySubscribe = 'QuerySubscribe';

export async function createSubscribe(SubscribeID,item,orgSV,orgUSV,orgFinance) {
	try {

		const ccp = buildFinance();
		//todo 改为实际路径
		const walletPath = path.join(__dirname, 'wallet/org1')
		const wallet = await buildWallet(Wallets, walletPath)
    const channelName = getChannelName()
    const chainCodeName = getChainCodeName()
		const gateway = new Gateway();
		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chainCodeName);
    const tmapData = Buffer.from(JSON.stringify(item));
    statefulTxn.setEndorsingOrganizations(orgSV,orgUSV,orgFinance);
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


export async function completeSubscribe(orgSV,orgUSV,orgFinance) {
	try {

		const ccp = buildFinance();
		//todo 改为实际路径
		const walletPath = path.join(__dirname, 'wallet/org1')
		const wallet = await buildWallet(Wallets, walletPath)
    const channelName = getChannelName()
    const chainCodeName = getChainCodeName()
		const gateway = new Gateway();
		//connect using Discovery enabled
		await gateway.connect(ccp,
			{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork(channelName);
		const contract = network.getContract(chainCodeName);

		// let statefulTxn = contract.createTransaction(createSubscribe);
    // await statefulTxn.submit(SubscribeID, item);

    // const createResult = await contract.evaluateTransaction('QuerySubscribe', SubscribeID);
    //todo 判断创建是否成功
		//'Submit Transaction: Propose a new subscribe');
    const tmapData = Buffer.from(JSON.stringify(item));
    statefulTxn.setEndorsingOrganizations(orgSV,orgUSV,orgFinance);
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


//todo 确认下
const getChannelName = ()=>{
  return "ChannelName"
}

//todo 确认下
const getChainCodeName = ()=>{
  return "ChainCodeName"
}