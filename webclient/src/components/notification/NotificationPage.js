import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputField from "../common/InputField";
import Button from "@material-ui/core/Button";
import InputErrorDialog from "../auth/InputErrorDialog";

import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import Notification from './Notification';
import {
  getAllNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotification
} from "../../actions/notificationActions";
import NotificationList from './NotificationList'

const styles = theme => ({
  inputField: {
    width: "80%",
    padding: "10px"
  },
  root: {
    margin: "32px auto 32px",
    width: "calc(100% /2)",
    textAlign: "center"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class NotificationPage extends Component {
  constructor() {
    super();
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  componentDidMount() {
    if (this.props.notificationData.length === 0) {
      this.props.getAllNotification();
    }
  }

  handleDelete(id) {

  }

  render() {
    const { errors, notificationData } = this.props;
    return (
      <Fragment> {notificationData.length > 0 &&
        //notificationData.map(notification => <Notification key={notification.id} data={notification} />)
        <NotificationList data={notificationData} />
      }
      </Fragment>
    );
  }
}

NotificationPage.proptypes = {
  errors: PropTypes.object.isRequired,
  getAllNotification: PropTypes.func.isRequired,
  notificationData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  notificationData: state.notificationReducer.notificationData,
  errors: state.notificationReducer.errors
});

const mapDispatchToProps = {
  getAllNotification,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotification
};

export default compose(withStyles(styles), connect(
  mapStateToProps,
  mapDispatchToProps
))(NotificationPage);
