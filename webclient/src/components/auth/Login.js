import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser, forgotPassword } from '../../actions/authActions'
import InputField from '../common/InputField'
import Button from '@material-ui/core/Button'
import InputErrorDialog from './InputErrorDialog'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ActivateUser from './ActivateUser'
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose'
import classnames from 'classnames';
import ConfirmationDialog from './ConfirmationDialog';


const styles = theme => ({
  inputField: {
    width: '80%',
    padding: '10px',    
  },
  root: {
    margin: '32px auto 32px',
    width: 'calc(100% /2)',
    textAlign: 'center'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

export class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      expanded: false,
      errors: null
    }
  }

  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/submitProfile')
    }    
  }
  componentWillReceiveProps (nextProps) {   
    
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/submitProfile')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
    if (nextProps.location.state !== undefined) {
      this.setState({
        location: nextProps.location
      })
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  onChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const data = {
      username: this.state.username,
      password: this.state.password
    }

    this.props.loginUser(data, this.props.history)
  }

  handleForgotPassword = () =>{
    this.props.forgotPassword(this.props.history)
  }
  
  render () {
    const { errors } = this.state
    const { classes } = this.props
    return (
      <Fragment>
      { this.props.location.state !== undefined ? <ConfirmationDialog/> : null}
      { !this.props.auth.isAuthenticated ? <Card className={classes.root}>
          <CardHeader
            title='Ingresar al portal Pescar'
          />
          <form onSubmit={this.onSubmit} noValidate>
            <CardContent>
              <div style={{ margin: "20px" }}>
              <InputField
                name='username'
                placeholder='Usuario'
                type='text'
                className={classes.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                value={this.state.username}
                fullWidth
              />
              </div>
              <div style={{ margin: "20px" }}>
              <InputField
                name='password'
                placeholder='Contraseña'
                type='password'
                className={classes.inputField}
                onChange={this.onChangeHandler}
                helperText={errors ? 'Hay un error' : ''}
                error={errors}
                value={this.state.password}
                fullWidth
              />
              </div>
            </CardContent>
            <CardActions>
              <div style={{ flex: '1' }}>
                <Button color='primary' type='submit' variant="contained">
                  CONFIRMAR
                </Button>
                <IconButton style={{ flex: '1' }}
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"                
                >
                  <ExpandMoreIcon />
              </IconButton>                
              </div>
            </CardActions>
          </form>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div style={{ flex: '1', size: 'small' }}>
            <Button color='primary' onClick={this.handleForgotPassword}> Olvide mi contraseña </Button> 
            </div>           
          </CardContent>
        </Collapse>
        </Card> : this.props.history.push('/submitProfile')}
        <InputErrorDialog
          errorMessage={'Usuario o constraseña incorrecto'}
          buttonText={'OK'}
          titleText={'Error de ingreso'}
          show={this.props.auth.show}
        />
      </Fragment>
    )
  }
}
Login.proptypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  loginUser,
  forgotPassword
}
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)