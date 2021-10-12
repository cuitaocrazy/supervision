const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { prettyJSONString} = require('./AppUtil.js');

const createSubscribeEvent = 'CreateSubscribeEvent';
const listenCreateResult = (ccp,gatewayOptions,SubscribeID,item,SVId,USVId,financeId)=>{

const gateway = new Gateway();

await gateway.connect(ccp,
	{ wallet: wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });
	const channelName = getChannelName(SVId,USVId,financeId)
	const chainCodeName = getChainCodeName(SubscribeID,SVId,USVId,financeId)
	const listenerName = getListenName(SubscribeID,SVId,USVId,financeId);
	const network = await gateway.getNetwork(channelName);
	const contract = network.getContract(chainCodeName);

	const listener = await contract.addContractListener(listenerName, createSubscribeEvent, (err, event, blockNumber, transactionId, status) => {
  if (err) {
				//todo 错误时的处理
        console.error(err);
        return;
  }
  console.log(`Block Number: ${blockNumber} Transaction ID: ${transactionId} Status: ${status}`);
}

)


}

async function cancelSubscribe(SubscribeID,orgSV,orgUSV,orgFinance) {
	try {
		const ccp = buildUSV();
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

		const statefulTxn = contract.createTransaction('cancelSubscribe');
    statefulTxn.setEndorsingOrganizations(orgSV,orgUSV,orgFinance);
		await statefulTxn.setTransient({
			"SubscribeID" : SubscribeID
		});
		await statefulTxn.submit(SubscribeID);
		gateway.disconnect();
    return prettyJSONString(result.toString());
	} catch (error) {
		console.error(`******** FAILED to submit bid: ${error}`);
	}
}


//todo 确认下
const getChannelName = (SVId,USVId,financeId)=>{
  return SVId+USVId+financeId;
}

//todo 确认下
const getChainCodeName = (SubscribeID,SVId,USVId,financeId)=>{
  return SVId+USVId+financeId+SubscribeID;
}

const getListenName = (SubscribeID,SVId,USVId,financeId)=>{
  return SVId+USVId+financeId+SubscribeID;
}