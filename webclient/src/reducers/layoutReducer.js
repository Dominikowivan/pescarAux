import { LAYOUT_UPDATE } from '../actions/types'

const initialState = {
  drawerExpanded: false,
  deletionPopUp: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LAYOUT_UPDATE:
      return {
        drawerExpanded: action.payload
      }

    default:
      return state
  }
}
