import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import usePhotos from '../hooks/use-photos';

import Post from './post';

export default function Timeline() {
  // get logged in user's photos
  const { photos } = usePhotos();

  //use react skeleton for loading photos

  //if we have photos, render them by creating a post compoenent

  // if no photos, tell user to make photos
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton className="mb-5" count={4} width={640} height={500} />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}
