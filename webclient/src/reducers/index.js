import { combineReducers } from "redux";
import layoutReducer from "./layoutReducer";
import authReducer from "./authReducer";
import activateReducer from "./activateReducer";
import profileReducer from "./profileReducer";
import recoverPasswordReducer from "./recoverPasswordReducer";
import changePasswordReducer from "./changePasswordReducer";
import notificationReducer from "./notificationReducer";
import deleteReducer from './deleteReducer';
import updateReducer from'./updateReducer';
import updateConfirmReducer from'./updateConfirmReducer';
import updateListConfirmReducer from'./updateListConfirmReducer';


export default combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  activateUser: activateReducer,
  profileData: profileReducer,
  recoverPasswordReducer: recoverPasswordReducer,
  changePasswordReducer: changePasswordReducer,
  notificationReducer: notificationReducer,
  deleteReducer: deleteReducer,
  updateReducer: updateReducer,
  updateConfirmReducer: updateConfirmReducer,
  updateListConfirmReducer: updateListConfirmReducer
    
});
