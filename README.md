# 1、安装全局的react-create-app 
```javascript
    //  "react": "^18.2.0" 
    npm install react-create-app -g -s
```

# 2、安装项目doc
```javascript
    npx create-react-app doc
```
# 3、进入项目，安装需要依赖的三方组件
```javascript
    // 进入项目
    cd doc
    // antd antd icon 框架UI
    // "@ant-design/icons": "^5.2.6",
    // "antd": "^5.12.5",
    npm install antd @ant-design/icons -s
    // ajax数据设置
    // "axios": "^1.6.2",
    npm install axios -s
    // 路由设置
    // "react-router-dom": "^6.21.1",
    npm install react-router-dom -s
    // 根据环境设置变量
    // "env-cmd": "^10.1.0"
    npm install env-cmd -s
    // 多语言支持
    // "react-i18next": "^14.0.0",
    // "i18next-browser-languagedetector": "^7.2.0",
    npm install react-i18next i18next-browser-languagedetector -s
    // 代码编辑框
    // "react-ace": "^10.1.0",
    // "ace-builds": "^1.32.3",
    npm install react-ace ace-builds -s
    // 代码高亮显示
    //"react-syntax-highlighter": "^15.5.0",
    npm install react-syntax-highlighter -s
```

# 4、将需要的文件下载并覆盖项目文件
    ** public 文件夹不动 **
    ** src 文件夹删除项目原有的，使用github里面的 **
    ** 创建3个环境变量的文件  **
        .env.development        生产环境
        .env.test               测试环境
        .env.production         线上环境
        存放不同环境下的api请求地址
        <!-- REACT_APP_API_URL=http://localhost.api.mysite.com -->

# 5、修改package.json的scripts
```javascript
    "scripts": {
        "local": "env-cmd -f .env.development react-scripts start",
        "debug:test": "env-cmd -f .env.test react-scripts start",
        "debug:production": "env-cmd -f .env.production react-scripts start",
        "test": "env-cmd -f .env.test react-scripts build",
        "production": "env-cmd -f .env.production react-scripts build",
        "build": "react-scripts build",
        "etest": "react-scripts test",
        "eject": "react-scripts eject"
    }
    /**
     * npm start                本地开发环境，请求模拟数据
     * npm run debug-test           本地开发环境，请求测试环境api数据
     * npm run debug-production     本地开发环境，请求正式环境api数据
     * npm run test                 打包测试环境
     * npm run production           打包正式环境
     */
```

  # 6、启动项目
      npm start