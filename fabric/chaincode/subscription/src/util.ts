import { Context } from "fabric-contract-api"

/**
 * 对象转字节数组
 * @param obj 任意对象
 * @returns 字节数组
 */
export const obj2Uint8Array = (obj: any): Uint8Array => {
    const json = JSON.stringify(obj)
    return new TextEncoder().encode(json)
}

/**
 * 检查合约是否存在
 */
export const checkContractExist = async (ctx: Context, collectionName: string, contractID: string): Promise<boolean> => {
    const buffer = await ctx.stub.getPrivateDataHash(collectionName, contractID)
    return !!buffer && buffer.length > 0
}