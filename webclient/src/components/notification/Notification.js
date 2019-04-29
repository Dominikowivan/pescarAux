import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = {
  card: {
    marginBottom: "10px"
  }
};

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      errors: null
    };
  }

  render() {
    return (
      <Fragment>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={6} md={4} lg={2}>
            <div>
              <Paper style={{ textAlign: "center" }}>
                <h2>{this.props.data.title}</h2>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <div>
              <Paper style={{ textAlign: "center" }}>
                <h2>{this.props.data.subject}</h2>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={5}>
            <div>
              <Paper style={{ textAlign: "center" }}>
                <h2>{this.props.data.description}</h2>
              </Paper>
            </div>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <div>
              <Paper style={{ textAlign: "center" }}>
                <h2>{this.props.data.createdDate}</h2>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Notification.proptypes = {
  auth: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  notificationDate: PropTypes.string.isRequired
};
