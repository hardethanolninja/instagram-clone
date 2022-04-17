import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  updateLoggedInUserFollowing,
  updatedFollowedUserFollowers,
} from '../../services/firebase';

export default function SuggestedProfile({
  profileDocId,
  loggedInUserDocId,
  username,
  profileId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    //update update following array of logged in user
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    //update followers array of user who is now followed
    await updatedFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={
            username === 'jon' ||
            username === 'orwell' ||
            username === 'dali' ||
            username === 'raphael' ||
            username === 'candy'
              ? `./images/avatars/${username}.jpg`
              : `./images/avatars/default.png`
          }
          alt={`${username} avatar`}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={() => handleFollowUser()}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
