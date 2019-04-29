import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleCloseDialog } from '../../actions/authActions'
import compose from 'recompose/compose'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class InputErrorDialog extends React.Component {

  render() {
    const {
      buttonText,
      titleText,
      errorMessage
    } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.auth.show}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             {errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCloseDialog} color="primary" autoFocus>
             {buttonText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
     
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  handleCloseDialog
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(InputErrorDialog))