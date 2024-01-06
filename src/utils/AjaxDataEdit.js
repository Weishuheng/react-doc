import React, { useState } from "react";
import { Button, Table, Typography, Input, Select, Switch } from 'antd';
import { EditFilled, DeleteFilled, SaveOutlined, PlusSquareOutlined } from '@ant-design/icons';
import '../style/AjaxDataEdit.css';

function AjaxDataEdit(){
  const { Text } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;

  //表头数据定义
  const columns = [
    {
      title: '参数名',
      dataIndex: 'name',
      key: 'name',
      width : 100,
      render: (text, record) => {
        // 根据编辑状态isEdit，显示编辑样式还是浏览样式
        const isEdit = isEditing(record);
        return isEdit ? (
          <Input defaultValue={text} />
        ) : (
          text
        )
      }
    },{
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width : 70,
      render: (text, record) => {
        // 根据编辑状态isEdit，显示编辑样式还是浏览样式
        const isEdit = isEditing(record);
        return isEdit ? (
          <Select defaultValue={text}>
            <Option value="String">String</Option>
            <Option value="Number">Number</Option>
            <Option value="Boolean">Boolean</Option>
            <Option value="Object">Object</Option>
            <Option value="Array">Array</Option>
          </Select>
        ) : (
          text
        )
      }
    },{
      title: '是否必填',
      dataIndex: 'required',
      key: 'required',
      width : 90,
      render: (f, record) => {
        // 根据编辑状态isEdit，显示编辑样式还是浏览样式
        const isEdit = isEditing(record);
        return isEdit ? (
          <Switch checkedChildren="必填" unCheckedChildren="选填" defaultChecked={f} />
        ) : (
          f ? <span style={{'color':'#ff8104'}}>* 必填</span> : <span style={{'paddingLeft':'8px', 'color' : '#666'}}>选填</span>
        )
      }
    },{
      title: '示例',
      dataIndex: 'example',
      key: 'example',
      render: (text, record) => {
        const isEdit = isEditing(record);
        // 根据编辑状态isEdit，显示编辑样式还是浏览样式
        return isEdit ? (
          <TextArea defaultValue={text} placeholder='请填写示例' autoSize />
        ) : (
          (text !== undefined && text !== '' ? text : '--')
        )
      }
    },{
      title: '说明',
      dataIndex: 'intro',
      key: 'intro',
      render: (text, record) => {
        // 根据编辑状态isEdit，显示编辑样式还是浏览样式
        const isEdit = isEditing(record);
        return isEdit ? (
          <TextArea defaultValue={text} placeholder='请填写说明' autoSize />
        ) : (
          (text !== undefined && text !== '' ? text : '--')
        )
      }
    },{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width : 150,
      render: (_, record) => {
        // 根据编辑状态isEdit，显示编辑样式还是浏览样式
        const isEdit = isEditing(record);
        return isEdit ? (
          <div>
          <Button
            type="primary"
            size="small"
            icon={<SaveOutlined />}
            style={{'marginRight' : '7px'}}
            onClick={() => handleSave(record.name)}
          >
            Save
          </Button>
          <Button
            size="small"
            onClick={() => handleCancel(record.name)}
          >
            Cancel
          </Button>
        </div>
        ) : (
          <div>
            <Button
              type="primary"
              size="small"
              icon={<EditFilled />}
              style={{'marginRight' : '7px'}}
              onClick={() => handleEdit(record.name)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              size="small"
              icon={<DeleteFilled />}
              onClick={() => handleDelete(record.name)}
              danger
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]
  // 表格数据，即ajax要传递的param或data
  const [data, setData] = useState([
    {
      name : 'userid',
      type : 'String',
      required : true,
      example : '123',
      intro : ''
    }, {
      name : 'userName',
      type : 'String',
      required : false,
      example : '',
      intro : '456'
    }
  ])
  // 参数名，根据参数名来确认哪行数据（最好定义key使用key）
  const [editingName, setEditingName] = useState(null);
 // 编辑状态设置
  const isEditing = (record) => record.name === editingName;
  // 点击编辑按钮
  const handleEdit = (name)=> {
    setEditingName(name);
  }
  // 点击删除按钮
  const handleDelete = (name)=> {
    const updatedData = data.filter((item) => item.name !== name);
    setData(updatedData);
  }
  // 点击保存按钮
  const handleSave = (name)=> {

  }
  // 点击取消按钮
  const handleCancel = (name)=> {
    setEditingName(null);
  }
  // 点击添加按钮
  const handleAdd = ()=> {
    const updatedData = data.concat({
      name : '',
      type : 'String',
      required : false,
      example : '',
      intro : ''
    });
    setData(updatedData);
    setEditingName('');
  }

  return (
    <div>
      <div style={{'display':'flex', 'justifyContent':'space-between','width':'700px', 'paddingBottom' : '5px'}}>
        <Text strong>传递参数</Text>
        <PlusSquareOutlined className="icon_add" onClick={()=>{handleAdd()}} />
      </div>
      <div style={{'border' : '1px solid #e8e8e8','width':'700px', 'fontSize' : '12px'}}>
        <Table  columns={columns} dataSource={data} rowKey="name" pagination={false} />
      </div>
    </div>
  )
}

export default AjaxDataEdit;