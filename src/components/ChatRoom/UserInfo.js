import React, { useEffect, useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { auth, db } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(82, 38, 83);

  .username {
    color: #fff;
    // display: block;
    margin-left: 5px;
  }
`

export default function UserInfo() {
  const user = useContext(AuthContext);
  const { displayName, photoURL } = user
  // useEffect(() => {
  //   db.collection('user').onSnapshot(snapshot => {
  //     const data = snapshot.docs.map(doc => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     // console.log({ data })
  //   })
  // }, [])
  const handleLogOut = () => {
    auth.signOut();
  }

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      <Button onClick={handleLogOut} ghost>Đăng xuất</Button>
    </WrapperStyled>

  )
}
