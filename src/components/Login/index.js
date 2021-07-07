import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth, db } from '../../firebase/config';

const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const loginFacebook = () => {
    auth.signInWithPopup(fbProvider);
  }
  const loginGoogle = async () => {
    const data = await auth.signInWithPopup(ggProvider);
    const { additionalUserInfo, user } = data;
    if (additionalUserInfo?.isNewUser) {
      db.collection('user').add({
        displayName: user.displayName,
        email: user.email,
        photoULR: user.photoURL,
        providerId: additionalUserInfo.providerId
      })
    }
  }

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
