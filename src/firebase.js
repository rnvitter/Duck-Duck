import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

console.log(process.env)
var firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const usersCollection = db.collection('users');
const pollsCollection = db.collection('polls');
const votesCollection = db.collection('votes');

export {
  db,
  auth,
  usersCollection,
  pollsCollection,
  votesCollection
}
