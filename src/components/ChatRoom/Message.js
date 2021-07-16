import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns';
import React from 'react'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  margin-bottom: 5px;
  .date{
    margin-left: 10px;
    font-size: 10px;
    color: #a7a7a7
  }
  .content {
    margin-left: 5px;
  }

  @media(min-width: 1024px){
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
      margin-left: 5px;
    }
  }
`;


export default function Message({ text, displayName, createdAt, photoURL }) {
  const formatDate = (second) => {
    let formattedDate = '';
    if (second) {
      formattedDate = formatRelative(new Date(second * 1000), new Date());
      formattedDate = formattedDate.slice(0, 3) + " " + formattedDate.slice(formattedDate.indexOf('at'));
    }
    return formattedDate;
  }
  return (
    <WrapperStyled>
      <div>
        <Avatar size='small' src={photoURL}>{photoURL ? '' : displayName.charAt(0).toUpperCase()}</Avatar>
        <Typography.Text className='content'>{text}</Typography.Text>
      </div>
      <div><Typography.Text className='date'>{formatDate(createdAt?.seconds)}</Typography.Text></div>
    </WrapperStyled>
  )
}
