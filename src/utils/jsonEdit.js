import React, { useState } from "react";
import { Typography } from 'antd';
import { FormOutlined, SaveOutlined } from '@ant-design/icons';
import AceEditor from "react-ace";

// 导入所需的语法和主题文件
// JAVA 模式 不知为何引进JSON和JAVASCRIPTS总是报错
import 'ace-builds/src-noconflict/mode-java';
// 主题
import 'ace-builds/src-noconflict/theme-github'; 
// 浏览状态下代码的高亮
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function JsonEditor() {
  const { Text } = Typography;
  const [jsonData, setJsonData] = useState('//请输入返回的数据例子\n{\n\n}');
  const [isEditing, setIsEditing] = useState(false);
  // json数据双向绑定
  const onChange = (newValue) => {
    setJsonData(newValue);
  };
  // 返回页面结构
  return (
    <div style={{'padding' : '10px 0'}}>
      <div style={{'display' : 'flex', 'justifyContent' : 'space-between', 'alignContent' : 'center'}}>
        <div>
          <Text strong>返回数据</Text>
          <Text>(JSON)</Text>
        </div>
        <div>
          {/* 使用外部样式表，主要为了使用className、hover */}
          <style>
            {`
              .iconStyle {
                'fontSize': 18px; 
              }

              .iconStyle:hover {
                color: #1890ff;
              }
            `}
          </style>
          <FormOutlined className="iconStyle" style={{'display' : (isEditing ? 'none' : 'inline-block')}} onClick={()=>{setIsEditing(true)}} />
          <SaveOutlined className="iconStyle" style={{'display' : (isEditing ? 'inline-block' : 'none')}} onClick={()=>{setIsEditing(false)}} />
        </div>
      </div>
      {/* 代码编辑状态 */}
      <div style={{'border' : '1px solid #e8e8e8', 'marginTop':'5px', 'display' : (isEditing ? 'block' : 'none')}}>
        <AceEditor
          mode="java"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={jsonData}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            basePath: 'path/to/ace-builds',
            showPrintMargin : false,
            tabSize: 2,
          }}
          style={{ width: '100%', height: '300px' }}
        />
      </div>
      {/* 代码浏览状态 */}
      <div style={{'display' : (isEditing ? 'none' : 'block')}}>
        <SyntaxHighlighter language="javascript" style={base16AteliersulphurpoolLight}>
          {jsonData}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default JsonEditor;