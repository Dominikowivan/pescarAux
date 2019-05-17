const initialState = {
  updateTable: false,
  profileToEdit:{dato:""} 
}

export default(state = initialState, action) => {
  switch (action.type) {
    case 'CONFIRM_UPDATE':
      return {
      	...state,
        updateTable: true
      }
      case 'SHOW_DATA_EDIT':
     
      return {
      	...state,
        profileToEdit: action.payload.data
      }
      case 'GET_ERRORS':
      console.log('AAAAAAAAAAAAA',action)
      return {
        ...state,
        profileToEdit: action.payload
      }
    default: 
      return state
  }
}