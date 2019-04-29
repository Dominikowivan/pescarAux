import { Auth }  from '../actions/types'

const initialState = {
  show: false 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Auth.RECOVERY_EMAIL_SENT:
    return {
      ...state,
      show: true
    }
    case Auth.RECOVERY_EMAIL_NOT_SENT:
    return {
      ...state,
      show: false
    }
      default:
      return state
  }
}
