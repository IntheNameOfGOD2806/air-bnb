import { auth } from '../../../firebaseConfig';
import firebase from 'firebase/compat/app';

export const signInWithGoogle = async () => {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    // User signed in successfully
    const user = result.user;
    console.log('User signed in successfully', user)
    // ...
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

