import { request } from '@umijs/max';

/**
 * 获取权限树型列表
 */
export async function queryPermissions() {
  return request('/auth/permissions',{
    method: 'Get',
  });
}


/**
 * 生成权限列表
 */
export async function getAllPermissions() {
  return request('/auth/permission/all',{
    method: 'GET',
  });
}



/**
 * 查询当前权限
 * @param id
 */
export async function queryPermission(id: number) {
  return request(`/auth/permissions/${id}`,{
    method: 'Get',
  });
}

/**
 * 创建权限
 * @param params
 */
export async function createPermission(params: any = {}) {
  return request('/auth/permissions', {
    method: 'POST',
    body: params,
  });
}

/**
 * 更新权限
 * @param id
 * @param params
 */
export async function updatePermission(id: number, params: any = {}) {
  return request(`/auth/permissions/${id}`, {
    method: 'Put',
    data: params,
  });
}

/**
 * 删除权限
 * @param id
 */
export async function destroyPermission(id: number) {
  return request(`/auth/permissions/${id}`,{
    method: 'DELETE',
  });
}


/**
 * 获取权限路由
 */
export async function queryAllPermissionRoutes() {
  return request('/auth/permission/routes',{
    method: 'GET',
  });
}
