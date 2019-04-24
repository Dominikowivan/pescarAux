const initialState = {
  updateConfirm: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_OUT':
      return {
      	...state,
        updateConfirm: true
        
      }

    default:
      return state
  }
}