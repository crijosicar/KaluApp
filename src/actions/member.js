import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import Api from '../lib/api';

/**
  * Sign Up to Firebase
  */
export function signUp(formData) {
  const {
    email,
    password,
    password2,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    let baseurl = "http://www.kaluapp.com:81/api/register";
    //let baseurl = "http://192.168.1.15/api/register";
    let payload = {
      "name": email,
      "email": email,
      "password": password,
      "password_confirm": password2
    }

    return Api.post(baseurl, payload)
      .then(async (response) => {
        if(response.error){
            if(response.messages['name']) reject({ message: response.messages['name'][0] });
            if(response.messages['email']) reject({ message: response.messages['email'][0] });
            if(response.messages['password']) reject({ message: response.messages['password'][0] });
            if(response.messages['password_confirm']) reject({ message: response.messages['password_confirm'][0] });
        } else {
          await statusMessage(dispatch, 'loading', false);
          resolve();
        }
      }).catch(reject);

  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
  * Set this User's Session Details
  */
function validateUserSession(dispatch, signedUp) {
  return dispatch => new Promise((resolve) => {
    return dispatch({
      type: 'SET_USER_STATUS',
      data: {signedUp: signedUp},
    });
  });
}

function validateUserFacebookCreated(formData) {
  const {
   facebook_id
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!facebook_id) return reject({ message: 'id de Facebook es requerida' });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    let baseurl = "http://www.kaluapp.com:81/api/get-user-by-fbid";
   
    let payload = {
      "facebook_id": facebook_id
    }
    
    return Api.post(baseurl, payload)
      .then(async (response) => {
        if(response.error){
            if(response.messages['facebook_id']) reject({ message: response.messages['facebook_id'][0] });
        } 
        else {
          //await statusMessage(dispatch, 'loading', false);
          
          if (response.user!=null){
          
            let baseurl = "http://www.kaluapp.com:81/api/login";
            let email= facebook_id+"@facebook.com"; 
            let password=facebook_id;

            let payload = {
                "email": email,
                "password": password
            };

            return Api.post(baseurl, payload)
              .then(async (response) => {
                if(response.error){
                  await statusMessage(dispatch, 'error', response.message);
                  await validateUserSession(dispatch, false);
                  reject({ message: response.message });
                } 
                else {

                  let baseurl = "http://www.kaluapp.com:81/api/get-user-details";
                  let payload = {
                    "token": response.token
                  };

                  Api.post(baseurl, payload)
                    .then(async (response) => {
                      if(response.error){
                          await statusMessage(dispatch, 'error', response.message);
                          await validateUserSession(dispatch, false);
                          reject({ message: response.message });
                      } else {
                        await validateUserSession(dispatch, true);

                        await dispatch({
                          type: 'USER_LOGIN',
                          data: {
                            token: payload.token
                          }
                        });

                        await dispatch({
                          type: 'SET_USER_DATA',
                          data: response
                        });

                        resolve();
                      }
                    }).catch(reject);
          }

          }).catch(reject);

          }
          else{

            let email= facebook_id+"@facebook.com"; 
            let password=facebook_id;

            let baseurl = "http://www.kaluapp.com:81/api/register";
            //let baseurl = "http://192.168.1.15/api/register";
            let payload = {
              "name": email,
              "email": email,
              "password": password,
              "password_confirm": password
            }
        
            return Api.post(baseurl, payload)
              .then(async (response) => {
                if(response.error){
                    if(response.messages['name']) reject({ message: response.messages['name'][0] });
                    if(response.messages['email']) reject({ message: response.messages['email'][0] });
                    if(response.messages['password']) reject({ message: response.messages['password'][0] });
                    if(response.messages['password_confirm']) reject({ message: response.messages['password_confirm'][0] });
                } else {
                  await statusMessage(dispatch, 'loading', false);

                  let baseurl = "http://www.kaluapp.com:81/api/login";
                  let email= facebook_id+"@facebook.com"; 
                  let password=facebook_id;
        
                  let payload = {
                      "email": email,
                      "password": password
                  };
        
                return Api.post(baseurl, payload)
                  .then(async (response) => {
                    if(response.error){
                        await statusMessage(dispatch, 'error', response.message);
                        await validateUserSession(dispatch, false);
                        reject({ message: response.message });
                    } else {
        
                        let baseurl = "http://www.kaluapp.com:81/api/get-user-details";
                        let payload = {
                          "token": response.token
                        };
        
                        Api.post(baseurl, payload)
                          .then(async (response) => {
                            if(response.error){
                                await statusMessage(dispatch, 'error', response.message);
                                await validateUserSession(dispatch, false);
                                reject({ message: response.message });
                            } else {
                              await validateUserSession(dispatch, true);
        
                              await dispatch({
                                type: 'USER_LOGIN',
                                data: {
                                  token: payload.token
                                }
                              });
        
                              await dispatch({
                                type: 'SET_USER_DATA',
                                data: response
                              });
        
                              resolve();
                            }
                          }).catch(reject);
                }
      
              }).catch(reject);
              }
            }).catch(reject);
          }
        }
      }).catch(reject);
   }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}
  
  


/**
  * Get this User's Session Details
  */
export function getMemberData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(validateUserSession(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
  * Login to Firebase with Email/Password
  */
export function login(formData) {

  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    await statusMessage(dispatch, 'loading', true);

    let baseurl = "http://www.kaluapp.com:81/api/login";
    //let baseurl = "http://192.168.1.15/api/login";

    let payload = {
    	"email": email,
    	"password": password
    };

    return Api.post(baseurl, payload)
      .then(async (response) => {
        if(response.error){
            await statusMessage(dispatch, 'error', response.message);
            await validateUserSession(dispatch, false);
            reject({ message: response.message });
        } else {

            //let baseurl = "http://www.kaluapp.com:81/api/get-user-details";
            let baseurl = "http://192.168.1.15/api/get-user-details";
            let payload = {
              "token": response.token
            };

            Api.post(baseurl, payload)
              .then(async (response) => {
                if(response.error){
                    await statusMessage(dispatch, 'error', response.message);
                    await validateUserSession(dispatch, false);
                    reject({ message: response.message });
                } else {
                  await validateUserSession(dispatch, true);

                  await dispatch({
                    type: 'USER_LOGIN',
                    data: {
                      token: payload.token
                    }
                  });

                  await dispatch({
                    type: 'SET_USER_DATA',
                    data: response
                  });

                  resolve();
                }
              }).catch(reject);
        }

      }).catch(reject);

  }).catch((err) => {
    statusMessage(dispatch, 'error', err.message);
    throw err.message;
   });
}

/**
  * Reset Password
  */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  })
  .catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
   });
}

/**
  * Update Profile
  */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFirstName });

    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ firstName, lastName })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'success', 'Profile Updated');
        resolve();
      }).catch(reject);
  })
  .catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

/**
  * Logout
  */
export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        dispatch({ type: 'USER_RESET' });
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  })
  .catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

/**
  * Set loading
  */
export function setLoadingFalse(){
  return dispatch => new Promise((resolve, reject) => {
    statusMessage(dispatch, 'loading', false);
  })
  .catch((err) => { throw err.message;});
}

/**
  * Reset user
  */
export function userDataReset(){
  return dispatch => new Promise((resolve, reject) => {
    resolve(dispatch({ type: 'USER_RESET' }));
  })
  .catch((err) => { throw err.message;});
}
