import { Auth }  from '../actions/types'

const initialState = {
  show: false 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Auth.CHANGE_PASSWORD_TRUE:
    return {
      ...state,
      show: true
    }
    case Auth.CHANGE_PASSWORD_FALSE:
    return {
      ...state,
      show: false
    }
      default:
      return state
  }
}
