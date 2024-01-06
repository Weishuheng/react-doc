import { Card, Col, Row, Button, DatePicker, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../style/home.css'

function Home(){
  return (
    <div>
      <div className="titleBox">
        <h1>首页</h1>
        <div>
          <DatePicker /> 
          <TimePicker /> 
          <Button type="primary" icon={<PlusOutlined  />}>
            添加新项目
          </Button>
        </div>
      </div>
      <Row gutter={16} >
        <Col span={8}>
          <Link to='/doc/2/page/init'>
            <Card title="开发者前台"  hoverable bordered={false}>
              简介：开发者前台的前后端接口文档
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to='/doc/3/page/init'>
            <Card title="开发者后台" hoverable bordered={false}>
              简介：开发者后台的前后端接口文档
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to='/doc/4/page/init'>
            <Card title="广告主前台" hoverable bordered={false}>
              简介：广告主前台的前后端接口文档
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to='/doc/5/page/init'>
            <Card title="广告主后台" hoverable bordered={false}>
              简介：广告主后台的前后端接口文档
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
export default Home;