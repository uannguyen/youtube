import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCXBl4WUhXqr_ovWof_F0zNm0jLIEqc5q4",
    authDomain: "322709.firebaseapp.com",
    projectId: "youtube-322709",
    storageBucket: "youtube-322709.appspot.com",
    messagingSenderId: "262823381825",
    appId: "1:262823381825:web:3ade5ff581a3bd672f6fc0",
    measurementId: "G-7ZDRQM9Q93"
  };


  firebase.initializeApp(firebaseConfig)
  export default firebase.auth()