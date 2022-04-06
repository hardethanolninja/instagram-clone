import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from './login';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found';
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg flex flex-col">
        <p className="text-center text-2xl">Not Found!</p>
        <Link
          className="text-center 
          text-2xl 
          text-blue-medium 
          underline"
          to="/"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
