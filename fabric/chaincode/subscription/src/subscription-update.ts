import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Subscription, SubscriptionStatus } from './subscription';
import { SubscriptionEvent } from './subscription-event';
import { SubscriptionID } from './subscription-id';
import { obj2Uint8Array } from './util';
import { validateOrReject } from 'class-validator';

export type UPDATE_NAME = "预下单" | "支付" | "取消" | "完成"

class UpdateOperation {
    ctx: Context
    name: UPDATE_NAME
}

class UpdatingContrastInfo {
    shouldBeOrg: string
    shouldBeOrgType: "受监管机构" | "监管机构" | "银行"
    shouldBeState: SubscriptionStatus
    newState: SubscriptionStatus
}

const switchByUpdateName = (name: UPDATE_NAME, subscriptionID: SubscriptionID): UpdatingContrastInfo => {
    switch (name) {
        case "预下单":
            return {
                shouldBeOrg: subscriptionID.BankID,
                shouldBeOrgType: "银行",
                shouldBeState: SubscriptionStatus.create,
                newState: SubscriptionStatus.preorder
            };
        case "支付":
            return {
                shouldBeOrg: subscriptionID.BankID,
                shouldBeOrgType: "银行",
                shouldBeState: SubscriptionStatus.preorder,
                newState: SubscriptionStatus.pay
            };
        case "取消":
            return {
                shouldBeOrg: subscriptionID.USVOrgID,
                shouldBeOrgType: "受监管机构",
                shouldBeState: SubscriptionStatus.pay,
                newState: SubscriptionStatus.cancel
            };
        case "完成":
            return {
                shouldBeOrg: subscriptionID.SVOrgID,
                shouldBeOrgType: "监管机构",
                shouldBeState: SubscriptionStatus.pay,
                newState: SubscriptionStatus.complete
            };
        default:
            throw new Error(`操作[${name}] 尚未定义`)
    }
}

/**
 * 判断合约是否存在
 * @param ctx 上下文
 * @param collectionName 集合名称
 * @param id 要查询的合约id
 * @returns 
 */
export const isExist = async (ctx: Context, collectionName: string, id: string): Promise<boolean> => {
    const data: Uint8Array = await ctx.stub.getPrivateDataHash(collectionName, id);
    return (!!data && data.length > 0);
}
/**
 * 更新合约通用处理
 * @param param0 更新合约操作
 * @returns 
 */
export const update = async ({ ctx, name }: UpdateOperation): Promise<string> => {
    const payload = readPayload(ctx, name)
    const subscriptionIDString = payload.SubscribeID
    const clientMSPID = ctx.clientIdentity.getMSPID()
    const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
    const { shouldBeOrg, shouldBeOrgType, shouldBeState, newState } = switchByUpdateName(name, subscriptionID)
    if (shouldBeOrg !== clientMSPID) {
        // TODO 暂时关闭
        // throw new Error(`操作[${name}] 由 ${shouldBeOrgType}[${shouldBeOrg}]发起，实际是由[${clientMSPID}]发起。`)
    }
    const collectionName = subscriptionID.getCollectionName()
    if (! await isExist(ctx, collectionName, subscriptionIDString)) {
        throw new Error(`操作[${name}] 失败，目标合约[${subscriptionIDString}]不存在`)
    }
    const dataBytes = await ctx.stub.getPrivateData(collectionName, subscriptionIDString)
    const origSubscription: Subscription = Subscription.fromUint8Array(dataBytes)
    if (origSubscription.Status !== shouldBeState) {
        throw new Error(`操作[${name}] 失败，目标合约状态[${origSubscription.Status}]，应该是[${shouldBeState}]`)
    }
    const newSubscription: Subscription = { ...origSubscription, ...payload, Status: newState }
    await ctx.stub.putPrivateData(collectionName, subscriptionIDString, obj2Uint8Array(newSubscription))
    const event = new SubscriptionEvent(subscriptionIDString, newState)
    ctx.stub.setEvent(event.getName(), event.getPayload())
    return subscriptionIDString
}

const readPayload = (ctx: Context, opName: UPDATE_NAME | '创建' | '删除'): Subscription => {
    const key = 'Payload'
    const transientData = ctx.stub.getTransient()
    if (transientData.size === 0 || !transientData.has(key)) {
        throw new Error(`操作[${opName}]，在 transient 中没有找到 [${key}] 域`)
    }
    return Subscription.fromUint8Array(transientData.get(key)!)
}


export const create = async (ctx: Context): Promise<string> => {
    const payload = readPayload(ctx, "创建")
    await validateOrReject(payload)
    const clientMSPID = ctx.clientIdentity.getMSPID()
    if (payload.USVOrgID !== clientMSPID) {
        throw new Error(`只能由受监管渠道[${payload.USVOrgID}]发起，实际发起者`)
    }
    const subscriptionID = SubscriptionID.fromSubscription(payload)
    const subscriptionIDString = subscriptionID.getIDStr()
    const collectionName = subscriptionID.getCollectionName()
    if (await isExist(ctx, collectionName, subscriptionIDString)) {
        throw new Error(`目标合约[${subscriptionIDString}]已经存在`)
    }
    const subscription: Subscription = { ...payload, SubscribeID: subscriptionIDString, Status: SubscriptionStatus.create }
    await ctx.stub.putPrivateData(collectionName, subscriptionIDString, obj2Uint8Array(subscription))
    const event = new SubscriptionEvent(subscriptionIDString, SubscriptionStatus.create)
    ctx.stub.setEvent(event.getName(), event.getPayload())
    return subscriptionIDString
}


export const deleteObject = async (ctx: Context): Promise<string> => {
    const payload = readPayload(ctx, "删除")
    const clientMSPID = ctx.clientIdentity.getMSPID()
    const subscriptionID = SubscriptionID.fromSubscriptionIDString(payload.SubscribeID)
    const svOrgID = subscriptionID.SVOrgID
    if (svOrgID !== clientMSPID) {
        // TODO 暂时关闭
        // throw new Error(`删除合约只能由监管机构[${svOrgID}]发起，实际是由[${clientMSPID}]发起。`)
    }
    const collectionName = subscriptionID.getCollectionName()
    if (! await isExist(ctx, collectionName, payload.SubscribeID)) {
        throw new Error(`目标合约[${payload.SubscribeID}]不存在`)
    }
    await ctx.stub.deletePrivateData(collectionName, payload.SubscribeID)
    console.log(`----------${collectionName}--------------${payload.SubscribeID}-------------------`)
    return payload.SubscribeID
}