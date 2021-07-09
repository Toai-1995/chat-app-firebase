import React, { useContext, useState } from 'react'
import { Form, Modal, Select } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../context/AuthProvider';

const DebouceSelect = (...props) => {
  const onSearch = (val) => {
    console.log('val: ', val);
  }
  return (
    <Select
      showSearch
      onSearch={() => onSearch}
      placeholder='Nhập tên thành viên'
      style={{ width: '100%' }}
    >

    </Select>
  )
}

export default function InviteMemberModal() {
  const { isInviteModalVisible, setIsInviteModalVisible } = useContext(AppContext);
  const user = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsInviteModalVisible(false)
    form.resetFields();
  };
  const handleOk = () => {
    ///add new memeber to room

    //close modal
    setIsInviteModalVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title='Mời thành viên'
      visible={isInviteModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout='vertical' form={form}>
        <DebouceSelect

        />
      </Form>
    </Modal>
  )
}
