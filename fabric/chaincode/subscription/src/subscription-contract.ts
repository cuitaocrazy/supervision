/*
 * SPDX-License-Identifier: Apache-2.0
 */

import crypto = require('crypto');
import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Shim } from 'fabric-shim';
import { Subscription, SubscriptionStatus } from './subscription';
import { SubscriptionEvent, SubscriptionEventType } from './subscription-event';
import { SubscriptionID } from './subscription-id';

@Info({ title: 'SubscriptionContract', description: '用于订购时的合约' })
export class SubscriptionContract extends Contract {

    @Transaction()
    public async create(ctx: Context): Promise<string> {
        const transientSubscriptionKey = 'Subscribe'
        const transientData = ctx.stub.getTransient()
        if (transientData.size === 0 || !transientData.has(transientSubscriptionKey)) {
            throw new Error(`在 transient 中没有找到 [${transientSubscriptionKey}] 域`)
        }
        const subscription: Subscription = Subscription.fromUint8Array(transientData.get(transientSubscriptionKey))
        // TODO 字段检查
        const clientMSPID = ctx.clientIdentity.getMSPID()
        if (subscription.BankID !== clientMSPID) {
            throw new Error(`只能由支付渠道[${subscription.BankID}]发起`)
        }
        const subscriptionID = SubscriptionID.fromSubscription(subscription)
        const subscriptionIDString = subscriptionID.getIDStr()
        subscription.SubscribeID = subscriptionIDString
        subscription.Status = SubscriptionStatus.create
        const collectionName = subscriptionID.getCollectionName()
        if (this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`目标合约[${subscriptionIDString}]已经存在`)
        }
        await ctx.stub.putPrivateData(collectionName, subscriptionIDString, subscription.toUint8Array())
        const event = new SubscriptionEvent(subscriptionIDString, SubscriptionEventType.create)
        ctx.stub.setEvent(event.getName(), event.getPayload())
        return subscriptionIDString
    }

    @Transaction()
    public async cancel(ctx: Context): Promise<void> {
        const transientSubscriptionIDKey = "SubscribeID"
        const transientData = ctx.stub.getTransient()
        if (transientData.size === 0 || !transientData.has(transientSubscriptionIDKey)) {
            throw new Error(`在 transient 中没有找到 [${transientSubscriptionIDKey}] 域`)
        }
        const clientMSPID = ctx.clientIdentity.getMSPID()
        const subscriptionIDString = transientData.get(transientSubscriptionIDKey).toString()
        const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
        const usvOrgID = subscriptionID.USVOrgID
        if (usvOrgID !== clientMSPID) {
            throw new Error(`取消目标合约只能由受监管机构[${usvOrgID}]发起，实际是由[${clientMSPID}]发起。`)
        }
        const collectionName = subscriptionID.getCollectionName()
        if (!this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`目标合约[${subscriptionIDString}]不存在`)
        }
        const dataBytes = await ctx.stub.getPrivateData(collectionName, subscriptionIDString)
        const subscription: Subscription = Subscription.fromUint8Array(dataBytes)
        if (subscription.Status !== SubscriptionStatus.create) {
            throw new Error(`取消目标合约的状态[${subscription.Status}]，应该是[${SubscriptionStatus.create}]`)
        }
        subscription.Status = SubscriptionStatus.cancel
        await ctx.stub.putPrivateData(collectionName, subscriptionIDString, subscription.toUint8Array())
        const event = new SubscriptionEvent(subscriptionIDString, SubscriptionEventType.cancel)
        ctx.stub.setEvent(event.getName(), event.getPayload())
        return
    }

    @Transaction()
    public async complete(ctx: Context): Promise<void> {
        const transientSubscriptionIDKey = "SubscribeID"
        const transientData = ctx.stub.getTransient()
        if (transientData.size === 0 || !transientData.has(transientSubscriptionIDKey)) {
            throw new Error(`在 transient 中没有找到 [${transientSubscriptionIDKey}] 域`)
        }
        const clientMSPID = ctx.clientIdentity.getMSPID()
        const subscriptionIDString = transientData.get(transientSubscriptionIDKey).toString()
        const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
        const svOrgID = subscriptionID.SVOrgID
        if (svOrgID !== clientMSPID) {
            throw new Error(`完成目标合约只能由监管机构[${svOrgID}]发起，实际是由[${clientMSPID}]发起。`)
        }
        const collectionName = subscriptionID.getCollectionName()
        if (!this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`目标合约[${subscriptionIDString}]不存在`)
        }
        const dataBytes = await ctx.stub.getPrivateData(collectionName, subscriptionIDString)
        const subscription: Subscription = Subscription.fromUint8Array(dataBytes)
        if (subscription.Status !== SubscriptionStatus.create) {
            throw new Error(`取消目标合约的状态[${subscription.Status}]，应该是[${SubscriptionStatus.create}]`)
        }
        subscription.Status = SubscriptionStatus.complete
        await ctx.stub.putPrivateData(collectionName, subscriptionIDString, subscription.toUint8Array())
        const event = new SubscriptionEvent(subscriptionIDString, SubscriptionEventType.complete)
        ctx.stub.setEvent(event.getName(), event.getPayload())
        return
    }


    @Transaction(false)
    public async query(ctx: Context, subscriptionIDString: string): Promise<Subscription> {
        const clientMSPID = ctx.clientIdentity.getMSPID()
        const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
        if (![subscriptionID.USVOrgID, subscriptionID.BankID, subscriptionID.SVOrgID].find(value => value === clientMSPID)) {
            throw new Error(`查询合约[${subscriptionIDString}]的发起机构[${clientMSPID}]不是授权机构`)
        }
        const collectionName = subscriptionID.getCollectionName()
        if (!this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`查询合约[${subscriptionIDString}]的结果为空`)
        }
        const data = await ctx.stub.getPrivateData(collectionName, subscriptionIDString)
        return Subscription.fromUint8Array(data)
    }

    public async subscriptionExists(ctx: Context, collectionName: string, id: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getPrivateDataHash(collectionName, id);
        return (!!data && data.length > 0);
    }

}
