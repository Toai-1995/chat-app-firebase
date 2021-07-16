import React, { useContext } from 'react';
import { Button, Avatar, Typography, Tooltip } from 'antd';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider';

const WrapperStyled = styled.div`
display: inline-block;
width: 100%;
  .userinfo {
    display: flex;
    margin: 10px 5px;
  }
  .username {
    width: 50%;
    color: #000;
    align-self: center;
    margin-left: 5px;
    font-size: 12px;
  }
  .btn {
    margin: 5px 7px;
    font-size: 12px;
    padding: 5px;
  }
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 10px 7px;
    border-bottom: 1px solid rgb(82, 38, 83);
    .userinfo {
      display: flex;
      margin: 5px 4px;
      width: 70%
    }
    .username {
      width: 80%;
      color: #000;
      align-self: center;
      margin-left: 5px;
      font-size: 14px;
    }
    .btn {
      margin: 5px 7px;
      font-size: 13px;
      padding: 5px;
    }
  }
`

export default function UserInfo() {
  const user = useContext(AuthContext);
  const { displayName, photoURL } = user
  const handleLogOut = () => {
    auth.signOut();
  }

  return (
    <WrapperStyled>
      <div className='userinfo'>
        <Tooltip title={displayName}>
          <Avatar src={photoURL} className='avatar'>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        </Tooltip>
        <Typography.Text className='username' ellipsis={true}>{displayName}</Typography.Text>
      </div>
      <Button onClick={handleLogOut} ghost className='btn' >Đăng xuất</Button>
    </WrapperStyled>

  )
}
