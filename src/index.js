import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

/*
    语言包选择 
    通过i18next-browser-languagedetector来用于自动检测用户语言
    通过react-i18next 完成语言切换
    详细查看 ',/language/i18n.js'
    语言切换功能在app内完成
*/

/*
    辨识终端机型（电脑、pad、phone）
    window.ISPAD = navigator.userAgent.toLowerCase().match(/(iPad|pad|Pad)/i) ? true : false;
    .......
    跳转不同的代码模块
*/

/* 
    终端大小屏进行区分
    window.ISSMALL = document.documentElement.clientWidth < 1000 ? true : false;
    .......
    给body添加className 适应大小屏
    document.body.className = document.body.className ? document.body.className + " bodySmall" : "bodySmall";
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);