import axios from 'axios'
import { Auth } from './types'
import setAuthToken from '../utils/setAuthToken'
import link from '../utils/apilink.json'

// Register User

export const registerUser = (userData, history) => (dispatch) => {
 
  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
    axios
    .post(link.link + '/register', userData,{headers:headers})
    .then((res) => (history.push({pathname:'/login', state:{showDialog:true}})))
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}

export const handleCloseDialog = () => (dispatch) => {
  dispatch({
    type: Auth.CHANGE_MODAL_STATUS
  })
}

// User activation endpoint
export const activateUser = (data) => (dispatch) => { 
  
    axios
    .get(link.link + '/verify/email?id=' + data.activationCode)
    .then((res) => dispatch({
          type: 'EVERYTHING_OK',                        
    }))
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}

// Login - Get User Token

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(link.link + '/auth', userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data

      if (token) {
        // Set token to Auth Header
        setAuthToken(token)

        // Set current user
        dispatch(setCurrentUser(res.data))
        localStorage.setItem('user', JSON.stringify(res.data))
      }
    })
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}

// Set logged in user

export const setCurrentUser = (userData) => {
  return {
    type: Auth.SET_CURRENT_USER,
    payload: userData
  }
}

// Logout User
export const logoutUser = () => (dispatch) => {
  // Remove token from localstorage
  localStorage.removeItem('user')

  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser(undefined))
}

// Logout User
export const forgotPassword = (history) => (dispatch) => {

  dispatch({
    type: Auth.RECOVERY_EMAIL_NOT_SENT,
  })
  
  history.push('/forgot/password')
}

export const sendPasswordLink = (data) => (dispatch) => {

  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
  
    axios
    .get(link.link + '/forgot/password', {params: {email:data.email}})
    .then((res) => {      
        if (res.status == 200){ 
          dispatch ({            
            type: Auth.RECOVERY_EMAIL_SENT,
          })
        }
      }
    )
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}

export const changePassword = (userData) => (dispatch) => {

  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
  
    axios
    .post(link.link + '/forgot/password/change', userData)
    .then((res) => {      
        if (res.status == 200){ 
          dispatch ({            
            type: Auth.CHANGE_PASSWORD_TRUE,
          })
        }
      }
    )
    .catch((err) =>
      dispatch({
        type: Auth.GET_ERRORS,
        payload: err
      })
    )
}