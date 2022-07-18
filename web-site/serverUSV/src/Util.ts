import { EntityManager } from "typeorm"

export const getUUIDWithEM: (entityManager: EntityManager) => Promise<string> = async (em) => {
    const rs = await em.query(`SELECT REPLACE(UUID(),'-','') as uuid`)
    return rs[0].uuid
}

export const nullableFuzzy = (query:any)=>{
    return '%'.concat(query?query:'').concat('%')
}