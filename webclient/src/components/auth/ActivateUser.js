import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { activateUser } from '../../actions/authActions'

export class ActivateUser extends Component {
    constructor(){
        super()
        this.state = {
            open: true,
            activationCode: '',
            everythingOk: false 
          };
    }

    handleClose = () => {
        this.setState({ open: false });
      };
    
    handleActivate = () => {  

        const data = {
          activationCode: this.state.activationCode      
        }      

        this.props.activateUser(data)
      };

    onChangeHandler = (event) => {

    

    this.setState({
      [event.target.name]: event.target.value
    })

  }

    render() {
      
      const showOk = (  
      <div>        
            <DialogContent>
              <DialogContentText autoFocus margin="dense" fullWidth>
                Usuario Activado Correctamente
              </DialogContentText>              
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                VOLVER
              </Button>
            </DialogActions>
      </div>
      )
      const activateDialog = (  
        <div>
            <DialogContent>
              <DialogContentText>
                Verifique su correo electrónico para encontrar el código de activación. 
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Código de Activación"
                type="activation_code"
                name="activationCode"
                onChange={this.onChangeHandler}
                fullWidth               
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Volver
              </Button>
              <Button onClick={this.handleActivate} color="primary">
                Activar Usuario
              </Button>
            </DialogActions>
          </div>

        )

      return (

        
        <div>          
        <Dialog 
          open={this.state.open}
          onClose={this.handleClose} 
          aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Active su Usuario</DialogTitle>
            {this.props.everythingOk ? showOk : activateDialog}
          </Dialog>         
        </div>
      );
    }
  }


const mapStateToProps = (state) => ({
  everythingOk: state.activateUser.everythingOk
  
})

const mapDispatchToProps = {
  activateUser
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser)