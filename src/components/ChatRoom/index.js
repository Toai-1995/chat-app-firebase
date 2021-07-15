import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import ChatWindow from './ChatWindow';
import SideBar from './SideBar';
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
export default function Chatroom() {
  const history = useHistory()
  useEffect(() => {
    const unsubribe = auth.onAuthStateChanged(user => {
      if (user) {
        history.push('/');
      }
      else {
        history.push('/login');
      }
    });
    return () => unsubribe();
  }, [history])
  return (
    <Row>
      <Col span={6}><SideBar /></Col>
      <Col span={18}><ChatWindow /></Col>
    </Row>
  )
}
