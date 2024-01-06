import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  // 使用 Form 提供的 useForm Hook 来获取表单实例
  const [form] = Form.useForm();
  const { Text } = Typography;

  // 控制登录按钮是否禁用的状态
  const [loginDisabled, setLoginDisabled] = useState(true);

  // 账号和密码的验证状态
  const [accountStatus, setAccountStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  // 处理表单提交的逻辑
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // 在这里处理登录逻辑
  };

  // 处理表单值变化的逻辑，用于实时更新登录按钮的禁用状态
  const onValuesChange = (_, allValues) => {
    const { account, password, agreement } = allValues;
    const isEmail = /\S+@\S+\.\S+/.test(account);
    const isPhoneNumber = /^(1[3-9]\d{9})$/.test(account);
    const accountValid = isEmail || isPhoneNumber;
    const passwordValid = password && password.length >= 6;
    setLoginDisabled(!(accountValid && passwordValid && agreement));
  };

  // 处理输入框获取焦点时的逻辑，用于清除之前的错误状态
  const onFocus = (field) => {
    if (field === 'account' && accountStatus === 'error') {
      form.setFields([
        {
          name: ['account'],
          errors: [],
        },
      ]);
      setAccountStatus('');
    }
    if (field === 'password' && passwordStatus === 'error') {
      form.setFields([
        {
          name: ['password'],
          errors: [],
        },
      ]);
      setPasswordStatus('');
    }
  };

  return (
    <div style={{ 'width': '600px', 'margin': '30px auto' }}>
      <h2>Login</h2>
      {/* 使用 Ant Design Form 组件 */}
      <Form
        form={form}
        name="login_form"
        layout='vertical'
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        {/* 账号输入框 */}
        <Form.Item
          name="account"
          hasFeedback
          label={<Text strong>账号</Text>}
          validateStatus={accountStatus}
          rules={[
            { required: true,
              validator: (_, value) => {
                if (!value) {
                  setAccountStatus('error');
                  return Promise.reject(new Error('账号不能为空'));
                }
                const isEmail = /\S+@\S+\.\S+/.test(value);
                const isPhoneNumber = /^(1[3-9]\d{9})$/.test(value);
                if (!isEmail && !isPhoneNumber) {
                  setAccountStatus('error');
                  return Promise.reject(new Error('账号不是有效的邮箱或手机号'));
                }
                setAccountStatus('success');
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onBlur"
        >
          {/* 账号输入框 */}
          <Input
            size="large"
            placeholder='请填入有效的邮箱或手机号'
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
            onFocus={() => onFocus('account')}
          />
        </Form.Item>

        {/* 密码输入框 */}
        <Form.Item
          name="password"
          validateStatus={passwordStatus}
          label={<Text strong>密码</Text>}
          rules={[
            { required: true, 
              validator: (_, value) => {
                if (!value) {
                  setPasswordStatus('error');
                  return Promise.reject(new Error('密码不能为空'));
                }
                if (value.length < 6) {
                  setPasswordStatus('error');
                  return Promise.reject(new Error('密码至少为六位'));
                }
                setPasswordStatus('success');
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger="onBlur"
        >
          {/* 密码输入框 */}
          <Input.Password
            size="large"
            placeholder='密码至少六位数'
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
            onFocus={() => onFocus('password')}
          />
        </Form.Item>

        {/* 用户须知复选框 */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('请勾选用户须知')) },
          ]}
        >
          <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
            <Checkbox>我已阅读并同意用户须知</Checkbox>
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </div>
        </Form.Item>

        {/* 登录按钮 */}
        <Form.Item>
          <Button style={{ 'width': '100px' }} type="primary" htmlType="submit" disabled={loginDisabled}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
