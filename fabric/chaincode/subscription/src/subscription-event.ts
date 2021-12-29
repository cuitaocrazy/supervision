
export class SubscriptionEventBody {
    public SubscribeID: string
}

export class SubscriptionEvent {

    private payload: SubscriptionEventBody
    private subscriptionEventType: SubscriptionEventType

    constructor(SubscribeIDStr: string, eventType: SubscriptionEventType) {
        this.payload = new SubscriptionEventBody()
        this.payload.SubscribeID = SubscribeIDStr
        this.subscriptionEventType = eventType
    }

    public getName(): string {
        return `${this.subscriptionEventType}-${this.payload.SubscribeID}`
    }

    public getPayload(): Uint8Array {
        return Buffer.from(JSON.stringify(this.payload))
    }

}

export enum SubscriptionEventType {
    create = 'create',
    preorder = 'preorder',
    pay = "pay",
    cancel = 'cancel',
    complete = 'complete'
}