import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
import * as types from '../reducers/types';
import Api from '../lib/api';
import axios from 'axios';
import RNFS from 'react-native-fs';

export function sendMessage(message, member, from) {
  return dispatch => new Promise(async (resolve, reject) => {

    await dispatch(chatMessageLoading());

    let baseurl = "http://www.kaluapp.com:81/api/send-message";
    //let baseurl = "http://192.168.1.15/api/send-message";

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

export function sendMessageAsAudio(audio, member, from) {
  return dispatch => new Promise(async (resolve, reject) => {

    await dispatch(chatMessageLoading());

    let baseurl = "http://www.kaluapp.com:81/api/send-audio-message";
    //let baseurl = "http://192.168.1.15/api/send-audio-message";
    let data = {
      "user_id": member.id,
      "is_bot": from,
      "audio": audio,
      "fecha_creacion": null,
      "user": {
        "email": member.email,
        "id": member.id
      },
      "token": member.token
    };

    return Api.post(baseurl, data)
    .then(async (response) => {
          if(response.error){
              await dispatch(chatMessageError("Ocurrió un error!"));
              resolve();
          } else {
              await dispatch(chatMessageSuccess());
              await dispatch({
                type: types.SET_WATSON_RESPONSE,
                data: response
              });
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

export function uploadAudio(audioPath){
  return dispatch => new Promise(async (resolve, reject) => {
    let uploadAudioURL = "http://www.kaluapp.com:81/api/upload-audio";
    //let uploadAudioURL = "http://192.168.1.15/api/upload-audio";
    let files = [
      {
        name: 'audio',
        filename: 'audio.mp4',
        filepath: audioPath,
        filetype: 'audio/mp4'
      }
    ];

    RNFS.uploadFiles({
      toUrl: uploadAudioURL,
      files: files,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      begin: (response) => {
        var jobId = response.jobId;
      },
      progress: (response) => {
        var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
      }
    }).promise.then((response) => {
      if (response.statusCode == 200){
          let body = JSON.parse(response.body);
          if(body.error){
              reject({ message: "El audio no pudo ser reconocido." });
              return;
          } else {
            dispatch(setAudioFilename({
              "audionName" : body.path_audio
            }));
            resolve();
            return;
          }
      }
    })
    .catch((err) => {
      reject({ message: "El audio no pudo ser reconocido." })
    });

  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

export function loadMessages(member) {
  return dispatch => new Promise(async (resolve, reject) => {

    await statusMessage(dispatch, 'loading', true);
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

const setAudioFilename = data => ({
  type: types.SET_AUDIO_NAME,
  data
})
