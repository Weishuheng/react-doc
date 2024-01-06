import { Navigate, useLocation, useRoutes, matchRoutes} from 'react-router-dom'
import Login from '../pages/login.js';
import Home from '../pages/home.js';
import Doc from '../pages/doc.js';
import Page from '../pages/page.js';
import PageInit from '../pages/page.init.js';

// 路由跳转之前校验是否登录状态
const AuthRoute = ( { children } )=>{
  const location = useLocation();
  // 模拟获取用户token，若有表明用户已经登录
  let token = localStorage.getItem('token'); 
  if (!token) {
      // 用户未登录，重定向到登录页面，并在登录后返回之前页面
      return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
// 路由设置
const RoutesConfig = ([
  {
    name : 'Home',
    path : '/home',
    navKey : 'home',
    element : <AuthRoute>{<Home />}</AuthRoute>
  },{
    name : 'Doc',
    path : '/doc/:docID',
    navKey : 'doc',
    element : <AuthRoute>{<Doc />}</AuthRoute>,
    children : [
      {
        name : 'PageInit',
        path : 'page/init',
        navKey : 'doc',
        element : <PageInit />
      },{
        name : 'Page',
        path : 'page/:pageID',
        navKey : 'doc',
        element : <Page />
      },

    ]
  },{
    name : 'Login',
    path : '/login',
    navKey : 'login',
    element : <Login />
  },{
    name : 'default',
    path : '*',
    navKey : 'home',
    element : <Navigate to="/home" replace />
  }
])

// 路由渲染
export function RouterRC() {
  return (
    useRoutes(RoutesConfig)
  )
}

// 匹配当前路由寻找对应的RoutesConfig对象
function useRouteMatch(routes) {
  const location = useLocation();
  // matchRoutes 需要接收路由数组和当前 location 对象
  // 它会返回匹配的路由数组，其中最后一个路由是最具体的匹配
  const matches = matchRoutes(routes, location);

  if (matches && matches.length > 0) {
    // 获取最后一个匹配的路由，因为它是最具体的一个
    const { route, pathname, params } = matches[matches.length - 1];
    return { ...route, match: { params, pathname } };
  }

  return null;
}

// 从这里可以获取当前路由的config设置
export function GetLocation() {
  const location = useLocation();
  const matchInfo = useRouteMatch(RoutesConfig);
  return (matchInfo || location);
}
