import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD1fQzsqfhjU8RgAVp3xEG09ZVp4ZuTGdU",
    authDomain: "lb-dys.firebaseapp.com",
    projectId: "lb-dys",
    databaseURL: 'https://lb-dys.firebaseio.com',
    storageBucket: "lb-dys.appspot.com",
    messagingSenderId: "1049377018306",
    appId: "1:1049377018306:web:f51737491aa5069d0a465b",
    measurementId: "G-62EMQFZ0DX"
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
