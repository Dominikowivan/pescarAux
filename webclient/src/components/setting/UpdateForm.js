import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { UpdateSubmit } from './UpdateSubmit';
import axios from 'axios';
import link from '../../utils/apilink.json';




const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});



class ActualizarDatosForm extends React.Component {

    state = {
       
      telefono: '',    
      gradoAcademico: '',
      id: '',
      sede: '',
      errors: null,
      loading: false,
      success: false
       
  }
  
  handleClickUpdate =(state)=>{
   console.log("datos a cambiar",this.state)
     axios.put(link.link + `alumni/${this.state.id}`,
      {
        pescarCenter: this.state.sede,
        telephone:this.state.telefono,
        maximumEducation:this.state.gradoAcademico }
      ).then(response => {
          console.log("Update:",response);
        })
  
       // this.props.deleteFromList(id)
    };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="filled-telefono"
          label="Telefono"
          className={classes.textField}
          defaultValue="9099999"
          value={this.state.telefono}
          onChange={this.handleChange('telefono')}
          margin="normal"
          variant="filled"
        />

        <TextField
          required
          id="Estudios-Alcazados"
          label="Estudios alcanzados"
          defaultValue="Bachiller "
          className={classes.textField}
          value={this.state.gradoAcademico}
          onChange={this.handleChange('gradoAcademico')}
          margin="normal"
          variant="filled"
        />


        <TextField
          id="Sede-Central"
          label="Sede"
          className={classes.textField}
          defaultValue="CABA"
          value={this.state.sede}
          onChange={this.handleChange('sede')}
          margin="normal"
          variant="filled"
        />  

        <TextField
          id="id-Sistema"
          label="Id a modificar"
          className={classes.textField}
          type="id"
          name="id"
          value={this.state.id}
          onChange={this.handleChange('id')}
          margin="normal"
          variant="filled"
        />
 <button onClick={this.handleClickUpdate.bind(this.state)}>  Actualizar  Perfil  </button>
      </form>
        );
 
  
  }
}

ActualizarDatosForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActualizarDatosForm);