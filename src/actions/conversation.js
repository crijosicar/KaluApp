import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as types from '../reducers/types';
import axios from 'axios';

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
     await resolve(dispatch(chatMessageError(err.message)))
     throw err.message;
   });
}

export function loadMessages() {
  return dispatch => new Promise(async (resolve, reject) => {
    /*let arrMensajes = [
      {
        text: "hola",
        createdAt: new Date().getTime(),
        user: {
          email: "email@mail.com",
          id: '001'
        }
      },
      {
        text: "hola",
        createdAt: new Date().getTime(),
        user: {
          email: "email@mail.com",
          id: '001'
        }
      },
      {
        text: "hola",
        createdAt: new Date().getTime(),
        user: {
          email: "email@mail.com",
          id: '001'
        }
      }
    ];*/

    return axios.get('http://kaluadmin.local/api/get-messages')
      .then(function (response) {
          console.log(response);
           resolve(dispatch(loadMessagesSuccess(response.data)));
      })
      .catch(async function (error) {
          await reject(dispatch(loadMessagesError(error.message)));
      });
  })
  .catch(async (err) => {
    await resolve(dispatch(loadMessagesError(err.message)));
    throw err.message;
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
