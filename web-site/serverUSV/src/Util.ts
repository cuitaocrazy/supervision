import { EntityManager } from "typeorm"

export const getUUIDWithEM: (entityManager: EntityManager) => Promise<string> = async (em) => {
    const rs = await em.query(`SELECT REPLACE(UUID(),'-','') as uuid`)
    return rs[0].uuid
}

export const nullableFuzzy = (query: any) => {
    return '%'.concat(query ? query : '').concat('%')
}
/**
 * 服务处理结果
 */
export type ServiceResult = {
    /**
     * 结果
     */
    result: boolean
    /**
     * 提示信息
     */
    msg: string
}