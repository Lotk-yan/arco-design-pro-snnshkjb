// import axios from 'axios';
// import type {AxiosRequestConfig, AxiosResponse} from 'axios';
// import {Message, Modal} from '@arco-design/web-vue';
// import {useUserStore} from '@/store';
// import {getToken} from '@/utils/auth';
//
// export interface HttpResponse<T = unknown> {
//     status: number;
//     msg: string;
//     code: number;
//     data: T;
//     message: string;
// }
//
// if (import.meta.env.VITE_API_BASE_URL) {
//     axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// }
//
// axios.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         // let each request carry token
//         // this example using the JWT token
//         // Authorization is a custom headers key
//         // please modify it according to the actual situation
//         const token = getToken();
//         if (token) {
//             if (!config.headers) {
//                 config.headers = {};
//             }
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         // do something
//         return Promise.reject(error);
//     }
// );
// // add response interceptors
// axios.interceptors.response.use(
//     (response: AxiosResponse<HttpResponse>) => {
//         const res = response.data;
//         // if the custom code is not 20000, it is judged as an error.
//         if (res.code !== 20000) {
//             Message.error({
//                 content: res.msg || res.message || 'Error',
//                 duration: 5 * 1000,
//             });
//             // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//             if (
//                 [50008, 50012, 50014].includes(res.code) &&
//                 response.config.url !== '/api/user/info'
//             ) {
//                 Modal.error({
//                     title: 'Confirm logout',
//                     content:
//                         'You have been logged out, you can cancel to stay on this page, or log in again',
//                     okText: 'Re-Login',
//                     async onOk() {
//                         const userStore = useUserStore();
//
//                         await userStore.logout();
//                         window.location.reload();
//                     },
//                 });
//             }
//             return Promise.reject(new Error(res.msg || res.message || 'Error'));
//         }
//         return res;
//     },
//     (error) => {
//         Message.error({
//             content: error.msg || error.message || 'Request Error',
//             duration: 5 * 1000,
//         });
//         return Promise.reject(error);
//     }
// );

import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import router from '@/router/index';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers.userAgent = 'pc';
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.token = token;
    }
    // console.log(config,'cop')
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    if (response.data.data) {
      return response.data;
    }
    if (response.data.data) {
      router.push({
        name: 'login',
        query: {},
      });

      return response.data;
    }

    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 400:
        Message.error({
          content: error.response.data.message || 'Request Error',
          duration: 2 * 1000,
        });
        break;
      // 401 token过期
      // 登录过期对用户进行提示
      // 跳转登录页面
      case 401:
        router.push({
          name: 'login',
        });
        Message.error({
          content: error.response.data.message || 'Request Error',
          duration: 2 * 1000,
        });
        break;
      case 403:
        setTimeout(() => {}, 1000);
        break;
      case 404:
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);
