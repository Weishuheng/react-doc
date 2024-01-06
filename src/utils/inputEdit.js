import React, { useState, useEffect } from 'react';
import { Input, InputNumber, Select, Typography } from 'antd';
import { FormOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import '../style/inputEdit.css';

const { Text } = Typography;
const { Option } = Select;

// 输入网址的编辑组件
function InputURL(props) {
  // 是否编辑状态
  const [isEditing, setIsEditing] = useState(false);
  // 鼠标经过显示编辑按钮的控制属性值
  const [showEditIcon, setShowEditIcon] = useState(false);
  // 输入框的value值
  const [inputValue, setInputValue] = useState('');
  // URL的前缀值prefixData
  const [prefixData, setPrefixData] = useState('http://');
  // URL的后缀值SuffixData
  const [suffixData, setSuffixData] = useState('.com');
  // 未更改过的输入框value，主要是为了取消还原成未更改前的值
  const [preValue, setPreValue] = useState('');

  // 解析URL，提取前缀值prefix和后缀值suffix
  function parseUrl(url) {
    try {
      const match = url?.split("://");
      const prefix = match[0] + '://';
      const values = match[1]?.split(".");
      const suffix = '.' + values.pop();
      const value = values.join('.');
      return {prefix, value, suffix};
    } catch (error) {
      console.error('Invalid URL:', error.message);
      return { prefix: '', suffix: '' };
    }
  }
  // 当获取到传入的data.value时，设置默认的PrefixData、SuffixData、inputValue、preValue
  useEffect(() => {
    if (props.data?.value) {
      const { prefix, value, suffix } = parseUrl(props.data?.value);
      setPrefixData(prefix);
      setInputValue(value);
      setSuffixData(suffix);
      setPreValue(value);
    }
  }, [props.data.value]);
  // URL的前缀值选择框
  const selectBefore = (
    <Select value={prefixData} onChange={(value) => setPrefixData(value)}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
  // URL的后缀值选择框
  const selectAfter = (
    <Select value={suffixData} onChange={(value) => setSuffixData(value)}>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

  return (
    <div className='InputEdit'>
      <Text strong>{props.data?.label}：</Text>
      {/* 编辑状态 */}
      <div className={`inputContainer ${isEditing ? '' : 'hidden'}`}>
        <Input
          addonBefore={selectBefore}
          addonAfter={selectAfter}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请填写网站地址"
        />
        {/* 确认按钮 */}
        <CheckCircleOutlined
          className="icon"
          onClick={() => {
            setIsEditing(false);
            setPreValue(inputValue);
            props.onData(props.data.key, prefixData + inputValue + suffixData);
          }}
        />
        {/* 取消按钮 */}
        <CloseCircleOutlined className="icon" onClick={() => {setIsEditing(false);setInputValue(preValue)}} />
      </div>
      {/* 浏览状态 */}
      <div className={`inputContainer ${isEditing ? 'hidden' : ''}`} onMouseOver={() => setShowEditIcon(true)} onMouseOut={() => setShowEditIcon(false)} >
        <Text>{(!!inputValue ? (prefixData + inputValue + suffixData) : (props.data?.placeholder || '请填写网站地址'))}</Text>
        {/* 编辑按钮 */}
        <FormOutlined className={`icon ${showEditIcon ? '' : 'hidden'}`} onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
}

// 输入文本的编辑组件
function InputText(props) {
  // 是否编辑状态
  const [isEditing, setIsEditing] = useState(false);
  // 鼠标经过显示编辑按钮的控制属性值
  const [showEditIcon, setShowEditIcon] = useState(false);
  // 输入框的value值
  const [inputValue, setInputValue] = useState('');
  // 未更改过的输入框value，主要是为了取消还原成未更改前的值
  const [preValue, setPreValue] = useState('');

  // 当获取到传入的data.value时，设置默认的inputValue、preValue
  useEffect(() => {
    if (props.data?.value) {
      setInputValue(props.data?.value);
      setPreValue(props.data?.value);
    }
  }, [props.data.value]);

  return (
    <div className='InputEdit'>
      <Text strong>{props.data?.label}：</Text>
      {/* 编辑状态 */}
      <div className={`inputContainer ${isEditing ? '' : 'hidden'}`}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={props.data?.placeholder}
        />
        {/* 确认按钮 */}
        <CheckCircleOutlined
          className="icon"
          onClick={() => {
            setIsEditing(false);
            setPreValue(inputValue);
            props.onData(props.data.key, inputValue);
          }}
        />
        {/* 取消按钮 */}
        <CloseCircleOutlined className="icon" onClick={() => {setIsEditing(false);setInputValue(preValue)}} />
      </div>
      {/* 浏览状态 */}
      <div className={`inputContainer ${isEditing ? 'hidden' : ''}`} onMouseOver={() => setShowEditIcon(true)} onMouseOut={() => setShowEditIcon(false)} >
        <Text>{(inputValue || props.data?.placeholder)}</Text>
        {/* 编辑按钮 */}
        <FormOutlined className={`icon ${showEditIcon ? '' : 'hidden'}`} onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
}

// 输入选择的编辑组件
function InputSelect(props) {
  // 是否编辑状态
  const [isEditing, setIsEditing] = useState(false);
  // 鼠标经过显示编辑按钮的控制属性值
  const [showEditIcon, setShowEditIcon] = useState(false);
  // 输入框的value值
  const [inputValue, setInputValue] = useState('');
  // 未更改过的输入框value，主要是为了取消还原成未更改前的值
  const [preValue, setPreValue] = useState('');
  // 传入的下拉框options数据
  const [selectData, setSelectData] = useState([]);

  // 当传入的data.value和data.data发生变化时，更新组件内部状态
  useEffect(() => {
    // 设置默认的inputValue、preValue
    if (props.data?.value) {
      setInputValue(props.data?.value);
      setPreValue(props.data?.value);
    }
    // 设置下拉框数据
    if (props.data?.data) {
      setSelectData(props.data?.data);
    }
  }, [props.data.value, props.data.data]);

  return (
    <div className='InputEdit'>
      <Text strong>{props.data?.label}：</Text>
      {/* 编辑状态 */}
      <div className={`inputContainer ${isEditing ? '' : 'hidden'}`}>
        <Select style={{ minWidth: 380 }} value={inputValue} options={selectData} onChange={(value) => setInputValue(value)} />
        {/* 确认按钮 */}
        <CheckCircleOutlined
          className="icon"
          onClick={() => {
            setIsEditing(false);
            setPreValue(inputValue);
            props.onData(props.data.key, inputValue);
          }}
        />
        {/* 取消按钮 */}
        <CloseCircleOutlined className="icon" onClick={() => {setIsEditing(false);setInputValue(preValue)}} />
      </div>
      {/* 浏览状态 */}
      <div className={`inputContainer ${isEditing ? 'hidden' : ''}`} onMouseOver={() => setShowEditIcon(true)} onMouseOut={() => setShowEditIcon(false)} >
        <Text>{(inputValue || props.data?.placeholder)}</Text>
        {/* 编辑按钮 */}
        <FormOutlined className={`icon ${showEditIcon ? '' : 'hidden'}`} onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
}

// 输入数字的编辑组件
function InputNumbers(props) {
  // 是否编辑状态
  const [isEditing, setIsEditing] = useState(false);
  // 鼠标经过显示编辑按钮的控制属性值
  const [showEditIcon, setShowEditIcon] = useState(false);
  // 输入框的value值
  const [inputValue, setInputValue] = useState('');
  // 未更改过的输入框value，主要是为了取消还原成未更改前的值
  const [preValue, setPreValue] = useState('');

  // 当传入的data.value发生变化时，更新组件内部状态
  useEffect(() => {
    if (props.data?.value) {
      setInputValue(props.data?.value);
      setPreValue(props.data?.value);
    }
  }, [props.data.value]);

  return (
    <div className='InputEdit'>
      <Text strong>{props.data?.label}：</Text>
      {/* 编辑状态 */}
      <div className={`inputContainer ${isEditing ? '' : 'hidden'}`}>
        <InputNumber
          min={props.data?.min}
          max={props.data?.max}
          style={{ minWidth: 380 }}
          value={inputValue}
          onChange={setInputValue}
          placeholder={props.data?.placeholder}
        />
        {/* 确认按钮 */}
        <CheckCircleOutlined
          className="icon"
          onClick={() => {
            setIsEditing(false);
            setPreValue(inputValue);
            props.onData(props.data.key, inputValue);
          }}
        />
        {/* 取消按钮 */}
        <CloseCircleOutlined className="icon" onClick={() => {setIsEditing(false);setInputValue(preValue)}} />
      </div>
      {/* 浏览状态 */}
      <div className={`inputContainer ${isEditing ? 'hidden' : ''}`} onMouseOver={() => setShowEditIcon(true)} onMouseOut={() => setShowEditIcon(false)} >
        <Text>{(inputValue || props.data?.placeholder)}</Text>
        {/* 编辑按钮 */}
        <FormOutlined className={`icon ${showEditIcon ? '' : 'hidden'}`} onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
}

// 文本显示组件
function TextRead(props){
  return (
    <div className='InputEdit'>
      <Text strong>{props.data?.label}：</Text>
      <Text>{props.data?.value}</Text>
    </div>
  );
}

export { InputURL, TextRead, InputText, InputNumbers, InputSelect };