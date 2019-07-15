import request from '@/utils/request'

export function getRoleList(data) {
    return request({
        url: '/newtallsafe/v2/sys_role/query',
        method: 'post',
        data: {
            "rname": data.rname,
            "current": data.current,
            "size": data.size
        }
    })
}

export function addRole(data) {
    return request({
        url: '/newtallsafe/v2/sys_role',
        method: 'post',
        data: {
            "rname":data.rname,
            "rdesc":data.rdesc,
            "rval":data.rval
        }
    })
}
  
export function updateRole(data) {
    return request({
        url: '/newtallsafe/v2/sys_role/update',
        method: 'POST',
        data: {
            "rid":data.rid,
            "rname":data.rname,
            "rdesc":data.rdesc,
            "rval":data.rval
        }
    })
}

export function deleteRole(id) {
    return request({
        url: '/newtallsafe/v2/sys_role',
        method: 'DELETE',
        data: {
            "rids":id
        }
    })
}

export function getRolePermission(id) {
    return request({
        url: 'newtallsafe/v2/sys_role/'+id+'/perms',
        method: 'GET',
        params: {
        }
    })
}

export function updateRolePermission(data) {
    return request({
        url: 'newtallsafe/v2/sys_role/updatePerm',
        method: 'POST',
        data: data
    })
}