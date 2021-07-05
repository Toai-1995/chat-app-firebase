import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config'

const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function index() {
  const loginFacebook = () => {
    console.log('click');
    auth.signInWithPopup(fbProvider)
  }
  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }}>Đăng Nhập</Title>
          <Button style={{ width: '100%', marginBottom: 5 }}>Đăng nhập bằng Google</Button>
          <Button style={{ width: '100%', marginBottom: 5 }} onClick={loginFacebook}>Đăng nhập bằng FaceBook</Button>
        </Col>
      </Row>
    </div>
  )
}
