import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import * as types from '../reducers/types';
import Api from '../lib/api';
import axios from 'axios';

export function addMovimiento(tipoMovimiento, member) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    //let baseurl = "http://www.kaluapp.com:81/api/add-transaction";
    let baseurl = "http://192.168.1.15/api/add-transaction";
    let data = {
      "user_id": member.id,
      "tipo_transaccion": tipoMovimiento,
      "token": member.token
    };

    return Api.post(baseurl, data)
      .then(async (response) => {
        if(response.error){
          reject({ message: "Ocurrió un error!"});
        } else {
          await statusMessage(dispatch, 'loading', false);
          await dispatch({
                  type: types.SET_TRANSACTION_DATA,
                  data: response.message
                });
          resolve();
        }
      })
      .catch((err) => {
        reject({ message: "Ocurrió un error!"});
      });
  })
  .catch(async (err) => {
     await statusMessage(dispatch, 'error', err.message);
     throw err.message;
   });
}

export function addDetalleMovimiento(movimientoId, items, member) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    //let baseurl = "http://www.kaluapp.com:81/api/add-transaction";
    let baseurl = "http://192.168.1.15/api/add-items-transaction";
    let data = {
      "transaction_id": movimientoId,
      "items": items,
      "token": member.token
    };

    return Api.post(baseurl, data)
      .then(async (response) => {
        if(response.error){
          await dispatch({
                  type: types.SET_TRANSACTION_DETAIL_STATE,
                  data: { transaction_detail: false }
                });
          reject({ message: "Algunos elementos no pudieron ser agregados"});
        } else {
          await statusMessage(dispatch, 'loading', false);
          await dispatch({
                  type: types.SET_TRANSACTION_DETAIL_STATE,
                  data: { transaction_detail: true }
                });
          resolve();
        }
      })
      .catch((err) => {
        reject({ message: "Ocurrió un error!"});
      });
  })
  .catch(async (err) => {
     await statusMessage(dispatch, 'error', err.message);
     throw err.message;
   });
}
