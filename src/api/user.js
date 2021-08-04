import request from '@/utils/request'
export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data,
  })
}
// export const yanzheng = mobile => {
//   return request({
//     url: `/v1_0/sms/codes/${mobile}`,
//     method: 'get',
//   })
// }
export const yanzheng = params => {
  return request({
    url: '/v1_0/sms/codes/' + params,
    method: 'get',
  })
}
