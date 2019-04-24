import axios from 'axios'
import { SET_CURRENT_USER, GET_ERRORS } from './types'
import setAuthToken from '../utils/setAuthToken'

// Register User

export const registerUser = (userData, history) => (dispatch) => {
 
  var headers = {'Content-Type': 'application/json;charset=UTF-8'};
    axios
    .post('/register', userData,{headers:headers})
    .then((res) => (history.push({pathname:'/login', state:{showDialog:true}})))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}

// User activation endpoint
export const activateUser = (data) => (dispatch) => { 
  
    axios
    .get('/verify/email?id=' + data.activationCode)
    .then((res) => dispatch({
                        type: 'EVERYTHING_OK',                        
    }))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
  

}

// Login - Get User Token

export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/auth', userData)
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
        type: GET_ERRORS,
        payload: err
      })
    )
}

// Set logged in user

export const setCurrentUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
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
