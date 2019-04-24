import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class UpdateConfirm extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          CLICK - PARA CONFIRMAR ACTUALIZAR PERFIL O SALIR DE LA CONFIGURACION
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Esta seguro de salir de Configuracion ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Por favor de estar seguro click en aceptar.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              CANCELAR
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              ACEPTAR
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UpdateConfirm;