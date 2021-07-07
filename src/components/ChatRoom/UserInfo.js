import React from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router-dom';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(82, 38, 83);

  .username {
    color: #fff;
    margin-left: 5px;
  }
`

export default function UserInfo() {
  const history = useHistory()
  const handleLogOut = () => {
    auth.signOut();
  }
  return (
    <WrapperStyled>
      <div>
        <Avatar>T</Avatar>
        <Typography.Text className='username'>ABC</Typography.Text>
      </div>
      <Button onClick={handleLogOut} ghost>Đăng xuất</Button>
    </WrapperStyled>

  )
}
