import { request } from '@umijs/max';

/**
 * 获取菜单列表
 */
export async function queryDictDatas(params: any = {}) {
  return request('/auth/dict/datas',{
    method: 'Get',
    params
  });
}

export async function getDictAllDataList(code: string) {
  return request(`/auth/dict/${code}/dataList`,{
    method: 'Get',
  })
}

export async function createDictData(params:any = {}){
  return request('/auth/dict/datas',{
    method: 'Post',
    data: params,
  })
}

export async function getDictData(id: number){
  return request(`/auth/dict/datas/${id}`,{
    method: 'Get',
  })
}

export async function updateDictData(id: number, params:any = {}){
  return request(`/auth/dict/datas/${id}`,{
    method: 'PUT',
    data: params,
  })
}

//设置默认值
export async function setDictDataDefault(id: number, params:any = {}){
  return request(`/auth/dict/setDefault/${id}`,{
    method: 'PUT',
    data: params,
  })
}

/**
 * 删除菜单
 * @param id
 */
export async function destroyDictData(id: number) {
  return request(`/auth/dict/datas/${id}`,{
    method: 'Delete',
  });
}
