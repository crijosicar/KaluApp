import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as types from '../reducers/types';
import Api from '../lib/api';
import * as api from '../constants/api'

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsImlzcyI6Imh0dHA6Ly9rYWx1YWRtaW4ubG9jYWwvYXBpL2xvZ2luIiwiaWF0IjoxNTI0Njc2Mzg5LCJleHAiOjE1NTYyMTIzODksIm5iZiI6MTUyNDY3NjM4OSwianRpIjoiTmVsNElGSHJtd3VuTU9HOCJ9.yBKM01DHsf3Kqjuuo_m0kPM7T7pnnWujM2shwSJuDwI";

export function sendMessage(message) {
  return dispatch => new Promise(async (resolve, reject) => {
    await dispatch(chatMessageLoading());

    let createdAt = new Date().getTime();

    return Api.post(`${api.basePath}/api/send-message`,
      {
        "user_id": 1,
        "is_bot": 1,
        "mensaje": message,
        "fecha_creacion": createdAt,
        "user": {
          "email": "email@mail.com",
          "id": '001'
        },
        "token": token
      }
    )
    .then(async (response) => {
          await dispatch(chatMessageSuccess());
          resolve();
    })
    .catch((err) => {
      dispatch(chatMessageError("Error de prueba!"));
      reject();
    });
  })
  .catch(async (err) => {
     await dispatch(chatMessageError(err.message));
     throw err.message;
   });
}

export function loadMessages() {
  return dispatch => new Promise(async (resolve, reject) => {
    return Api.post(`${api.basePath}/api/get-messages`,
      {
         "user_id": 1,
         "token": token
      }
    )
    .then(async (response) => {
         await dispatch(loadMessagesSuccess(response));
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
