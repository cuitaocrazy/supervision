/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object as FabricObject, Property } from 'fabric-contract-api';
import { IsAlphanumeric, IsPositive } from 'class-validator'
@FabricObject()
export class Subscription {

    @Property()
    public SubscribeID: string
    @Property()
    @IsAlphanumeric()
    public USVOrgID: string
    @Property()
    public USVItemID: string
    @Property()
    public USVItemName: string
    @Property()
    public USVItemDesc: string
    @Property()
    @IsAlphanumeric()
    public USVOrderNo: string
    @Property()
    @IsAlphanumeric()
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
    @IsPositive()
    public TranAmt: number
    @Property()
    @IsAlphanumeric()
    public SVOrgID: string
    @Property()
    public SubscribeStartDate: string
    @Property()
    @IsPositive()
    public SubscribeDurationDays: number
    @Property()
    public Status: SubscriptionStatus

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



// const schema: JSONSchemaType<Subscription> = {
//     type: 'object',
//     properties: {
//         SubscribeID: { type: "string" },
//         USVOrgID: { type: "string", pattern: "^[\w\d]+$" },
//         USVItemID: { type: "string" },
//         USVItemName: { type: "string" },
//         USVItemDesc: { type: "string" },
//         USVOrderNo: { type: "string", pattern: "^[\w\d]+$" },
//         BankID: { type: "string", pattern: "^[\w\d]+$" },
//         BankTranID: { type: "string" },
//         BankTranDate: { type: "string" },
//         BankTranTime: { type: "string" },
//         PayerRemark: { type: "string" },
//         PayerStub: { type: "string" },
//         TranAmt: { type: "number", minimum: 1 },
//         SVOrgID: { type: "string", pattern: "^[\w\d]+$" },
//         SubscribeStartDate: { type: "string" },
//         SubscribeDurationDays: { type: "number", minimum: 1 },
//         Status: { type: 'string', enum: [SubscriptionStatus.create, SubscriptionStatus.cancel, SubscriptionStatus.complete] }
//     },
//     required: ["BankID", "USVOrgID", "USVOrderNo", "SVOrgID"],
// }
