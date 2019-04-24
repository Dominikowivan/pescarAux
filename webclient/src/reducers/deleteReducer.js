const initialState = {
  deletionPopUp: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_DELETION':
      return {
      	...state,
        deletionPopUp: true
      }

    default:
      return state
  }
}
