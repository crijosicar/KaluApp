import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import * as types from '../reducers/types';
import { Firebase, FirebaseRef } from '../lib/firebase';
import Api from '../lib/api';

export function getPieValues(member,formData) {
  const {
      year,
      month,
      tipoTransaccion,
  } = formData;   
  
    return dispatch => new Promise(async (resolve, reject) => {
      //Validation checks
      if(!year) return reject({message:ErrorMessages.missingYear});
      if(!month) return reject({message:ErrorMessages.missingMonth});
      
      await statusMessage(dispatch, 'loading', true);
      let baseurl = "http://www.kaluapp.com:81/api/get-incomes-expenses-by-user";
     
      return Api.post(baseurl,
        {
            "user_id": member.id,
            "tipo_transaccion": tipoTransaccion,
            "token": member.token,
            "mes": month,
            "anho": year
        }
      )
      .then((response) => {
          statusMessage(dispatch, 'loading', false);
        
          if(response.error){
            reject({message: "Ocurrió un error!"});
          } else {
            
            if(tipoTransaccion=="INGRESO"){
              resolve(dispatch({ type: types.GET_INCOME_PIE_DATA,
              data: response.message
              }));
            }
            else{
              resolve(dispatch({ type: types.GET_EXPENSE_PIE_DATA,
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
  
