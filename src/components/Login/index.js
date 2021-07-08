import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import { addDocument } from '../../firebase/services';

const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const loginFacebook = async () => {
    const data = await auth.signInWithPopup(fbProvider);
    const { additionalUserInfo, user } = data;
    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoULR: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId
      })
    }
  };
  const loginGoogle = async () => {
    const data = await auth.signInWithPopup(ggProvider);
    const { additionalUserInfo, user } = data;
    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoULR: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId
      });
    };
  };

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
