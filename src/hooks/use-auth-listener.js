import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
  //pull user data from localstorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );

  //pull firebase context
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      //store authUser in local storage, clean storage if no authUser
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    //close out listener
    return () => listener();
  }, [firebase]);

  return { user };
}
