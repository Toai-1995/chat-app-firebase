import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config'
import { useHistory } from 'react-router-dom';

const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const history = useHistory();
  const loginFacebook = () => {
    console.log('click');
    auth.signInWithPopup(fbProvider);
  }
  const loginGoogle = () => {
    auth.signInWithPopup(ggProvider);
  }
  auth.onAuthStateChanged(user => {
    if (user) {
      history.push('/')
    }
  })
  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }}>Đăng Nhập</Title>
          <Button style={{ width: '100%', marginBottom: 5 }} onClick={loginGoogle}>Đăng nhập bằng Google</Button>
          <Button style={{ width: '100%', marginBottom: 5 }} onClick={loginFacebook}>Đăng nhập bằng FaceBook</Button>
        </Col>
      </Row>
    </div>
  )
}
