import Store from '../store/conversation';
import  * as types from './types';

export const initialState = Store;

export default function walletReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_INCOME_PIE_DATA: {
            return {
              ...state,
              IncomeLabels: action.data.income_labels,
              IncomeValues: action.data.income_values,
              error: null,
              loading: false,
            }
        }
        case types.GET_EXPENSE_PIE_DATA: {
            return {
              ...state,
              ExpenseLabels: action.data.expense_labels,
              ExpenseValues: action.data.expense_values,
              error: null,
              loading: false,
            }
        }
        default:
        return state;
    }
  }