const initialActivateUserState = {
            open: true,
            activationCode: '',
            everythingOk: false
}

export default function (state = initialActivateUserState, action) {
  switch (action.type) {
    case 'EVERYTHING_OK':
      return {
        ...state,  
        everythingOk: true
      }
    default:
      return state
  }
}