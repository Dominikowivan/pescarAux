const initialState = {
  updateConfirm: false,
  userType: 'admin'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_Ok':
      return {
      	...state,
        updateListConfirm: true
        
      }

    default:
      return state
  }
}