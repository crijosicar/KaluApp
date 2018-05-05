import Store from '../store/transaction';
import  * as types from './types';

export const initialState = Store;

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_TRANSACTION_DATA: {
        return {
          ...state,
          error: null,
          loading: false,
          tipoTransaction: action.data.tipo_transaccion_id,
          tipoMovimiento: action.data.tipo_movimiento_id,
          fechaMovimiento: action.data.tipo_movimiento_id,
          id: action.data.id
        }
    }
    case types.SET_TRANSACTION_DETAIL_STATE: {
        return {
          ...state,
          error: null,
          loading: false,
          transactionDetailState: action.data.transaction_detail
        }
    }
    default:
      return state;
  }
}
