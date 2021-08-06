import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data,
  })
}
export const yanzheng = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'get',
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'get',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  })
}
