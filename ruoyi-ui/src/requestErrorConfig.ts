import type { RequestConfig } from '@umijs/max';
import localforage from 'localforage';
import { getLocale,history} from '@umijs/max';

const loginPath = '/admin/login';

//定义异常
const errorHandler = (error: any, opts:any)=>{
  if(error.response){
    if(error.response.status === 401){
      let redirect = history.location.pathname;
      if (redirect.indexOf('login') !== -1) redirect = '';
      if (redirect) {
        redirect = '?redirect=' + redirect;
      }
      const search = history.location.search;
      history.push(loginPath + redirect + search);
    }
  }
}

const errorThrower= (res: any)=>{
  console.log(res);
}

export const errorConfig: RequestConfig = {
  timeout: 60000,
  // other axios options you want
  baseURL: process.env.BaseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  errorConfig: {
    errorHandler: errorHandler,
    errorThrower:errorThrower
  },
  requestInterceptors: [
    // 直接写一个 function，作为拦截器
    async (config: any) => {
      // do something
      const accessToken = await localforage.getItem('access_token');

      config.headers['Accept-Language'] = getLocale();

      if(accessToken && config && config?.headers){
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config
    },
  ],
  responseInterceptors: [
    (response: any)=>{
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      // do something
      const code = response.data.code || 200;
      const msg = response.data.msg;

      if(code === 500){
        return Promise.reject(new Error(msg))
      }

      return response
    }
  ]
};
