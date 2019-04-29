import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InputField from '../common/InputField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { sendPasswordLink } from '../../actions/authActions'


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

export class ForgotPassword extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            errors: null,
            loading: false,
            success: false
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    // We use this to get the errors from the redux state (store)
    // and then we set it to the component state
    componentWillReceiveProps(nextProps) {
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
            email: this.state.email,
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

        this.props.sendPasswordLink(data)

    }

    render() {
        const { errors } = this.state;
        const { classes } = this.props;

        return (
            
            <Fragment>
                <Card style={styles.root}>
                    <CardHeader title='Recupera tu contraseña' />
                    {!this.props.recoverPasswordReducer.show ? (<form onSubmit={this.onSubmit} noValidate>
            <CardContent>
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
            </CardContent>
            <CardActions>
                <div className={classes.wrapper}>
                    {!this.state.loading ? 
                    <Button color='secondary' type='submit'>
                        CONFIRMAR
                    </Button>
                    : 
                    <Fragment>
                        <CircularProgress size={24} className={classes.buttonProgress} /> 
                        <br /><br />
                    </Fragment>}
                </div>
            </CardActions>
        </form>) : (<CardContent> Un E-Mail ha sido enviado a su dirección de correo electrónico con los pasos para terminar su pedido de restauración de contraseña </CardContent>)}                    
                </Card>
            </Fragment>

        )
    }
}

ForgotPassword.proptypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    recoverPasswordReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    recoverPasswordReducer: state.recoverPasswordReducer,
    errors: state.errors
})

const mapDispatchToProps = {
    sendPasswordLink
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(ForgotPassword)