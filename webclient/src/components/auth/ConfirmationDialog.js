
import React, { Component } from 'react';
import {connect} from'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class ConfirmationDialog extends Component {
    constructor() {
        super()
        this.state = {
            open: true,
            everythingOk: false
        };
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const showOk = (
            <div>
                <DialogContent>
                    <DialogContentText
                        autoFocus
                        margin="dense"
                        fullWidth>
                            Revise su Correo Para Activar su Usuario
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleClose}
                        color="primary">
                        Volver
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
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleClose}
                        color="primary">
                            Volver
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
                        <DialogTitle
                            id="form-dialog-title">Active su Usuario</DialogTitle>
                        {this.props.everythingOk ?
                            showOk :
                            activateDialog}
                </Dialog>
            </div>
        );
    }
}





const mapStateToProps = (state) => ({
            everythingOk: state.activateUser.everythingOk
        })



const mapDispatchToProps = {

        ConfirmationDialog

    }

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog)