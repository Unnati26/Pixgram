import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  
  apiKey: "AIzaSyC5sPhno5XMY5B8V-ey3Mu640bzA3Sx7_I",
  authDomain: "instagram-clone-1d4dd.firebaseapp.com",
  projectId: "instagram-clone-1d4dd",
  storageBucket: "instagram-clone-1d4dd.appspot.com",
  messagingSenderId: "522746818445",
  appId: "1:522746818445:web:eb81f2221fd8fb02d117c4",
  measurementId: "G-LRGWEN3XCT"
    
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  // const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth , storage};
  export default db;