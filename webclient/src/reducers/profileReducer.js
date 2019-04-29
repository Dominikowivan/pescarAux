import {    
} from '../actions/types'



const initialState = {
  isLoading: false,
  profileData: {telephone:""} ,
  profileDataList : []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_DATA':
    return {
      ...state,
      profileData: action.payload.data
    }  
    case 'USER_DATA_LIST':
    return {
      ...state,
      profileDataList: action.payload.data
    }
    case 'USER_DATA_LIST_DELETE_OK':
    
    var a = state.profileDataList.filter(student => student.id !== action.payload)
   
    return {
      ...state,
      profileDataList: a
    }
      default:
      return state
  }
}
