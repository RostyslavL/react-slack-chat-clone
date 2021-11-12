
import { initializeApp } from "firebase/app";
import "firebase/auth"
import "firebase/database"
import "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbDO4MIqWhDIaDmhZbBOoroTavMGi0msI",
  authDomain: "react-slack-chat-clone-503c1.firebaseapp.com",
  projectId: "react-slack-chat-clone-503c1",
  storageBucket: "react-slack-chat-clone-503c1.appspot.com",
  messagingSenderId: "282775309924",
  appId: "1:282775309924:web:df4027da95812042345971"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
