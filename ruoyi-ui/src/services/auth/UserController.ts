import { request } from '@umijs/max';


export async function queryUsers(params:any = {}){
  return request('/auth/users',{
    method: 'Get',
    params: params,
  })
}

export async function createUser(params:any = {}){
  return request('/auth/users',{
    method: 'Post',
    data: params,
  })
}

export async function getUser(id: number){
  return request(`/auth/users/${id}`,{
    method: 'Get',
  })
}

export async function updateUser(id: number, params: any = {}){
  return request(`/auth/users/${id}`,{
    method: 'PUT',
    data: params,
  })
}


export async function destroyUser(id: number){
  return request(`/auth/users/${id}`,{
    method: 'Delete',
  })
}

/**
 * 禁用用户登录
 */
export async function blockUser(id: number, params: any) {
  return request(`/auth/user/${id}/block`,{
    method: 'Patch',
    data: params
  });
}

/**
 * 重置用户密码
 * @param id
 */
export async function resetPassword(id: number) {
  return request(`/auth/users/${id}/resetPassword`,{
    method: 'Patch',
  });
}


export async function exportUserData() {
  return request('/auth/user/export',{
    method: 'Get',
    responseType: 'blob',
    timeout: 60000
  });
}
