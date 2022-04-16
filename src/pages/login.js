import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  //user login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
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

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="jon@lienhard.dev"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            ></input>
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2 bg-gray-background"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            ></input>
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && `opacity-50`
              } `}
            >
              Log in
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary">
          <p className="text-sm">
            Don&apos;t have an account? {``}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
