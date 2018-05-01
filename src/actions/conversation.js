import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as types from '../reducers/types';
import Api from '../lib/api';

export function sendMessage(message, member, from) {
  return dispatch => new Promise(async (resolve, reject) => {

    await dispatch(chatMessageLoading());

    //let baseurl = "http://www.kaluapp.com:81/api/send-message";
    let baseurl = "http://192.168.1.15/api/send-message";

    return Api.post(baseurl,
      {
        "user_id": member.id,
        "is_bot": from,
        "mensaje": message,
        "fecha_creacion": null,
        "user": {
          "email": member.email,
          "id": member.id
        },
        "token": member.token
      }
    )
    .then((response) => {
          if(response.error){
              dispatch(chatMessageError("Ocurrió un error!"));
              resolve();
          } else {
              dispatch(chatMessageSuccess());
              resolve();
          }
    })
    .catch((err) => {
      dispatch(chatMessageError("Ocurrió un error!"));
      reject();
    });

  })
  .catch(async (err) => {
     await dispatch(chatMessageError(err.message));
     throw err.message;
   });
}

export function loadMessages(member) {
  return dispatch => new Promise(async (resolve, reject) => {

    await statusMessage(dispatch, 'loading', true);
    //let baseurl = "http://www.kaluapp.com:81/api/get-messages";
    let baseurl = "http://192.168.1.15/api/get-messages";

    return Api.post(baseurl,
      {
           "user_id": member.id,
           "token": member.token
      }
    )
    .then((response) => {
        statusMessage(dispatch, 'loading', false);

        if(response.stack){
          dispatch(loadMessagesError(response.message));
          reject();
          return;
        }

        dispatch(loadMessagesSuccess(response));
        resolve();
        return;
    })
    .catch(reject);

  }).catch(async (err) => {
      await statusMessage(dispatch, 'loading', false);
      throw err.message;
  });
}

export function loadMessagesByMember(member) {
  return dispatch => new Promise(async (resolve, reject) => {

    await statusMessage(dispatch, 'success', "Enviando mensaje...");
    let baseurl = "http://www.kaluapp.com:81/api/get-messages";
    //let baseurl = "http://192.168.1.15/api/get-messages";


    return Api.post(baseurl,
      {
           "user_id": member.id,
           "token": member.token
      }
    )
    .then((response) => {
        statusMessage(dispatch, 'loading', false);

        if(response.stack){
          dispatch(loadMessagesError(response.message));
          reject();
        }

        dispatch(loadMessagesSuccess(response));
        resolve();
    })
    .catch(reject);

  }).catch(async (err) => {
      await statusMessage(dispatch, 'loading', false);
      throw err.message;
  });
}

export function updateMessage(text) {
  return chatUpdateMessage(text);
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
