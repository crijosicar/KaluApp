import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as types from '../reducers/types';
import Api from '../lib/api';

export function sendMessage(message) {
  return dispatch => new Promise(async (resolve, reject) => {
    await dispatch(chatMessageLoading());

    let createdAt = new Date().getTime();
    let currentUser = {
      email: "email@mail.com",
      id: '001'
    }
    let chatMessage = {
      text: message,
      createdAt: createdAt,
      user: currentUser
    }

    console.log(chatMessage);

    if(false){
      return resolve(dispatch(chatMessageError("Error de prueba!")));
    }
    return resolve(dispatch(chatMessageSuccess()));

  })
  .catch(async (err) => {
     await dispatch(chatMessageError(err.message));
     throw err.message;
   });
}

export function loadMessages() {
  return dispatch => new Promise(async (resolve, reject) => {
    let Auth = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9rYWx1YWRtaW4ubG9jYWwvYXBpL2xvZ2luIiwiaWF0IjoxNTIzMjIzMzA0LCJleHAiOjE1NTQ3NTkzMDQsIm5iZiI6MTUyMzIyMzMwNCwianRpIjoibVF0aUxDQlRmOGwxaldsMyJ9.bMhXdOcomataJMBNDoEyN8sXJl3Pim7Mh6JaXTQ1gj0';

    return Api.post('http://127.0.0.1:80/api/get-messages', { "user_id": 1, "token": Auth })
    .then(async (response) => {
         await dispatch(loadMessagesSuccess(response.data));
         resolve();
    })
    .catch(reject);

  }).catch(async (err) => {
      throw err.message;
      await dispatch(loadMessagesError(err.message));
  });
}

export function updateMessage(text) {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch(chatUpdateMessage(text)));
  })
  .catch(async (err) => {
    throw err.message;
  });
}


const chatMessageLoading = () => ({
  type: types.CHAT_MESSAGE_LOADING
})

const chatMessageSuccess = () => ({
  type: types.CHAT_MESSAGE_SUCCESS
})

const chatMessageError = error => ({
  type: types.CHAT_MESSAGE_ERROR,
  error
})

const chatUpdateMessage = text => ({
  type: types.CHAT_MESSAGE_UPDATE,
  text
})

const loadMessagesSuccess = messages => ({
  type: types.CHAT_LOAD_MESSAGES_SUCCESS,
  messages
})

const loadMessagesError = error => ({
  type: types.CHAT_LOAD_MESSAGES_ERROR,
  error
})
