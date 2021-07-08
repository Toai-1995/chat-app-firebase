import { useEffect, useState } from 'react';
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
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
    }
    const unsbcribe = collectionRef.onSnapshot(snapshot => {
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