import Store from '../store/prediction';
import  * as types from './types';

export const initialState = Store;

export default function predictionReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_INCOME_PREDICTION_DATA: {
            
            if(action.data){
                return {
                ...state,
                incomePredictionValue: action.data,
                error: null,
                loading: false,
                }
            }
            return initialState;
        }
        case types.GET_EXPENSE_PREDICTION_DATA_TIMEFRAME:{
            debugger;
            if(action.data){
               return{ ...state,
                expensePredictionTimeFrame: action.data,
                error: null,
                loading :false,
                
            }
            return initialState;
            }
        }
        case types.GET_EXPENSE_PREDICTION_DATA: {
            if(action.data){
                return {
                    ...state,
                    expensePredictionValues: action.data,
                    error: null,
                    loading: false,
                  }
            }
            return initialState;
        }
        default:
        return state;
    }
  }