import firebase, { db } from "./config";

export const addDocument = (collection, data) => {
  const query = db.collection(collection)
  query.add({
    ...data,
    createAt: firebase.firestore.FieldValue.serverTimestamp()
  })
}

export const generateKeywords = (displayName) => {
  let length = displayName.length;
  let keyWord = [];
  let nameArr = displayName.split(" ");
  /* console.log(nameArr); */
  for (let item of nameArr) {
    let word = '';
    for (let i = displayName.indexOf(item); i < length; i++) {
      word += displayName.split('')[i];
      keyWord.push(word);
    }
  }
  return keyWord;
}
