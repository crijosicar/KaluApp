import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import * as types from '../reducers/types';
import { Firebase, FirebaseRef } from '../lib/firebase';
import Api from '../lib/api';

export function getIncomePieValues(tipoTransaccion) {
    return dispatch => new Promise(async (resolve, reject) => {
  
      await statusMessage(dispatch, 'loading', true);
      let baseurl = "http://www.kaluapp.com:81/api/get-incomes-expenses-by-user";
     
      return Api.post(baseurl,
        {
            //parameters
             "user_id": member.id,
             "tipo_transaccion": tipoTransaccion,
            "token": member.token
            
          
        }
      )
      .then((response) => {
          statusMessage(dispatch, 'loading', false);
  
          if(response.stack){
            dispatch(loadMessagesError(response.message));
            reject({message: "Ocurrió un error!"});
          } else {
            dispatch(loadMessagesSuccess(response));
            resolve(dispatch({ type: types.GET_INCOME_PIE_DATA,
            data: response
            }));
        }
      })
      .catch(reject);
  
    }).catch(async (err) => {
        await statusMessage(dispatch, 'loading', false);
        await statusMessage(dispatch, 'error', err.message);
        throw err.message;
    });
  }
  
  export function getExpensePieValues(tipoTransaccion) {
    return dispatch => new Promise(async (resolve, reject) => {
  
      await statusMessage(dispatch, 'loading', true);
      let baseurl = "http://www.kaluapp.com:81/api/get-incomes-expenses-by-user";
     
      return Api.post(baseurl,
        {
            //parameters
            "user_id": member.id,
            "tipo_transaccion": tipoTransaccion,
            "token": member.token
           
        }
      )
      .then((response) => {
          statusMessage(dispatch, 'loading', false);
  
          if(response.stack){
            dispatch(loadMessagesError(response.message));
            reject({message: "Ocurrió un error!"});
          } else {
            dispatch(loadMessagesSuccess(response));
            resolve(dispatch({ type: types.GET_EXPENSE_PIE_DATA,
            data: response
            }));
        }
      })
      .catch(reject);
  
    }).catch(async (err) => {
        await statusMessage(dispatch, 'loading', false);
        await statusMessage(dispatch, 'error', err.message);
        throw err.message;
    });
  }