import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline';

export default function Photos({ photos }) {
  console.log('photos', photos);
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img
                src={photo.imageSrc}
                alt={photo.caption}
                className="h-full object-cover"
              />
              <div className=" hover:opacity-100 opacity-0 absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded">
                <div className=" flex flex-col align-start w-full h-full">
                  <p className=" flex mt-2 ml-2 text-white font-bold">
                    <HeartIcon className=" h-6 w-6 mr-1 fill-white" />
                    {photo.likes.length}
                  </p>
                  <p className="flex mt-2 ml-2 text-white font-bold">
                    <ChatIcon className=" h-6 w-6 mr-1 fill-white" />
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
