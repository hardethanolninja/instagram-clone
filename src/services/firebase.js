import { firebase, FieldValue } from '../lib/firebase';

import { doc, getDoc } from 'firebase/firestore';

//checks firestore to see if user exists, returns an array
export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  console.log('result', result);

  return result.docs.map((user) => user.data().length > 0);
}

//checks firestore to get specific user by their userId
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((user) => ({ ...user.data(), docId: user.id }));

  return user;
}

//checks firestore to suggest users you are not currently following, and that are not you
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').get();

  const user = result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );

  return user;
}
