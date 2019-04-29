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
import { changePassword } from '../../actions/authActions'
import { changePasswordSucess } from '../../actions/authActions'
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    inputField: {
        width: '80%',
        padding: '10px',
        margin: '5px'
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
    },
    snackError: {
        background: theme.palette.error.dark
    },
    icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
      },
      message: {   
        display: 'flex',     
        alignItems: 'center',
        fontSize: 15
      }
})

export class ChangePassword extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            code: "",
            newPassword: "",
            newPasswordCpy: "",
            errors: "",
            showError: "",
            vertical: "bottom",
            horizontal: "right",
            errorMessage: ""
        }
    }

    componentDidMount() {

        this.state.username = this.props.match.params.username
        this.state.code = this.props.match.params.code

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

    handleClose = (e) => {
        this.setState({ showError: false });
    };

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = (e) => {

        e.preventDefault()

        if (this.state.newPassword !== this.state.newPasswordCpy && this.state.newPassword != "") {
                   
            this.setState({
                errorMessage: "Las contraseñas no son iguales",
                showError: true                
            })
        }
        else{
            if (this.state.newPassword === "") {
                this.setState({
                    errorMessage: "Complete la contraseña",
                    showError: true                
                })
            }
            else {
                const data = {
                    username: this.state.username,
                    code: this.state.code,
                    password: this.state.newPassword
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
    
                this.props.changePassword(data)
            }
           
        }
        

    }

    render() {
        const { errors } = this.state;
        const { classes } = this.props;
        const { vertical, horizontal, showError } = this.state;

        return (
            <Fragment>
                <Card className={classnames(classes.root)}>
                    <CardHeader title='Recupera tu contraseña' />
                    {!this.props.changePasswordReducer.show ?
                        (<form onSubmit={this.onSubmit} noValidate>
                            <CardContent>
                                <InputField
                                    name='newPassword'
                                    placeholder='Nueva contraseña'
                                    type='password'
                                    className={classnames(classes.inputField)}
                                    onChange={this.onChangeHandler}
                                    helperText={errors ? 'Hay un error' : ''}                                    
                                    fullWidth
                                    value={this.state.newPassword}
                                />
                                <InputField
                                    name='newPasswordCpy'
                                    placeholder='Confirme contraseña'
                                    type='password'
                                    className={classnames(classes.inputField)}
                                    onChange={this.onChangeHandler}
                                    helperText={errors ? 'Hay un error' : ''}                                    
                                    fullWidth
                                    value={this.state.newPasswordCpy}
                                    disabled={this.state.newPassword === "" ? true : false}
                                />
                            </CardContent>
                            <CardActions>
                                <div className={classes.wrapper}>
                                    {!this.state.loading ?
                                        <Button color='secondary' type='submit'>
                                            CONFIRMAR
                                        </Button> :
                                        <div>
                                            <CircularProgress size={24} className={classes.buttonProgress} />
                                            <br />
                                            <br />
                                        </div>}
                                </div>
                            </CardActions>
                        </form>) : (<CardContent> Su contraseña ha sido restaurada correctamente! </CardContent>)}
                    <div>                        
                        <Snackbar                            
                            anchorOrigin={{ vertical, horizontal }}
                            open={showError}
                            onClose={this.handleClose}
                            ContentProps={{
                                classes: {
                                    root: classes.snackError
                                },
                                'aria-describedby': 'message-id',
                            }}                            
                            
                            message={<span id="message-id" className={classes.message}>
                                    <ErrorIcon className={classnames(classes.icon, classes.iconVariant)} />
                                    {this.state.errorMessage}                                    
                                    </span>}
                            
                        />                        
                    </div>
                </Card>
            </Fragment>

        )
    }
}

ChangePassword.proptypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    changePasswordReducer: state.changePasswordReducer,
    auth: state.auth
})

const mapDispatchToProps = {
    changePassword
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(ChangePassword)