import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useFilestore, useFilestoreCollectionGroup } from '../hook/useFilestore';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const user = useContext(AuthContext);
  const { uid } = user;
  // room = { 
  //   name: nameroom,
  //   decription: 'mo ta',
  //   members: [uid1, uid2...]
  // }

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid,
    }
  }, [uid]);
  const rooms = useFilestore('rooms', roomCondition);
  // db.collection('rooms').get().then(room => console.log(room.docs.map(doc => doc.data())));

  const selectedRoom = useMemo(
    () => rooms.find(room => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );
  const userCondittion = useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members,
    }
  }, [selectedRoom.members])
  const members = useFilestoreCollectionGroup('users', userCondittion);
  return (
    <AppContext.Provider value={{
      rooms,
      isAddRoomVisible,
      setIsAddRoomVisible,
      selectedRoomId,
      setSelectedRoomId,
      selectedRoom,
      members,
      isInviteModalVisible,
      setIsInviteModalVisible
    }}>
      {children}
    </AppContext.Provider>
  )
}
