import { SHOW_DATA_EDIT } from '../actions/types';
import axios from 'axios';
import link from '../utils/apilink.json';
import { Auth } from './types';
import { GET_ERRORS} from './types';




export const showData = (id) => async (dispatch) => {
   await axios.get(link.link + `/alumni/${id}`)
    .then((response) => dispatch({
        type: 'SHOW_DATA_EDIT',
        payload: response
      }))
      .catch((err) =>
      dispatch({
        type: 'GET_ERRORS',
        payload: err
      })
    )
}
  

export const updateData = (datos) => async (dispatch) => {
  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
  await axios.put(link.link + '/alumni',datos,{headers:headers})
   .then((response) => dispatch({
       type: 'SHOW_DATA_EDIT_UPDATE_OK',
       payload: response
     }))
     .catch((err) =>
     dispatch({
       type: 'GET_ERRORS',
       payload: datos
     })
   )
}
 

