import request from '@/utils/request'

export function getUserList(data) {
    return request({
        url: '/newtallsafe/v2/sys_user/query',
        method: 'post',
        data: {
            "nick": data.nick,
            "current": data.current,
            "size": data.size
        }
    })
}

export function updateUser(data) {
    return request({
        url: '/newtallsafe/v2/sys_user/info',
        method: 'POST',
        data: data
    })
}

export function updatePassWord(data) {
    return request({
        url: '/newtallsafe/v2/sys_user/pwd',
        method: 'POST',
        data: {
            // "uname":data.uname,
            // "nick":data.nick,
            "pwd":data.pwd
        }
    })
}

export function addUser(data) {
    return request({
        url: '/newtallsafe/v2/sys_user',
        method: 'post',
        data: {
            "uname":data.uname,
            "nick":data.nick,
            "pwd":data.pwd,
            "rids":data.rids
        }
    })
}

export function deleteUser(uids) {
    return request({
        url: '/newtallsafe/v2/sys_user',
        method: 'DELETE',
        data: {
            uids:uids
        }
    })
}
