import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCrVC4qMogDlwnYlRWL2Ajzxg0AmuY9FNg',
  authDomain: 'beliystoreadmin.firebaseapp.com',
  projectId: 'beliystoreadmin',
  storageBucket: 'beliystoreadmin.appspot.com',
  messagingSenderId: '688011164935',
  appId: '1:688011164935:web:6d6a59eba7b6781e5059a2',
  measurementId: 'G-H4ML234RQD'
}

// Use these for db & auth
const app = initializeApp(firebaseConfig)

// Get the Firestore and Auth instances
const db = getFirestore()
const auth = getAuth(app)
const storage = getStorage(app)
export { auth, db, storage }
export default app
