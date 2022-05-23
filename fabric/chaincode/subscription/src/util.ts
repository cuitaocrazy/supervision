import { Context } from "fabric-contract-api"

/**
 * 检查合约是否存在
 */
export const checkContractExist = async (ctx: Context, collectionName: string, contractID: string): Promise<boolean> => {
    const buffer = await ctx.stub.getPrivateDataHash(collectionName, contractID)
    return !!buffer && buffer.length > 0
}
/**
 * 获取合约
 */
export const getContract = async <T>(ctx: Context, collectionName: string, contractID: string): Promise<T> => {
    const buffer = await ctx.stub.getPrivateData(collectionName, contractID)
    return JSON.parse(new TextDecoder().decode(buffer))
}
/** 获取合约，不存在时创建 */
export const getOrCreateContract = async <T>(ctx: Context, collectionName: string, contractID: string, createFunc: () => T): Promise<T> => {
    const exist = await checkContractExist(ctx, collectionName, contractID)
    if (!exist) {
        return createFunc();
    }
    return getContract(ctx, collectionName, contractID);
}

/**
  * 获取集合名称
  * @param svOrgID 监管机构ID
  * @param usvOrgID 被监管机构ID
  * @param bankID 银行ID
  */
export const getCollectionName = (svOrgID: string, usvOrgID: string, bankID: string): string => {
    return `${usvOrgID}-${bankID}-${svOrgID}`;
}

/**
* 把电子合同Id转换为考勤合约Id
*/
export const getAttendanceContractIdByElectronicContractId = (electronicContractId: string): string => {
    if (!electronicContractId.startsWith("\u0000ec")) throw new Error("electronicContractId is not a valid electronicContractId");
    return electronicContractId.replace(/ec/, "ac");
}
/**
 * 把考勤合约Id转换为划拨合约Id
 * @param electronicContractId 电子合同Id
 * @returns 
 */
export const getTransferContractIdByElectronicContractId = (electronicContractId: string): string => {
    // 如果不是\u0000ec开头，则不是电子合同Id
    if (!electronicContractId.startsWith("\u0000ec")) throw new Error("electronicContractId is not a valid electronicContractId");
    return electronicContractId.replace(/ec/, "tc");
}