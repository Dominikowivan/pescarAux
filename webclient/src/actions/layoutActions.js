import { LAYOUT_UPDATE } from './types'

export const layoutUpdate = (open) => (dispatch) => {
  dispatch({
    type: LAYOUT_UPDATE,
    payload: open
  })
}
