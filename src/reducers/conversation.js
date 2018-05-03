import Store from '../store/conversation';
import  * as types from './types';

export const initialState = Store;

export default function conversationReducer(state = initialState, action) {
  switch (action.type) {
    case types.CHAT_MESSAGE_LOADING: {
        return {
          ...state,
          sending: true,
          sendingError: null,
          error: null,
          loading: false,
        }
    }
    case types.CHAT_MESSAGE_ERROR: {
      if(action.error){
        return {
          ...state,
          sending: false,
          sendingError: action.error,
          error: null,
          loading: false,
        };
      }
      return initialState;
    }
    case types.CHAT_MESSAGE_SUCCESS: {
        return {
          ...state,
          sending: false,
          sendingError: null,
          message: '',
          error: null,
          loading: false,
        }
    }
    case types.CHAT_MESSAGE_UPDATE: {
      if(action.text){
        return {
          ...state,
          sending: false,
          message: action.text,
          sendingError: null,
          error: null,
          loading: false,
        }
      }
      return initialState;
    }
    case types.CHAT_LOAD_MESSAGES_SUCCESS: {
      if(action.messages){
        return {
          ...state,
          sending: false,
          messages: action.messages,
          loadMessagesError: null,
          error: null,
          loading: false,
        }
      }
      return initialState;
    }
    case types.CHAT_LOAD_MESSAGES_ERROR: {
      if(action.error){
        return {
          ...state,
          sending: false,
          messages: [],
          loadMessagesError: action.error,
          error: null,
          loading: false,
        }
      }
      return initialState;
    }
    case types.SET_AUDIO_NAME: {
      if(action.data){
        return {
          ...state,
          audionName: action.data.audionName
        }
      }
      return initialState;
    }
    case types.SET_WATSON_RESPONSE: {
      if(action.data){
        return {
          ...state,
          watsonResponse: action.data
        }
      }
      return initialState;
    }
    default:
      return state;
  }
}
