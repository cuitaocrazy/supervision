const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const { prettyJSONString,buildSV} = require('./AppUtil.js');


const completeSubscribe = 'completeSubscribe';




export async function completeSubscribe(SubscribeID,orgSV,orgUSV,orgFinance) {
	try {
		const ccp = buildSV();
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
		const statefulTxn = contract.createTransaction('completeSubscribe');
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
const getChannelName = ()=>{
  return "ChannelName"
}

//todo 确认下
const getChainCodeName = ()=>{
  return "ChainCodeName"
}

