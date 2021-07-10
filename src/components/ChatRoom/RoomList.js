import React, { useContext } from 'react'
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons'
import { AppContext } from '../../context/AppProvider';

const { Panel } = Collapse;
const PanalStyled = styled(Panel)`
  &&&{
    .ant-collapse-header, p {
      color: #fff;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: #fff;
      padding: 0;
    }
  }
`
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: #fff;
`

export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext)
  return (
    <Collapse ghost defaultActiveKey={['1']} >
      <PanalStyled header='Danh sách các phòng' key='1'>
        {rooms.map(room => <LinkStyled
          key={room.id}
          onClick={() => setSelectedRoomId(room.id)}
        >{room.name}</LinkStyled>)}
        <Button
          type='text'
          icon={<PlusSquareOutlined />}
          className='add-room'
          onClick={() => setIsAddRoomVisible(true)}
        >Thêm phòng</Button>
      </PanalStyled>
    </Collapse>
  )
}
