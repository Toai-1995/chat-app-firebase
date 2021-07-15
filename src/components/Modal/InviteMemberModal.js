import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Form, Modal, Select, Avatar, Spin } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';
import { debounce } from 'lodash';

const DebouceSelect = ({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  value,
  ...props }) => {

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debouceFetcher = useMemo(() => {
    const loadOptions = value => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);
  return (
    <Select
      showSearch
      mode='multiple'
      filterOption={false}
      onSearch={debouceFetcher}
      placeholder='Nhập tên thành viên'
      style={{ width: '100%' }}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
      )
    </Select >
  )
}

const fetchUserList = (search, curMembers) => {
  return db
    .collection('users')
    .where('keywords', 'array-contains', search.toLowerCase())
    .orderBy('displayName', 'asc')
    .limit(10)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map(
        doc => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        })
      ).filter((opt) => !curMembers.includes(opt.value));
    })
}


export default function InviteMemberModal() {
  const { isInviteModalVisible,
    setIsInviteModalVisible,
    selectedRoom,
    selectedRoomId, } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();
  // fetchUserList('chick', selectedRoom.members).then(opts => console.log(opts))
  const handleCancel = () => {
    setValue([]);
    setIsInviteModalVisible(false);
    form.resetFields();
  };
  const handleOk = () => {

    ///add new memeber to room
    const roomRef = db.collection('rooms').doc(selectedRoomId);
    roomRef.update({
      members: [...selectedRoom.members, ...value],
    })
    //close modal
    form.resetFields();
    setValue([]);
    setIsInviteModalVisible(false);
  };

  return (
    <Modal
      title='Mời thành viên'
      visible={isInviteModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout='vertical' form={form} >
        <DebouceSelect
          fetchOptions={fetchUserList}
          curMembers={selectedRoom.members}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Form>
    </Modal>
  )
}
