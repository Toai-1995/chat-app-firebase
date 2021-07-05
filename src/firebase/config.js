import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBgljfOMg2zOkod2B1RYcgfapvovSv0kRs",
  authDomain: "chat-app-951bb.firebaseapp.com",
  projectId: "chat-app-951bb",
  storageBucket: "chat-app-951bb.appspot.com",
  messagingSenderId: "329784816412",
  appId: "1:329784816412:web:b6e22f82b25b3831e040d9",
  measurementId: "G-GKRB8NFYL0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;