import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/sample/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/sample/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/sample/logout',
    method: 'post'
  })
}
