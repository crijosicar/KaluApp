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
        };
    }
    case types.CHAT_MESSAGE_ERROR: {
        return {
          ...state,
          sending: false,
          sendingError: action.error,
          error: null,
          loading: false,
        };
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
        return {
          ...state,
          sending: false,
          message: action.text,
          sendingError: null,
          error: null,
          loading: false,
        }
    }
    case types.CHAT_LOAD_MESSAGES_SUCCESS: {
        return {
          ...state,
          messages: action.messages,
          loadMessagesError: null,
          error: null,
          loading: false,
        }
    }
    case types.CHAT_LOAD_MESSAGES_ERROR: {
        return {
          ...state,
          messages: null,
          loadMessagesError: action.error,
          error: null,
          loading: false,
        }
    }
    default:
      return state;
  }
}
