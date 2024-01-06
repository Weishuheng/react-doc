import { Button } from 'antd';
import AjaxDataEdit from '../utils/AjaxDataEdit.js'
import JsonEdit from '../utils/jsonEdit.js'
import {InputURL, TextRead, InputText, InputNumbers, InputSelect} from '../utils/inputEdit.js'

function PageInit() {
  // 初始化信息
  const initData = {}
  // 用户信息接口
  const userInfoData = {}
  // 更新初始化数据（仅做浏览）
  const updateInitData = (k, v)=> {
    initData[k] = v;
  }
  // 更新用户信息数据（仅做浏览）
  const updateUserInfoData = (k, v)=> {
    userInfoData[k] = v;
  }
  // 查看数据更新情况
  const showFormData = ()=> {
    console.log('initData', initData)
    console.log('userInfoData', userInfoData)
  }

  return (
    <div>
      <h2>开发者前台</h2>
      <InputURL data={{'label' : '网站地址', 'key' : 'webURL', 'value' : ''}} onData={updateInitData} />
      <InputURL data={{'label' : 'API地址', 'key' : 'apiURL', 'value' : 'https://www.api.mysite.com'}} onData={updateInitData} />
      <InputURL data={{'label' : '测试网站地址', 'key' : 'testURL', 'value' : 'https://www.test.mysite.com'}} onData={updateInitData} />
      <InputURL data={{'label' : '测试API地址', 'key' : 'testApiURL', 'value' : 'http://www.test.api.mysite.com'}} onData={updateInitData} />
      <TextRead data={{'label' : '本地模拟API地址', 'value' : 'http://www.location.api.mysite.com'}} />
      <h3>获取用户信息</h3>
      <InputText data={{'label' : '接口地址', 'key' : 'apiURL', 'value' : 'https://www.test.mysite.com', placeholder:'请填写接口地址'}}  onData={updateUserInfoData} />
      <InputSelect
        data={{
          'label' : '接口类型', 
          'key' : 'type',
          'value' : 'GET',
          'data' : [
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
          ],
          placeholder:'请填写接口地址'
        }}
        onData={updateUserInfoData}
      />
      <InputNumbers data={{'label' : '超时时间', 'key' : 'timeout', 'value' : 5000, 'min' : 1000, 'max' : '100000', placeholder:'请填写接口地址'}}  onData={updateUserInfoData} />
      <AjaxDataEdit />
      <JsonEdit />
      <Button  type="primary" onClick={showFormData} >Submit</Button>
    </div>
  );
}
export default PageInit;