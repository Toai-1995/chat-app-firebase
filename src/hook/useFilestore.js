import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFilestore = (collection, condition) => {
  const [document, setDocument] = useState([])
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createAt');
    /*
    // condition = 
      fieldName: '',
      operator: '=',
      compareValue: ''
    // 
    */
    if (condition) {
      if (!(condition.compareValue || condition.compareValue.length)) {
        console.log(condition.compareValue);
        return;
      }
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
    }
    console.log('usefilestore ')
    const unsbcribe = collectionRef.onSnapshot(snapshot => {
      console.log('doc', snapshot.docs);
      const documents = snapshot.docs.map(doc => (
        {
          ...doc.data(),
          id: doc.id,
        }
      ))
      setDocument(documents)
      // console.log({ documents });
    });
    return () => unsbcribe();
  }, [condition, collection]);
  return document;
}