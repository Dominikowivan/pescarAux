import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions'
import  THISISATEST from'./Dialogs'
import  UpdateConfirm from'./DialogUp'
import  UpdateListConfirm from'./TableList'
import  ActualizarDatosForm from'./UpdateForm'
import { confirmDeletion } from '../../actions/deleteAction'
import { updateForm } from '../../actions/updateAction'  
import { updateFormConfirm } from '../../actions/updateConfirmAction' 
import { updateListConfirm } from '../../actions/updateListConfirmAction' 
import compose from 'recompose/compose'
import { connect } from 'react-redux'


const styles = {
  inputField: {
    width: '80%',
    padding: '10px',
    margin: '10px'
  },
  root: {
    margin: '22px auto 22px',
    width: 'calc(100% /2)',
    textAlign: 'left'
  }
}

class AlertDialog extends React.Component {

  state = {
    open: false,
  };


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.props.confirmDeletion()
  };
   handleClickU = () => {
    this.props.updateForm()
  };
   handleClickUC = () => {
    this.props.updateFormConfirm()
  };
     handleClickLC = () => {
    this.props.updateListConfirm()
  };

  render() {
    const { userType } = this.props;
    console.log('Hola Manu',userType);
    return (
     <div style={styles.root} >  
       
 

          
              
                 <CardActions>
            <div style={{ flex: '1' }}>
            { userType === 'admin' && (
                 !this.props.updateListConfirmReducer.updateListConfirm ? <Button color='primary' type='submit' variant="contained" onClick={this.handleClickLC}>
                  Lista de Todos los estudiantes
                  
                 </Button> : <UpdateListConfirm/> 
        
                 
                  
                  )} 
                  
                     </div>
                     </CardActions>

            <CardActions>
            <div style={{ flex: '1' }}>
                 {!this.props.updateReducer.updateTable ? <Button color='primary' type='submit' variant="contained" onClick={this.handleClickU}>
                  Actualizar Perfil
                </Button> : <ActualizarDatosForm/>}     
              </div>
            </CardActions>
            

              <CardActions>
            <div style={{ flex: '1' }}>
                 {!this.props.updateConfirmReducer.updateConfirm ? <Button color='primary' type='submit' variant="contained" onClick={this.handleClickUC}>
                  Confimar Cambios o Salir de Configuracion
                </Button> : <UpdateConfirm/>}        
              </div>
              </CardActions>


              <CardActions>
              <div style={{ flex: '1' }}>
                {!this.props.deleteReducer.deletionPopUp ? <Button color='primary' type='submit' variant="contained" onClick={this.handleClick}>
                  Eliminar Perfil
                </Button> : <THISISATEST/>}   
                 </div>
            </CardActions>

              
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  deleteReducer: state.deleteReducer,
  updateReducer: state.updateReducer,
  updateConfirmReducer: state.updateConfirmReducer,
  updateListConfirmReducer: state.updateListConfirmReducer,
  userType: state.updateListConfirmReducer.userType,
  errors: state.errors
})

const mapDispatchToProps = {
  confirmDeletion,
  updateForm,
  updateFormConfirm,
  updateListConfirm,
  

}
export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles))(AlertDialog)
