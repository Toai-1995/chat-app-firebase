import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFilestore = (collection, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createAt', 'desc');
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
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
    };
    const unsbcribe = collectionRef.onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => (
        {
          ...doc.data(),
          id: doc.id,
        }
      ))
      return setDocument(documents);
    });
    return () => unsbcribe();
  }, [condition, collection]);
  return document;
}

export const useFilestoreCollectionGroup = (collectionGroup, condition) => {
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let collectionRef = db.collectionGroup(collectionGroup);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
    };
    const unsbcribe = collectionRef.onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => (
        {
          ...doc.data(),
          id: doc.id,
        }
      ))
      return setDocument(documents);
    });
    return () => unsbcribe();
  }, [condition, collectionGroup]);
  return document;
}