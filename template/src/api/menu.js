import request from '@/utils/request'

export function getHeaderMenu() {
  return request({
    url: Window.config.url+'/api/sample/getHeader',
    method: 'get'
  })
}