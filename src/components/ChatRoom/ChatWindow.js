import React, { useContext, useMemo, useState } from 'react';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';
import styled from 'styled-components';
import { UserAddOutlined } from '@ant-design/icons';
import Message from './Message';
import { AppContext } from '../../context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../context/AuthProvider';
import { useFilestore } from '../../hook/useFilestore';


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
  display: flex;
  flex-direction: column-reverse;
  // align-items: flex-end; 
  max-height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; / make scrollbar transparent /
}
`
const MessageofMeStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  max-height: 100%;
  over-flow-y: auto;

`

export default function ChatWindow() {
  const { selectedRoom, members, setIsInviteModalVisible } = useContext(AppContext);
  const users = useContext(AuthContext);
  const { uid, photoURL, displayName } = users;
  const [inputValue, setInputValue] = useState('');
  const [form] = Form.useForm();
  const inputRef = React.useRef(null);

  const handleInputOnchange = (e) => {
    setInputValue(e.target.value);
  }

  const handleOnSubmit = () => {
    inputRef.current.focus();
    if (inputValue === '') {
      return;
    }
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    setInputValue('')
    form.resetFields();
  }
  const conditions = useMemo(() => {
    return {
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id
    }
  }, [selectedRoom.id])
  const messages = useFilestore('messages', conditions);
  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className='header_info'>
              <p className='header_title'>{selectedRoom ? selectedRoom.name : ''}</p>
              <span className='header_description'>{selectedRoom ? selectedRoom.description : ''}</span>
            </div>
            <ButtonStyled>
              <Button
                icon={<UserAddOutlined />}
                type='text'
                onClick={() => setIsInviteModalVisible(true)}
              >Mời</Button>
              <Avatar.Group size='small' maxCount={5}>
                {members ? (members.map(member => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0).toUpperCase()}</Avatar>
                  </Tooltip>
                ))) : ''}
              </Avatar.Group>
            </ButtonStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map(mess => (
                uid === mess.uid ? (<MessageofMeStyled key={mess.id}>
                  <Message
                    text={mess.text}
                    displayName={mess.displayName}
                    createdAt={mess.createAt}
                    photoURL={mess.photoURL}>
                  </Message>
                </MessageofMeStyled>)
                  :
                  <Message
                    text={mess.text}
                    key={mess.id}
                    displayName={mess.displayName}
                    createdAt={mess.createAt}
                    photoURL={mess.photoURL}>
                  </Message>
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name='messages'>
                <Input
                  bordered={false} autoComplete='off'
                  onChange={handleInputOnchange}
                  onPressEnter={handleOnSubmit}
                  ref={inputRef}
                ></Input>
              </Form.Item>
              <Button type='primary' onClick={handleOnSubmit}>Gửi</Button>
            </FormStyled>
          </ContentStyled>
        </>)
        : (<Alert
          message='hãy chọn phòng chat'
          type='info'
          showIcon
          style={{ margin: 5 }}
          closable
        />)
      }
    </WrapperStyled >
  )
}
