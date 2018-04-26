import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as types from '../reducers/types';
import Api from '../lib/api';
import { basePath } from '../constants/api'

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly93d3cua2FsdWFwcC5jb206ODEvYXBpL2xvZ2luIiwiaWF0IjoxNTI0NzAzMjA1LCJleHAiOjE1NTYyMzkyMDUsIm5iZiI6MTUyNDcwMzIwNSwianRpIjoiYjI1NGJhREp2bEJqYTlrRCJ9.50Hc4bf6m0y0p0eBmlzQ8OvRGY8u3ma-r_9a3u_nVeU";
//const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUsImlzcyI6Imh0dHA6Ly9rYWx1YWRtaW4ubG9jYWwvYXBpL2xvZ2luIiwiaWF0IjoxNTI0NzAyOTg2LCJleHAiOjE1NTYyMzg5ODYsIm5iZiI6MTUyNDcwMjk4NiwianRpIjoiVFZOaGNnY1V3V3cxQW5zUCJ9.--VvBwJKF6O4jwFhLWvQxdZoz5KhyyWctPMgUvyluU0";

export function sendMessage(message) {
  return dispatch => new Promise(async (resolve, reject) => {
    await dispatch(chatMessageLoading());

    let createdAt = new Date().getTime();
    //let baseurl = "http://kaluadmin.local/api/send-message";
    let baseurl = "http://www.kaluapp.com:81/api/send-message";

    return Api.post(baseurl,
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
    .then((response) => {
          dispatch(chatMessageSuccess());
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

    await statusMessage(dispatch, 'loading', true);
    //let baseurl = "http://kaluadmin.local/api/get-messages";
    let baseurl = "http://www.kaluapp.com:81/api/get-message";

    return Api.post(baseurl,
    {
         "user_id": 1,
         "token": token
    })
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
