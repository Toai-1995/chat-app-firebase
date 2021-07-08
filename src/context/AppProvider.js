import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { useFilestore } from '../hook/useFilestore';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const user = useContext(AuthContext);
  const { uid } = user
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
  const rooms = useFilestore('rooms', roomCondition)
  return (
    <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId }}>
      {children}
    </AppContext.Provider>
  )
}
