import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCsmbXuCclrnvM3k7F-kQ2nge4IhwfZp84",
  authDomain: "fir-846ca.firebaseapp.com",
  projectId: "fir-846ca",
  storageBucket: "fir-846ca.appspot.com",
  messagingSenderId: "330183265692",
  appId: "1:330183265692:web:a0580ce47b4667b325cc59",
  measurementId: "G-EM13WR85E3"
}

firebase.initializeApp(firebaseConfig)
export default firebase.auth()