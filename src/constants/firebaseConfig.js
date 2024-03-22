import { initializeApp } from "firebase/app" ;   

const firebaseConfig = {
  apiKey: "AIzaSyBXoHcqYTsAGe2iQQZyc6f7SOfxntZLdX0",
  authDomain: "vocalearn-login.firebaseapp.com",
  projectId: "vocalearn-login",
  storageBucket: "vocalearn-login.appspot.com",
  messagingSenderId: "566869530416",
  appId: "1:566869530416:web:1cb03ff8299ee59d0d9af5",
  measurementId: "G-B5JH2B3GN2"
};

  const firebaseApp = initializeApp(firebaseConfig);
  export default firebaseApp;