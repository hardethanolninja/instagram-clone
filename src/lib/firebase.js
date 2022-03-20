import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyA3BPagqBr1k1y4tnYlWqHEfGYJqeuEPek',
  authDomain: 'instagram-clone-fee23.firebaseapp.com',
  projectId: 'instagram-clone-fee23',
  storageBucket: 'instagram-clone-fee23.appspot.com',
  messagingSenderId: '927768507954',
  appId: '1:927768507954:web:c0d7567c1d8994f0a4ee2b',
};

//here i want to import the seed file
// import { seedDatabase } from '../seed';

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//here is where i want to call the seed file ONCE
// seedDatabase(firebase);

export { firebase, FieldValue };
