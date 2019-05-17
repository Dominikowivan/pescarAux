import axios from 'axios'
import link from '../utils/apilink.json'
import { Auth } from './types'
import {
  GET_ERRORS
} from './types'


export const completeProfile = (profileData, history) => (dispatch) => {
 
  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
    axios
    .post(link.link + '/alumni', profileData,{headers:headers})
    .then((res) => (history.push('/profile')))
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}

export const listProfileData = (profileData, history) => (dispatch) => {

  axios
    .get(link.link + '/alumni/all')
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
    .delete(link.link + '/alumni')
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}


export const profileData = () => (dispatch) => {

  axios
    .get(link.link + '/alumni')
    .then((res) => dispatch({
      type: 'USER_DATA',
      payload: res
    }))
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}

