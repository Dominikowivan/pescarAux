export const confirmDeletion = () => {
  

  return {
    type: 'CONFIRM_DELETION'
  }
}

export const deleteFromList = (id) => (dispatch) => {  
  dispatch({
    type: 'USER_DATA_LIST_DELETE_OK',
    payload: id
  })
}