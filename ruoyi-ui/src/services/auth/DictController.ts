import { request } from '@umijs/max';

/**
 * 获取菜单列表
 */
export async function queryDicts(params: any = {}) {
  return request('/auth/dicts',{
    method: 'Get',
    params
  });
}


export async function createDict(params:any = {}){
  return request('/auth/dicts',{
    method: 'Post',
    data: params,
  })
}

export async function getDict(id: number){
  return request(`/auth/dicts/${id}`,{
    method: 'Get',
  })
}

export async function updateDict(id: number, params:any = {}){
  return request(`/auth/dicts/${id}`,{
    method: 'PUT',
    data: params,
  })
}


/**
 * 删除菜单
 * @param id
 */
export async function destroyDict(id: number) {
  return request(`/auth/dicts/${id}`,{
    method: 'Delete',
  });
}
