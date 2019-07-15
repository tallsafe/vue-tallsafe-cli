import request from '@/utils/request'

export function getPerMissionList(data) {
    return request({
        url: '/newtallsafe/v2/sys_perm/list/all',
        method: 'get',
        params: {
        
        }
    })
}

export function addPerMission(data) {
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
  
export function updatePerMission(data) {
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

export function deletePerMission(id) {
    return request({
        url: '/newtallsafe/v2/sys_role',
        method: 'DELETE',
        data: {
            "rids":id
        }
    })
}