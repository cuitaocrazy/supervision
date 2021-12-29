/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object as FabricObject, Property } from 'fabric-contract-api';
import { IsAlphanumeric, IsPositive } from 'class-validator'

@FabricObject()
export class Subscription {

    /**
     * 订购合约ID
     */
    @Property()
    public SubscribeID: string
    /**
     * 受监管机构唯一标识
     */
    @Property()
    @IsAlphanumeric()
    public USVOrgID: string
    /**
     * 受监管机构商品ID
     */
    @Property()
    public USVItemID: string
    /**
     * 受监管机构商品名称
     */
    @Property()
    public USVItemName: string
    /**
     * 受监管机构商品描述
     */
    @Property()
    public USVItemDesc: string
    /**
     * 受监管机构订单号
     */
    @Property()
    @IsAlphanumeric()
    public USVOrderNo: string
    /**
     * 银行机构唯一标识
     */
    @Property()
    @IsAlphanumeric()
    public BankID: string
    /**
     * 银行交易流水号（预下单产生）
     */
    @Property()
    public BankTranID: string
    /**
     * 银行交易日期（支付完产生）
     */
    @Property()
    public BankTranDate: string
    /**
     * 银行交易时间（支付完产生）
     */
    @Property()
    public BankTranTime: string
    /**
     * 付款方备注（支付完产生）
     */
    @Property()
    public PayerRemark: string
    /**
     * 付款方存根（预下单产生）
     */
    @Property()
    public PayerStub: string
    /**
     * 交易金额
     */
    @Property()
    @IsPositive()
    public TranAmt: number
    /**
     * 监管机构唯一标识
     */
    @Property()
    @IsAlphanumeric()
    public SVOrgID: string
    /**
     * 订购开始日期
     */
    @Property()
    public SubscribeStartDate: string
    /**
     * 订购持续天数
     */
    @Property()
    @IsPositive()
    public SubscribeDurationDays: number
    /**
     * 订购合约状态
     */
    @Property()
    public Status: SubscriptionStatus
    /**
     * 支付地址（预下单产生）
     */
    @Property()
    public PayUrl: string

    static fromUint8Array(bytes: Uint8Array): Subscription {
        const jsonStr = new TextDecoder().decode(bytes)
        const jsonObj: Subscription = JSON.parse(jsonStr)
        const sub: Subscription = Object.assign(new Subscription(), jsonObj)
        return sub
    }
}
export enum SubscriptionStatus {
    create = 'create',
    preorder = 'preorder',
    pay = 'pay',
    cancel = 'cancel',
    complete = 'complete'
}


