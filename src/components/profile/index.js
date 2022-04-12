import { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Photos from './photos';
import {
  getUserByUsername,
  getUserPhotosByUsername,
} from '../../services/firebase';

export default function Profile({ user }) {
  //   const reducer = (state, newState) => ({ ...state, ...newState });
  //   const initialState = {
  //     profile: {},
  //     photosCollection: [],
  //     followerCount: 0,
  //   };

  //   const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
  //     reducer,
  //     initialState
  //   );

  const [profile, setProfile] = useState({});
  const [photosCollection, setPhotosCollection] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);
      //   dispatch({
      //     profile: user,
      //     photosCollection: photos,
      //     followerCount: user.followers.length,
      //   });
      setProfile(user);
      setPhotosCollection(photos);
      setFollowerCount(user.followers.length);
      console.log('initial follower count', followerCount);
    }

    if (user.username) {
      getProfileInfoAndPhotos();
    }
  }, [user.username]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={setFollowerCount}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};
