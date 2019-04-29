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
import { activateUser } from '../../actions/authActions'


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

export class ActivateUser extends Component {
    constructor() {
        super()
        this.state = {
            confirmed: false,
            errors: null,
            loading: false,
            success: false,
            error: {
              color: "red"
            }
        }
    }

    componentDidMount() {

        const data = {
          activationCode: this.props.match.params.code
        } 

        this.props.activateUser(data)

        this.setState({
          confirmed: true
        })

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

    render() {
        const { errors } = this.state;
        const { classes } = this.props;

        return (
            
            <Fragment>
                <Card style={styles.root}>
                    <CardHeader title='Activacion de Usuario' />
                    <CardContent>
                    {this.state.confirmed && this.props.activateReducer.everythingOk ?
                        <h3>Se confirmo debidamente el usuario</h3>
                    : this.state.confirmed ? <h3 style={this.state.error}>Codigo de Activacion Incorrecto</h3> 
                    : <h3>Cargando</h3>}
                    </CardContent>
                </Card>
            </Fragment>

        )
    }
}

ActivateUser.proptypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    activateReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    activateReducer: state.activateUser,
    errors: state.errors
})

const mapDispatchToProps = {
    activateUser
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(ActivateUser)