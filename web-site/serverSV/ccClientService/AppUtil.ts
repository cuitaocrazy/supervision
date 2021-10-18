/*
 * Copyright yada. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const fs = require('fs')
const path = require('path')


exports.buildUSV = () => {
	// todo 修改为实际地址
	const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

exports.buildSV = () => {
	// todo 修改为实际地址
	const ccpPath = path.resolve(__dirname, '..', '..', 'test-network',
		'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json')
	const fileExists = fs.existsSync(ccpPath)
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`)
	}
	const contents = fs.readFileSync(ccpPath, 'utf8')

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents)
	return ccp;
};

exports.buildFinance = () => {
	// todo 修改为实际地址
	const ccpPath = path.resolve(__dirname, '..', '..', 'test-network',
		'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json')
	const fileExists = fs.existsSync(ccpPath)
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`)
	}
	const contents = fs.readFileSync(ccpPath, 'utf8')

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents)
	return ccp;
};

exports.buildWallet = async (Wallets: { newFileSystemWallet: (arg0: any) => any; newInMemoryWallet: () => any; }, walletPath: any) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

exports.prettyJSONString = (inputString: string) => {
	if (inputString) {
		return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		return inputString;
	}
}


