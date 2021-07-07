import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd'
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setLoading(false);
        history.push('/');
      }
      else {
        history.push('/login');
        setLoading(false);
      }
    });
    return () => unsubribe();
  }, [history])
  return (
    <AuthContext.Provider value={user}>
      {loading ? <Spin></Spin> : children}
    </AuthContext.Provider>
  )
}
