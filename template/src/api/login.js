import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/newtallsafe/v2/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/newtallsafe/v2/auth/info',
    method: 'get',
    params: { token }
  })
}
export function getDataList(token) {
  return request({
    url: '/newtallsafe/v2/sys_role/query',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/newtallsafe/v2/auth/logout',
    method: 'post'
  })
}
