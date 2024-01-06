// 引入样式文件
import './style/App.css';
// 引入React相关模块
import React, { useState } from 'react';
// 引入路由相关工具
import { RouterRC, GetLocation } from './utils/router.js';
import { $axios } from './utils/$axios.js';
// 引入Ant Design组件
import { ConfigProvider, Menu, Avatar, Tooltip, Button } from 'antd';
// 引入React路由
import { Link } from 'react-router-dom';
// 引入Logo图标
import logoSVG from './assets/logo.svg';
// 引入Ant Design图标
import { UserOutlined } from '@ant-design/icons';
// 引入国际化相关工具
import { useTranslation } from 'react-i18next';
import { i18n, antdlocale } from './language/i18n';

// 主应用组件
function App() {
  // 中英文切换
  const { t } = useTranslation();

  // 设置Ant Design的默认语言
  const [antDesignLocal, setAntDesignLocal] = useState(antdlocale);

  // 中英文切换按钮事件
  const ChangeLanguage = () => {
    // 英语 en; 中文 zh
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
    setAntDesignLocal(i18n.getResourceBundle(i18n.language, 'antd'));
  };

  // 获取用户信息
  // $axios.get('/userInfo')
  //   .then(response => {
  //     // 处理成功的响应
  //     console.log('Response:', response);
  //   }).catch(error => {
  //     // 处理错误
  //     console.error('Error:', error);
  //   }).finally(() => {
  //     // 不管请求成功还是失败都会执行的代码
  //     console.log('Request complete.');
  //   });
  
  // 导航栏定义
  const items = [
    {
      label: <Link to='/home'>{t('home')}</Link>,
      key: 'home',
    },
    {
      label: <Link to='/doc/1/page/init'>{t('doc')}</Link>,
      key: 'doc',
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
  ];

  // 用户名
  const userName = "weishuheng";

  // 设置导航栏所选中的item值
  const location = GetLocation();
  const [current, setCurrent] = useState(location.navKey);

  // 点击导航栏项的处理函数
  const onClick = (e) => {
    setCurrent(e.key);
  };

  // 返回页面结构
  return (
    <ConfigProvider locale={antDesignLocal}>
      <div className="App">
        {/* 导航栏 */}
        <nav>
          {/* Logo部分 */}
          <div className='logoBox'>
            <img className="logo" src={logoSVG} alt="Logo" /> React
          </div>
          
          {/* 导航菜单 */}
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

          {/* 用户信息部分 */}
          <div className="userInfo">
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <Link to="/login">{userName}</Link>
            
            {/* 语言切换按钮 */}
            <Tooltip title="中文/English">
              <Button type="default" onClick={ChangeLanguage} size='small'>{t('lang')}</Button>
            </Tooltip>
          </div>
        </nav>

        {/* 主要内容区域 */}
        <main>
          <RouterRC />
        </main>

        {/* 页脚 */}
        <footer>
          <span>Copyright ©{new Date().getFullYear()}</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer">
            <i className="icon_icp"></i>京ICP备11009985号
          </a>
        </footer>
      </div>
    </ConfigProvider>
  );
}

export default App;