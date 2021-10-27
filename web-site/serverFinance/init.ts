import * as ccClient from './ccClientService/financeClient'
ccClient.financeInit().then(() => console.log('初始化完成'))
ccClient.SVInit().then(() => console.log('初始化完成'))
ccClient.USVInit().then(() => console.log('初始化完成'))

