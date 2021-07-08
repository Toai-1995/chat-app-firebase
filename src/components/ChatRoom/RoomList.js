import React, { useContext, useMemo } from 'react'
import { Collapse, Typography, Button } from 'antd'
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons'
import { useFilestore } from '../../hook/useFilestore';
import { AuthContext } from '../../context/AuthProvider';

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
  const user = useContext(AuthContext);
  const { uid } = user
  // room = { 
  //   name: nameroom,
  //   decription: 'mo ta',
  //   members: [uid1, uid2...]
  // }

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }
  }, [uid]);
  const rooms = useFilestore('rooms', roomCondition)
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <PanalStyled header='Danh sách các phòng' key='1'>
        {rooms.map(room => <LinkStyled key={room.name}>{room.name}</LinkStyled>)}
        {/* <LinkStyled>Room 1</LinkStyled>
        <LinkStyled>Room 2</LinkStyled>
        <LinkStyled>Room 3</LinkStyled> */}
        <Button type='text' icon={<PlusSquareOutlined />} className='add-room' >Thêm phòng</Button>
      </PanalStyled>
    </Collapse>
  )
}
