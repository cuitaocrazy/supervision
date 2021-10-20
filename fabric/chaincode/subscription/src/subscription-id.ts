import { Object, Property } from 'fabric-contract-api';
import { Subscription } from './subscription';
@Object()
export class SubscriptionID {

    @Property()
    public readonly USVOrgID: string
    @Property()
    public readonly USVOrderNo: string
    @Property()
    public readonly BankID: string
    @Property()
    public readonly SVOrgID: string

    constructor(usvOrgID: string, usvOrderNo: string, bankID: string, svOrgID: string) {
        this.USVOrgID = usvOrgID
        this.USVOrderNo = usvOrderNo
        this.BankID = bankID
        this.SVOrgID = svOrgID
    }

    static fromSubscription(subscription: Subscription): SubscriptionID {
        return new SubscriptionID(subscription.USVOrgID, subscription.USVOrderNo, subscription.BankID, subscription.SVOrgID)
    }

    static fromSubscriptionIDString(subscriptionIDString: string): SubscriptionID {
        const strings = subscriptionIDString.split('-')
        return new SubscriptionID(strings[0], strings[3], strings[1], strings[2])
    }

    public getIDStr(): string {
        return `${this.USVOrgID}-${this.BankID}-${this.SVOrgID}-${this.USVOrderNo}`
    }

    public getCollectionName(): string {
        return `${this.USVOrgID}-${this.BankID}-${this.SVOrgID}`
    }
}
