/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object as FabricObject, Property } from 'fabric-contract-api';

@FabricObject()
export class Subscription {

    @Property()
    public SubscribeID: string
    @Property()
    public USVOrgID: string
    @Property()
    public USVItemID: string
    @Property()
    public USVItemName: string
    @Property()
    public USVItemDesc: string
    @Property()
    public USVOrderNo: string
    @Property()
    public BankID: string
    @Property()
    public BankTranID: string
    @Property()
    public BankTranDate: string
    @Property()
    public BankTranTime: string
    @Property()
    public PayerRemark: string
    @Property()
    public PayerStub: string
    @Property()
    public TranAmt: string
    @Property()
    public SVOrgID: string
    @Property()
    public SubscribeStartDate: string
    @Property()
    public SubscribeDurationDays: string
    @Property()
    public Status: SubscriptionStatus

    public toUint8Array(): Uint8Array {
        const json = JSON.stringify(this)
        return new TextEncoder().encode(json)
    }

    static fromUint8Array(bytes: Uint8Array): Subscription {
        const jsonStr = new TextDecoder().decode(bytes)
        const jsonObj: Subscription = JSON.parse(jsonStr)
        const sub: Subscription = Object.assign(new Subscription(), jsonObj)
        return sub
    }
}
export enum SubscriptionStatus {
    create = 'create',
    cancel = 'cancel',
    complete = 'complete'
}