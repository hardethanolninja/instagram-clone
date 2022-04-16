import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  //user signup handler
  const handleSignup = async (e) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);

    if (usernameExists.length === 0) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        //authentication
        await createdUserResult.user.updateProfile({ displayName: username });

        //firebase user creation
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLocaleLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });
        //add nav history to react router dom
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setUserName('');
        setError(error.message);
      }
    } else {
      setError('That username is already taken, please try another');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto h-screen max-w-screen-md items-center">
      <div className="flex w-3/5">
        <img
          src="./images/iphone-with-profile.jpg"
          alt="iPhone with instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col item-center bg-white p-4 mb-4 border rounded border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="./images/logo.png"
              alt="instagram logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} autoComplete="off" method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              autoComplete="off"
            ></input>
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              autoComplete="off"
            ></input>
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
              autoComplete="off"
            ></input>
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              autoComplete="off"
            ></input>
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              } `}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className="text-sm">
            Have an account? {``}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
