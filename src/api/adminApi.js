import axios from '../utils/request'
import md5 from 'md5'



// 登录
export const $login = async (params) => {
    params.loginPwd = md5(md5(params.loginPwd).split('').reverse().join(''))
    let { data } = await axios.get('Admin/Login', { params })
    if (data.sucess) {
        sessionStorage.setItem('token', data.token)
    }
    return data
}

