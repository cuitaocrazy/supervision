
/**
 * 对象转字节数组
 * @param obj 任意对象
 * @returns 字节数组
 */
export const obj2Uint8Array = (obj: any): Uint8Array => {
    const json = JSON.stringify(this)
    return new TextEncoder().encode(json)
}

