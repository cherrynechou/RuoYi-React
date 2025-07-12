import { request } from '@umijs/max';


/**
 * 获取菜单列表
 */
export async function queryMenus(params: any = {}) {
  return request('/auth/menu',{
    method: 'Get',
    params
  });
}

/**
 * 查询所有菜单
 * @param params
 */
export async function getAllMenus(params: any = {}) {
  return request('/auth/menu/all',{
    method: 'Get',
    params
  });
}

/**
 * 创建菜单
 * @param params
 */
export async function createMenu(params: any = {}) {
  return request('/auth/menu', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取当前菜单
 * @param id
 */
export async function getMenu(id: number) {
  return request(`/auth/menu/${id}`,{
    method: 'GET'
  });
}

/**
 * 删除菜单
 * @param id
 */
export async function destroyMenu(id: number) {
  return request(`/auth/menu/${id}`, {
    method: 'DELETE'
  });
}

/**
 * 更新
 * @param id
 * @param params
 */
export async function updateMenu(id: string, params: any = {}) {
  return request(`/auth/menu/${id}`, {
    method: 'PUT',
    data: params,
  });
}

/**
 * 更新状态
 * @param id
 * @param params
 */
export async function switchMenu(id: number, params: any = {}) {
  return request(`/auth/menu/${id}/switch`, {
    method: 'Put',
    data: params,
  });
}
