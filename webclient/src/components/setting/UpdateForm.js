import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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

   constructor () {
    super()
    this.state = {
      username: '',    
      email: '',
      firstName: '',
      lastName: '',
      dni: '',
      errors: null,
      loading: false,
      success: false
    }
  }

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
          id="filled-name"
          label="Name"
          className={classes.textField}
          value={this.state.username}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="filled"
        />

        <TextField
          id="filled-telefone"
          label="Telefono"
          defaultValue="foo"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
          <TextField
          id="Fecha de Recibida"
          label="Fecha de Recibida"
          defaultValue="DD-MM-AAA"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />

        <TextField
          required
          id="Estudios-Alcazados"
          label="Estudios-alcanzados"
          defaultValue="Ultimo grado academico"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />


        <TextField
          disabled
          id="central-pescar"
          label="Central"
          defaultValue="Bnos Aires"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />

        <TextField
          id="Correo @"
          label="Email opcional"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="filled"
        />
    <TextField
          id="conselour"
          label="Consejero actual"
          className={classes.textField}
          type="email"
          name="email"
          margin="normal"
          variant="filled"
        />



      </form>
    );
  }
}

ActualizarDatosForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActualizarDatosForm);