import { Context, Contract, Transaction } from "fabric-contract-api";

/**
 * 电子合同
 */
export class ElectronicContract extends Contract {
    @Transaction()
    public async create(ctx: Context): Promise<string> {
        //TODO
        return "null";
    }
}