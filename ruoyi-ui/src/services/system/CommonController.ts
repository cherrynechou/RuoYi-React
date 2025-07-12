import { request } from '@umijs/max';

//登录
export async function login(params:any = {}){
  return request('/oauth/login',{
    method: 'POST',
    data: params,
  })
}

//退出
export async function outLogin(params:any = {}){
  return request('/logout',{
    method: 'Get',
  })
}

export async function getMenuList(params:any = {}){
  return request('/getMenuList',{
    method: 'Get',
  })
}

export async function queryCurrentUser(){
  return request('/currentUser',{
    method: 'Get',
  })
}


/**
 * 上传图片文件
 * @param params
 */
export async function uploadImageFile(params: any = {}) {
  return request('/common/upload', {
    method: 'POST',
    data: params,
  });
}