import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Login to Firebase with Email/Password
  */
export function sendMessage(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    await statusMessage(dispatch, 'loading', false);

    // Send Login data to Redux
    return resolve(dispatch({
      type: 'CONVERSATION_ADD_MESSAGE_CHAT',
      data: {},
    }));
  })
  .catch(async (err) => {
     await statusMessage(dispatch, 'error', err.message);
     throw err.message;
   });
}

export function getConversationData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserData(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}
