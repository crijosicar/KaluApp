import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import * as types from '../reducers/types';
import { Firebase, FirebaseRef } from '../lib/firebase';
import Api from '../lib/api';

export function getPredictionValues(member,formData) {
  const {
      tipoTransaccion
  } = formData;   
  
    return dispatch => new Promise(async (resolve, reject) => {
      //Validation checks
      
      await statusMessage(dispatch, 'loading', true);
      let baseurl = "http://www.kaluapp.com:81/api/get-expected-incomes-expenses-by-user";
     
      return Api.post(baseurl,
        {
            "user_id": member.id,
            "tipo_transaccion": tipoTransaccion,
            "token": member.token,
           
        }
      )
      .then((response) => {
          statusMessage(dispatch, 'loading', false);
        
          if(response.error){
            reject({message: "Ocurrió un error!"});
          } else {
            
            if(tipoTransaccion=="INGRESO"){
              resolve(dispatch({ type: types.GET_INCOME_PREDICTION_DATA,
              data: response.message
              }));
            }
            else{
              resolve(dispatch({ type: types.GET_EXPENSE_PREDICTION_DATA,
                data: response.message
                }));
            }
        }
      })
      .catch(reject);
  
    }).catch(async (err) => {
        await statusMessage(dispatch, 'loading', false);
        await statusMessage(dispatch, 'error', err.message);
        throw err.message;
    });
  }
  
export function  getPredictionTimeframe(member,formData) {
  const {
    categoria
  } = formData;   
  

  return dispatch => new Promise(async (resolve, reject) => {
    //Validation checks
    
    await statusMessage(dispatch, 'loading', true);
    let baseurl = "http://www.kaluapp.com:81/api/get-expected-incomes-expenses-by-user-by-timeframe";
    debugger;
    return Api.post(baseurl,
      {
          "user_id": member.id,
          "categoria_activo": categoria,
          "token": member.token,
         
      }
    )
    .then((response) => {
        statusMessage(dispatch, 'loading', false);
        debugger;
        if(response.error){
          reject({message: "Ocurrió un error!"});
        } else {
          
          
          
            resolve(dispatch({ type: types.GET_EXPENSE_PREDICTION_DATA_TIMEFRAME,
              data: response.messages
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
