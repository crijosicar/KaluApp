import Store from '../store/conversation';

export const initialState = Store;

export default function conversationReducer(state = initialState, action) {
  switch (action.type) {
    case 'CONVERSATION_ADD_MESSAGE_CHAT': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
        };
      }
      return initialState;
    }
    case 'CONVERSATION_GET_MESSAGES_CHAT': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
        };
      }
      return initialState;
    }
    case 'CONVERSATION_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'CONVERSATION_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
