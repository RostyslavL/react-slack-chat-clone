import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCbDO4MIqWhDIaDmhZbBOoroTavMGi0msI",
    authDomain: "react-slack-chat-clone-503c1.firebaseapp.com",
    databaseURL: "https://react-slack-chat-clone-503c1-default-rtdb.firebaseio.com",
    projectId: "react-slack-chat-clone-503c1",
    storageBucket: "react-slack-chat-clone-503c1.appspot.com",
    messagingSenderId: "282775309924",
    appId: "1:282775309924:web:df4027da95812042345971"
}

firebase.initializeApp(firebaseConfig)

export default firebase



