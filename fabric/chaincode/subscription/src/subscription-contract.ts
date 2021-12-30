/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Subscription, SubscriptionStatus } from './subscription';
import { SubscriptionEvent } from './subscription-event';
import { SubscriptionID } from './subscription-id';
import { obj2Uint8Array } from './util';
import { validateOrReject } from 'class-validator';
import { update } from './subscription-update';

@Info({ title: 'SubscriptionContract', description: '用于订购时的合约' })
export class SubscriptionContract extends Contract {

    @Transaction()
    public async create(ctx: Context): Promise<string> {
        const transientSubscriptionKey = 'Subscribe'
        const transientData = ctx.stub.getTransient()
        if (transientData.size === 0 || !transientData.has(transientSubscriptionKey)) {
            throw new Error(`在 transient 中没有找到 [${transientSubscriptionKey}] 域`)
        }
        const subscription: Subscription = Subscription.fromUint8Array(transientData.get(transientSubscriptionKey)!)
        await validateOrReject(subscription)
        const clientMSPID = ctx.clientIdentity.getMSPID()
        if (subscription.BankID !== clientMSPID) {
            throw new Error(`只能由支付渠道[${subscription.BankID}]发起`)
        }
        const subscriptionID = SubscriptionID.fromSubscription(subscription)
        const subscriptionIDString = subscriptionID.getIDStr()
        subscription.SubscribeID = subscriptionIDString
        subscription.Status = SubscriptionStatus.create
        const collectionName = subscriptionID.getCollectionName()
        if (await this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`目标合约[${subscriptionIDString}]已经存在`)
        }
        await ctx.stub.putPrivateData(collectionName, subscriptionIDString, obj2Uint8Array(subscription))
        const event = new SubscriptionEvent(subscriptionIDString, SubscriptionStatus.create)
        ctx.stub.setEvent(event.getName(), event.getPayload())
        return subscriptionIDString
    }
    /**
         * 预下单
         * @param ctx 上下文
         * @returns 预下单结果
         */
    @Transaction()
    public async preorder(ctx: Context): Promise<string> {
        return await update({ ctx: ctx, name: "预下单" })
    }

    @Transaction()
    public async pay(ctx: Context): Promise<string> {
        return await update({ ctx: ctx, name: "支付" })
    }


    @Transaction()
    public async cancel(ctx: Context): Promise<string> {
        return await update({ ctx: ctx, name: "取消" })
    }

    @Transaction()
    public async complete(ctx: Context): Promise<string> {
        return await update({ ctx: ctx, name: "完成" })
    }


    @Transaction(false)
    @Returns("Subscription")
    public async query(ctx: Context, subscriptionIDString: string): Promise<Subscription> {
        const clientMSPID = ctx.clientIdentity.getMSPID()
        const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
        if (![subscriptionID.USVOrgID, subscriptionID.BankID, subscriptionID.SVOrgID].find(value => value === clientMSPID)) {
            throw new Error(`查询合约[${subscriptionIDString}]的发起机构[${clientMSPID}]不是授权机构`)
        }
        const collectionName = subscriptionID.getCollectionName()
        if (! await this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`查询合约[${subscriptionIDString}]的结果为空`)
        }
        const data = await ctx.stub.getPrivateData(collectionName, subscriptionIDString)
        return Subscription.fromUint8Array(data)
    }

    public async subscriptionExists(ctx: Context, collectionName: string, id: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getPrivateDataHash(collectionName, id);
        return (!!data && data.length > 0);
    }

    /**
     * 删除合约
     * @param ctx 
     */
    @Transaction()
    public async delete(ctx: Context): Promise<void> {
        const transientSubscriptionIDKey = "SubscribeID"
        const transientData = ctx.stub.getTransient()
        if (transientData.size === 0 || !transientData.has(transientSubscriptionIDKey)) {
            throw new Error(`在 transient 中没有找到 [${transientSubscriptionIDKey}] 域`)
        }
        const clientMSPID = ctx.clientIdentity.getMSPID()
        const subscriptionIDString = transientData.get(transientSubscriptionIDKey)!.toString()
        const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
        const svOrgID = subscriptionID.SVOrgID
        if (svOrgID !== clientMSPID) {
            throw new Error(`删除合约只能由监管机构[${svOrgID}]发起，实际是由[${clientMSPID}]发起。`)
        }
        const collectionName = subscriptionID.getCollectionName()
        if (! await this.subscriptionExists(ctx, collectionName, subscriptionIDString)) {
            throw new Error(`目标合约[${subscriptionIDString}]不存在`)
        }
        await ctx.stub.deletePrivateData(collectionName, subscriptionIDString)
    }

}


