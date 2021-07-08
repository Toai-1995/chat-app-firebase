import React, { useContext } from 'react'
import { Form, Modal, Input } from 'antd'
import { AppContext } from '../../context/AppProvider'
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../context/AuthProvider';

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const user = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsAddRoomVisible(false)
    form.resetFields();
  };
  const handleOk = () => {
    ///add new room to firestore
    addDocument('rooms', { ...form.getFieldValue(), members: [user.uid] })
    //close modal
    setIsAddRoomVisible(false);
    form.resetFields();
  };

  return (
    <Modal
      title='Tạo phòng'
      visible={isAddRoomVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout='vertical' form={form}>
        <Form.Item label='Tên phòng' name='name'>
          <Input placeholder='Nhập tên phòng' />
        </Form.Item>
        <Form.Item label='Mô tả' name='description'>
          <Input placeholder='Mô tả' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
