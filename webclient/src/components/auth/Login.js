import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/authActions'
import InputField from '../common/InputField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import ActivateUser from './ActivateUser'

const styles = {
  inputField: {
    width: '80%',
    padding: '10px',
    margin: '10px'
  },
  root: {
    margin: '32px auto 32px',
    width: 'calc(100% /2)',
    textAlign: 'center'
  }
}
export class Login extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
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

  render () {
    const { errors } = this.state
   
    return (
      <Fragment>
      { this.props.location.state !== undefined ? <ActivateUser/> : null}
      { !this.props.auth.isAuthenticated ? <Card style={styles.root}>
          <CardHeader
            title='Ingresar al portal pescar'
          />
          <form onSubmit={this.onSubmit} noValidate>
            <CardContent>
              <InputField
                name='username'
                placeholder='User'
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
                placeholder='Password'
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
              <div style={{ flex: '1' }}>
                <Button color='primary' type='submit' variant="contained">
                  CONFIRMAR
                </Button>                
              </div>
            </CardActions>
          </form>
        </Card> : this.props.history.push('/submitProfile')}
        
      </Fragment>
    )
  }
}
Login.proptypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  loginUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
