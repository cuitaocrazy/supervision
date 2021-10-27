/*
 * Copyright yada. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
import { Wallet } from 'fabric-network'
import * as fs from 'fs'
import * as path from 'path'


export async function buildOrg(org: string) {
	// todo 修改为实际地址
	const ccpPath = path.resolve(__dirname, 'CCP',
		'gateways', org + ' Gateway.json')
	const fileExists = fs.existsSync(ccpPath)
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`)
	}
	const contents = fs.readFileSync(ccpPath, 'utf8')
	const ccp = JSON.parse(contents)
	return ccp
};


export async function prettyJSONString(inputString) {
	if (inputString) {
		return JSON.stringify(JSON.parse(inputString), null, 2)
	}
	else {
		return inputString
	}
}

export async function buildWallet(Wallets, walletPath) {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
		Wallet
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
}
