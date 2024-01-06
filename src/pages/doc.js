import {  Outlet } from "react-router-dom";
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import '../style/doc.css'

function Doc(){
  // 侧边栏数据
  const items  = [
    {
      label: <Link to='page/init'>初始化</Link>,
      key: 'pageInit',
    },{
      label: <Link to='page/2'>首页</Link>,
      key: 'page2',
    },{
      label: <Link to='page/3'>登录页</Link>,
      key: 'page3',
    }
  ];

  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <div className="doc">
      {/* 侧边栏 */}
      <Menu
        onClick={onClick}
        style={{ width: 200 }}
        defaultSelectedKeys={['pageInit']}
        mode="inline"
        items={items}
      />
      <div className="doc_main">
        {/* 子路由 */}
        <Outlet />
      </div>
    </div>
  );
};
export default Doc;