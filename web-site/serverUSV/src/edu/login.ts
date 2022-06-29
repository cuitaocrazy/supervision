import { EduOrg } from '../entity/EduOrg'
import mysql from '../mysql'
export default async ({ username, password }) => {
    const result = await mysql.getRepository(EduOrg).findOneBy({
        eduLoginName: username
    })
    console.log(`${username} 尝试登陆`)
    if (result === null)
        return { result: false, msg: '用户名或密码错误' }
    if (result.eduPassword !== password)
        return { result: false, msg: '用户名或密码错误' }
    console.log(`${username} 认证成功`)
    return {
        result: true, msg: '认证成功', loginUser: {//登录用户信息
            orgId: result.eduId,
            orgName: result.eduName,
            loginName: result.eduLoginName,
            username: result.eduLoginName,
            phone: result.eduContactPhone,
            role: null,
        }
    }
}