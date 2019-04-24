import axios from 'axios'

import {
  GET_ERRORS
} from './types'


export const completeProfile = (profileData, history) => (dispatch) => {
 
  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
    axios
    .post('/alumni', profileData,{headers:headers})
    .then((res) => (history.push('/profile')))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}


export const profileData = () => (dispatch) => {

  axios
    .get('/alumni')
    .then((res) => dispatch({
      type: 'USER_DATA',
      payload: res
    }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}


export const listProfileData = (profileData, history) => (dispatch) => {

  axios
    .get('/alumni/all')
    .then((res) => dispatch({
      type: 'USER_DATA_LIST',
      payload: res
    }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}

export const deleteProfile = (profileData, history) => (dispatch) => {


    axios
    .delete('/alumni')
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}