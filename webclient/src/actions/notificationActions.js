import axios from "axios";
import { Notification } from "./types";
import link from "../utils/apilink.json";

export const createNotification = (notification, history) => dispatch => {
  var headers = { "Content-Type": "application/json;charset=UTF-8" };
  axios
    .post(link.link + "/notification", notification, { headers: headers })
    .then(res => {
      dispatch({
        type: Notification.CREATE_NOTIFICATION_SUCCESS,
        payload: res
      })
      history.push({ pathname: "/notification", state: { showDialog: true } })
    })
    .catch(err =>
      dispatch({
        type: Notification.CREATE_NOTIFICATION_ERROR,
        payload: err
      })
    );
};

export const getAllNotification = () => dispatch => {
  const headers = { "Content-Type": "application/json;charset=UTF-8" };
  axios
    .get(link.link + "/api/notification", { headers: headers })
    .then(res => {
      dispatch({
        type: Notification.GET_ALL_NOTIFICATION_SUCCESS,
        payload: res
      });
    })
    .catch(err =>
      dispatch({
        type: Notification.GET_ALL_NOTIFICATION_ERROR,
        payload: err
      })
    );
};

export const getNotification = (id) => dispatch => {
  const headers = { "Content-Type": "application/json;charset=UTF-8" };
  axios
    .get(link.link + `/api/notification/{id}`, { headers: headers })
    .then(res => {
      dispatch({
        type: Notification.GET_NOTIFICATION_SUCCESS,
        payload: res
      });
    })
    .catch(err =>
      dispatch({
        type: Notification.GET_NOTIFICATION_ERROR,
        payload: err
      })
    );
};

export const deleteNotification = (id) => dispatch => {
  const headers = { "Content-Type": "application/json;charset=UTF-8" };
  axios
    .delete(link.link + `/api/notification/{id}`, { headers: headers })
    .then(res => {
      dispatch({
        type: Notification.DELETE_NOTIFICATION_SUCCESS,
        payload: res
      });
    })
    .catch(err =>
      dispatch({
        type: Notification.DELETE_NOTIFICATION_ERROR,
        payload: err
      })
    );
};

export const updateNotification = (notification) => dispatch => {
  const headers = { "Content-Type": "application/json;charset=UTF-8" };
  axios
    .put(link.link + `/api/notification`, notification, { headers: headers })
    .then(res => {
      dispatch({
        type: Notification.UPDATE_NOTIFICATION_SUCCESS,
        payload: res
      });
    })
    .catch(err =>
      dispatch({
        type: Notification.UPDATE_NOTIFICATION_ERROR,
        payload: err
      })
    );
};
