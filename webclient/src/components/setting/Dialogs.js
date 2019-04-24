import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteProfile } from '../../actions/profileActions'
import { logoutUser } from '../../actions/authActions'
import { connect } from 'react-redux'
import { compose } from 'recompose'

class THISISATEST extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
   handleCloseDelete = () => {
    this.props.deleteProfile()
    this.setState({ open: false });
  
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          CLICK - PARA CONFIRMAR ELIMINAR PERFIL
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Esta seguro de eliminar el perfil ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Por favor de estar seguro click en aceptar.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CANCELAR
            </Button>
            <Button onClick={this.handleCloseDelete} color="primary" autoFocus>
              ACEPTAR
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteProfile,
  logoutUser
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default compose(connect(mapStateToProps, mapDispatchToProps),)(THISISATEST)
