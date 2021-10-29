import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC22HW1Dze1bJtcFxHV6Q5O16pPD6JeVS8",
    authDomain: "la-boutique-ays-app.firebaseapp.com",
    projectId: "la-boutique-ays-app",
    databaseURL: 'https://la-boutique-ays-app.firebaseio.com',
    storageBucket: "la-boutique-ays-app.appspot.com",
    messagingSenderId: "989577719184",
    appId: "1:989577719184:web:0a342da0741e35252d9715",
    measurementId: "G-36KFHGZBM1"
};


// Initialize Firebase

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
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
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
