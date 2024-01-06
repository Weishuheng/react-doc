/*
  暴露了三个方法 { $axios, useAxios, AxiosProvider }

  直接引用： 
  import { $axios } from '......../$axios.js'
  $axios.get(...)...

  从上下文中获取
  import { $useAxios } from '......../$axios.js'
  const $axios = $useAxios()
  $axios.get(...)...

  获取上下文包含组件
  import { AxiosProvider } from '......../$axios.js'
  <AxiosProvider></AxiosProvider>
*/

import axios from 'axios';
import React, { createContext, useContext } from 'react';


// 创建一个 Axios 实例
export const $axios = axios.create({
  /**
   *  设置基本的URL
   *  process.env.REACT_APP_API_URL可根据打包命令行调用不同的.env
   */
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json'
  },
});

// 请求拦截器
$axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
$axios.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response;
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 创建一个 React 上下文
const AxiosContext = createContext();

// 创建一个提供器组件，将 Axios 实例作为值提供给所有子组件
export function AxiosProvider({ children }) {
  return (
    <AxiosContext.Provider value={$axios}>
      {children}
    </AxiosContext.Provider>
  );
}

// 创建一个自定义 hook，用于在组件中访问 Axios 实例
export function useAxios() {
  return useContext(AxiosContext);
}