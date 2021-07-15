import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns';
import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  margin-bottom: 5px;
  .author {
    marfin-left: 5px;
    font-weight: bold;
  }
  .date{
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7
  }
  .content {
    margin-left: 30px;
  }
`;


export default function Message({ text, displayName, createdAt, photoURL }) {
  const formatDate = (second) => {
    let formattedDate = '';
    if (second) {
      formattedDate = formatRelative(new Date(second * 1000), new Date())
    }
    return formattedDate
  };
  return (
    <WrapperStyled>
      <div>
        <Avatar size='small' src={photoURL}>{photoURL ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
        {/* <Typography.Text className='author'>{displayName}</Typography.Text> */}
        <Typography.Text className='date'>{formatDate(createdAt?.seconds)}</Typography.Text>
      </div>
      <div><Typography.Text className='content'>{text}</Typography.Text></div>
    </WrapperStyled>
  )
}
