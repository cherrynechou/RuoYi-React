import { request } from '@umijs/max';

export async function queryRoles(params:any = {}){
  return request(`/auth/roles`,{
    method: 'Get',
    params: params
  })
}

/**
 * 添加角色
 * @param params
 */
export async function createRole(params: any = {}) {
  return request('/auth/roles', {
    method: 'POST',
    body: params,
  });
}


export async function getRole(id: number){
  return request(`/auth/roles/${id}`,{
    method: 'Get',
  })
}

/**
 * 更新角色
 * @param id
 * @param params
 */
export async function updateRole(id: number, params: any = {}) {
  return request(`/auth/roles/${id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 删除角色
 * @param id
 */
export async function destroyRole(id: number) {
  return request(`/auth/roles/${id}`,{
    method: 'DELETE',
  });
}


export async function getAllRoles(){
  return request(`/auth/role/all`,{
    method: 'Get',
  })
}

export async function queryRolePermissionIdsByRoleId(id: number) {
  return request(`/auth/role/${id}/permissions`,{
    method: 'Get',
  });
}


export async function updateRolePermission(id: number, params: any = {}) {
  return request(`/auth/role/${id}/permissions`,{
    method: 'Put',
    body: params,
  });
}