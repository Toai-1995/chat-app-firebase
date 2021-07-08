import React, { useContext, useMemo } from 'react';
import { Button, Tooltip, Avatar, Form, Input } from 'antd';
import styled from 'styled-components';
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../context/AppProvider';

const WrapperStyled = styled.div`
  height: 100vh;
`

const HeaderStyled = styled.div`
display: flex;
justify-content: space-between;
height: 56px;
padding: 0 16px;
align-items: center;
border-bottom: 1px solid rgb(230, 230, 230);

.header {
  &_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &_title {
    margin: 0;
    font-weight: bold;
  }

  &_description {
    font-size: 12px;
  }
}
`;

const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  over-flow-y: auto;

`

export default function ChatWindow() {
  const { rooms, selectedRoomId } = useContext(AppContext);
  const selectedRoom = useMemo(
    () => rooms.find(room => room.id === selectedRoomId),
    [rooms, selectedRoomId]);
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className='header_info'>
          <p className='header_title'>Room1</p>
          <span className='header_description'> this is romm</span>
        </div>
        <ButtonStyled>
          <Button icon={<UserAddOutlined />} type='text'>Mời</Button>
          <Avatar.Group size='small' maxCount={2}>
            <Tooltip title='A'>
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title='B'>
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title='C'>
              <Avatar>Cong</Avatar>
            </Tooltip>
          </Avatar.Group>
        </ButtonStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message text='hello' displayName='Toai' createdAt='12312313123123' photoURL='https://lh3.googleusercontent.com/a-/AOh14GjjvJjpeUQ-kfkFpdrAV7dAecj5lc0bMHfPu7xB=s96-c'></Message>
          <Message text='hello' displayName='Toai' createdAt='12312313123123' photoURL='https://lh3.googleusercontent.com/a-/AOh14GjjvJjpeUQ-kfkFpdrAV7dAecj5lc0bMHfPu7xB=s96-c'></Message>
          <Message text='hello' displayName='Toai' createdAt='12312313123123' photoURL='https://lh3.googleusercontent.com/a-/AOh14GjjvJjpeUQ-kfkFpdrAV7dAecj5lc0bMHfPu7xB=s96-c'></Message>
          <Message text='hello1' displayName='Toai' createdAt='12312313123123' photoURL='https://lh3.googleusercontent.com/a-/AOh14GjjvJjpeUQ-kfkFpdrAV7dAecj5lc0bMHfPu7xB=s96-c'></Message>
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input bordered={false} autoComplete='off'></Input>
          </Form.Item>
          <Button type='primary'>Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}
