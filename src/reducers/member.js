import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          token: action.data.token,
        };
      }
      return initialState;
    }
    case 'GET_USERFB_CONFIRMATION':{
      if (action.data) {
        return {
          ...state,
          
          facebook_id: action.data.user.facebook_id
        };
      }
      return initialState;
    }
    case 'SET_USER_DATA': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          id: action.data.user.id,
          name: action.data.user.name,
          email: action.data.user.email,
          device_id: action.data.user.device_id,
          gender: action.data.user.gender,
          birth_day: action.data.user.birth_day,
          range_income: action.data.user.range_income,
          img_profile: action.data.user.img_profile,
          occupation: action.data.user.occupation,
          facebook_id: action.data.user.facebook_id
        };
      }
      return initialState;
    }
    case 'SET_USER_STATUS': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          signedUp: action.data.signedUp,
          role: "customer"
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
