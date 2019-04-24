const initialState = {
  updateTable: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_UPDATE':
      return {
      	...state,
        updateTable: true

      }

    default:
      return state
  }
}