import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14',
  authDomain: 'crwn-db.firebaseapp.com',
  projectId: 'crwn-db',
  storageBucket: 'crwn-db.appspot.com',
  messagingSenderId: '850995411664',
  appId: '1:850995411664:web:7ddc01d597846f65'
}{
  apiKey: "AIzaSyC22HW1Dze1bJtcFxHV6Q5O16pPD6JeVS8",
      authDomain: "la-boutique-ays-app.firebaseapp.com",
      projectId: "la-boutique-ays-app",
      databaseURL: 'https://crwn-db.firebaseio.com',
      storageBucket: "la-boutique-ays-app.appspot.com",
      messagingSenderId: "989577719184",
      appId: "1:989577719184:web:20516a759a77167b2d9715",
      measurementId: "G-J5EBRJM5CY"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
