import { Auth } from '../actions/types'
import checkAuthToken from '../utils/checkAuthToken'
import store from '../store'

const initialState = {
  isAuthenticated: false,
  show: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Auth.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:  action.payload ? true : false
      }
      case Auth.GET_ERRORS:
        return{
          ...state,
          show: true
        }
      case Auth.CHANGE_MODAL_STATUS:
        return{
          ...state,
          show: !state.show
        }
    default:
      return state
  }
}

