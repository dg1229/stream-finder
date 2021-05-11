import firebase from'firebase/app'
import "firebase/auth"
import "firebase/database"

const app = firebase.initializeApp({
    apiKey: "AIzaSyDnBLj2oHRqOg9mm0kwvYX2wfpN82M7LUw",
    authDomain: "streamfinder-7a41e.firebaseapp.com",
    databaseURL: "https://streamfinder-7a41e-default-rtdb.firebaseio.com",
    projectId: "streamfinder-7a41e",
    storageBucket: "streamfinder-7a41e.appspot.com",
    messagingSenderId: "860722722237",
    appId: "1:860722722237:web:57cd4c756f73952c500ed4"
  })

export const database = firebase.database()
export const auth = app.auth()
export default app