import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import { completeProfile } from '../../actions/profileActions'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CardHeader } from '@material-ui/core';


const styles = theme => ({
  root: {
    margin: '4px auto 4px',
    width: 'calc(100% /2)',
    textAlign: 'center'
  },
  backButton: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '35%',
    height: '80%',
    padding: '10px',
    margin: '10px'
  },
});

function getSteps() {
  return ['Informacion de Contacto', 'Informacion de Pescar', 'Estudios'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Teléfonos';
    case 1:
      return 'En que sede realizaste tus actividades?';
    case 2:
      return 'Contanos sobre vos';
    default:
      return 'Unknown stepIndex';
  }
}

class ProfileStepper extends Component {
  constructor(){
    super();
    this.state = {
      errors: '',
      activeStep: 0,
      tel: '',
      tel_alter: '',
      maximumEducation: '',
	    pescarCenter: '',
	    counselor: '',
	    graduationYear: null
    };
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const data = {
      telephone: this.state.tel,
      alternativeTelephone: this.state.tel_alter,
      maximumEducation: this.state.maximumEducation,
      pescarCenter: this.state.pescarCenter,
      counselor: this.state.counselor,
      graduationYear: this.state.graduationYear
    }    

    this.props.completeProfile(data, this.props.history)
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    

    return (
      <Grid xs="12">
      <Card className={classes.root}>
      <CardHeader title="Completar Perfil" />
      <form>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Perfil Completado</Typography>              
            </div>
          ) : (
            <div>
            <Typography className={classes.instructions}>{getStepContent(this.state.activeStep)}</Typography>
              
              {this.state.activeStep === 0 ? (<CardContent><div>
              <TextField
                className={classes.textField}
                name='tel'
                label="Telefono"  
                placeholder="15-XXXX-XXXX"                           
                type='text'                             
                onChange={this.onChangeHandler}                
                fullWidth
                margin="normal"
                value={this.state.name}   
                variant="outlined"             
              />
              </div>
              <div>
              <TextField
                className={classes.textField}
                name='tel_alter'
                label="Telefono Alternativo"   
                placeholder="15-XXXX-XXXX"                           
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}                
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.surname}
              />
              </div></CardContent>) : null}
              {this.state.activeStep === 1 ? (<CardContent><div>
              <TextField
                className={classes.textField}
                name='pescarCenter'
                label="Centro Pescar" 
                placeholder="Córdoba"                            
                type='text'                             
                onChange={this.onChangeHandler}                
                fullWidth
                margin="normal"
                value={this.state.name}   
                variant="outlined"             
              />
              </div>
              <div>
              <TextField
                className={classes.textField}
                name='counselor'
                label="Counselor" 
                placeholder="Berk"                                
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}                
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.surname}
              />
              </div></CardContent>) : null}
              {this.state.activeStep === 2 ? (<CardContent><div>
              <TextField
                className={classes.textField}
                name='maximumEducation'
                label="Nivel Educativo Alcanzado"
                placeholder="Secundario"                             
                type='text'                             
                onChange={this.onChangeHandler}                
                fullWidth
                margin="normal"
                value={this.state.name}   
                variant="outlined"             
              />
              </div>
              <div>
              <TextField
                className={classes.textField}
                name='graduationYear'
                label="Año de Graduación"
                placeholder="1990"                               
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}                
                fullWidth
                margin="normal"
                variant="outlined"
                value={this.state.surname}
              />
              </div></CardContent>) : null}
              
              <div>
                <Button
                  disabled={this.state.activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >                  Back
                </Button>
                
                  {this.state.activeStep === steps.length - 1  ? <Button variant="contained" color="primary" onClick={this.onSubmit}> 
                    Finish</Button>: (
                    <Button variant="contained" color="primary" onClick={this.handleNext}>Next</Button>)}
                
              </div>            
          </div>
          
          )}
        </div>
        </form>        
      </Card>
      </Grid>
    );
  }
}

ProfileStepper.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({  
  errors: state.errors
})

const mapDispatchToProps = {
  completeProfile
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(ProfileStepper))

