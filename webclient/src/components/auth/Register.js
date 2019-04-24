import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { registerUser } from '../../actions/authActions'
import InputField from '../common/InputField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'

const styles ={
  inputField: {
    width: '80%',
    padding: '10px',
    margin: '10px'
  },
  root: {
    margin: '32px auto 32px',
    width: 'calc(100% /2)',
    textAlign: 'center'
  }, 
  wrapper: {
    flex: '1',   
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}

export class Register extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',      
      email: '',
      firstName: '',
      lastName: '',
      dni: '',
      errors: null,
      loading: false,
      success: false
    }
  }
  
  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  // We use this to get the errors from the redux state (store)
  // and then we set it to the component state
  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors        
      })
    }
  }

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onSubmit = (e) => {   

    e.preventDefault()

    const data = {
      username: this.state.username,
      password: this.state.password,      
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dni: this.state.dni
    }

    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 2000);
        },
      );
    }
    this.props.registerUser(data, this.props.history)

    
  }

  render () {
    const { errors } = this.state
    const { classes } = this.props;

    return (
      <Fragment>
        <Card style={styles.root}>
          <CardHeader title='Crea tu cuenta'/>
          <form onSubmit={this.onSubmit} noValidate>
            <CardContent>
              <InputField
                name='firstName'
                placeholder='Nombre'
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                fullWidth
                value={this.state.name}
              />
              <InputField
                name='lastName'
                placeholder='Apellido'
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                fullWidth
                value={this.state.surname}
              />
              <InputField
                name='email'
                placeholder='Email'
                type='email'
                style={styles.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                fullWidth
                value={this.state.email}
              />
              <InputField
                name='dni'
                placeholder='Dni'
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                fullWidth
                value={this.state.dni}
              />
              <InputField
                name='username'
                placeholder='Usuario'
                type='text'
                style={styles.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                fullWidth
                value={this.state.username}
              />
              <InputField
                name='password'
                placeholder='Contraseña'
                type='password'
                style={styles.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                fullWidth
                value={this.state.password}
              />              
            </CardContent>
            <CardActions>
              <div className={classes.wrapper}>
                <Button color='secondary' type='submit'>
                  CONFIRMAR
                </Button>
                {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </CardActions>
          </form>
        </Card>
      </Fragment>
    )
  }
}

Register.proptypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  registerUser
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Register))