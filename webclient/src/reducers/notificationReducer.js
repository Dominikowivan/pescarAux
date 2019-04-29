import { Notification } from "../actions/types";

const initialState = {
  isLoading: false,
  notificationData: [],
  errors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Notification.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationData: action.payload.data
      };
    case Notification.GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationData: action.payload.data
      };
    default:
      return state;
  }
};
