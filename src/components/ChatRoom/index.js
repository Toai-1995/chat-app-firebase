import React from 'react';
import { Col, Row } from 'antd';
import ChatWindow from './ChatWindow';
import SideBar from './SideBar';
export default function Chatroom() {
  return (
    <Row>
      <Col span={6}><SideBar /></Col>
      <Col span={18}><ChatWindow /></Col>
    </Row>
  )
}
