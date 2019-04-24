import { SET_CURRENT_USER } from '../actions/types'
import checkAuthToken from '../utils/checkAuthToken'
import store from '../store'

const initialState = {
  isAuthenticated: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:  action.payload ? true : false
      }

    default:
      return state
  }
}