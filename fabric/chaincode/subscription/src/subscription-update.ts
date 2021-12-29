import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Subscription, SubscriptionStatus } from './subscription';
import { SubscriptionEvent, SubscriptionEventType } from './subscription-event';
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
    eventType: SubscriptionEventType
    newState: SubscriptionStatus
}

const switchByUpdateName = (name: UPDATE_NAME, subscriptionID: SubscriptionID): UpdatingContrastInfo => {
    switch (name) {
        case "预下单":
            return {
                shouldBeOrg: subscriptionID.BankID,
                shouldBeOrgType: "银行",
                shouldBeState: SubscriptionStatus.create,
                eventType: SubscriptionEventType.create,
                newState: SubscriptionStatus.preorder
            };
        case "支付":
            return {
                shouldBeOrg: subscriptionID.BankID,
                shouldBeOrgType: "银行",
                shouldBeState: SubscriptionStatus.preorder,
                eventType: SubscriptionEventType.preorder,
                newState: SubscriptionStatus.pay
            };
        case "取消":
            return {
                shouldBeOrg: subscriptionID.USVOrgID,
                shouldBeOrgType: "受监管机构",
                shouldBeState: SubscriptionStatus.pay,
                eventType: SubscriptionEventType.pay,
                newState: SubscriptionStatus.cancel
            };
        case "完成":
            return {
                shouldBeOrg: subscriptionID.SVOrgID,
                shouldBeOrgType: "监管机构",
                shouldBeState: SubscriptionStatus.pay,
                eventType: SubscriptionEventType.pay,
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
    const payload = readPayload(ctx)
    const subscriptionIDString = payload.SubscribeID
    const clientMSPID = ctx.clientIdentity.getMSPID()
    const subscriptionID = SubscriptionID.fromSubscriptionIDString(subscriptionIDString)
    const { shouldBeOrg, shouldBeOrgType, shouldBeState, eventType, newState } = switchByUpdateName(name, subscriptionID)
    if (shouldBeOrg !== clientMSPID) {
        throw new Error(`操作[${name}] 由 ${shouldBeOrgType}[${shouldBeOrg}]发起，实际是由[${clientMSPID}]发起。`)
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
    const r: Subscription = { ...origSubscription, ...payload, Status: newState }
    await ctx.stub.putPrivateData(collectionName, subscriptionIDString, obj2Uint8Array(origSubscription))
    const event = new SubscriptionEvent(subscriptionIDString, eventType)
    ctx.stub.setEvent(event.getName(), event.getPayload())
    return subscriptionIDString
}

const readPayload = (ctx: Context): Subscription => {
    const key = 'Payload'
    const transientData = ctx.stub.getTransient()
    if (transientData.size === 0 || !transientData.has(key)) {
        throw new Error(`在 transient 中没有找到 [${key}] 域`)
    }
    return Subscription.fromUint8Array(transientData.get(key)!)
}