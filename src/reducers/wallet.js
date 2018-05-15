import Store from '../store/conversation';
import  * as types from './types';

export const initialState = Store;

export default function walletReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_INCOME_PIE_DATA: {

            if(action.data){
                return {
                ...state,
                incomeLabels: action.data.income_labels,
                incomeValues: action.data.income_values,
                error: null,
                loading: false,
                }
            }
            return initialState;
        }
        case types.GET_EXPENSE_PIE_DATA: {
            if(action.data){
                return {
                    ...state,
                    expenseLabels: action.data.expense_labels,
                    expenseValues: action.data.expense_values,
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
