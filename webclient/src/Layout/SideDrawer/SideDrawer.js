import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { logoutUser } from '../../actions/authActions'
import { layoutUpdate } from '../../actions/layoutActions'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Icon from '@material-ui/core/Icon';
import image from '../../media/img/icono-logo-web-05-sm.png'
import { mainListItems } from './listItems'
import { Divider } from '@material-ui/core';


const drawerWidth = 240

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',

    minHeight: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  contentCollapsed: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    backgroundColor: 'white',   
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 999,
    marginLeft: '6rem'
  },
  contentStreched: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    backgroundColor: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 999
  },
  link: {
    textDecoration: 'none'
  }
})

class SideDrawer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
    this.props.layoutUpdate(!this.state.open)
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
    this.props.layoutUpdate(!this.state.open)
  }
  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogoutClick = (e) => {
    e.preventDefault()
    this.handleClose()
    this.handleDrawerClose()
    this.props.logoutUser()
  }
    handleSettingClick = (e) => {
    e.preventDefault()
    this.handleClose()
    this.handleDrawerClose()
    this.props.settingUser()
  }

  render () {
    const { classes, theme } = this.props
    const { isAuthenticated } = this.props.auth
    const { anchorEl } = this.state
    
    const authLinks = (
      <Fragment>
        <div style={{ marginRight: '15px' }} name='main'>
          <IconButton
            aria-haspopup='true'
            onClick={this.handleMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </div>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}          
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={this.handleClose}
            component={(props) => <Link {...props} to='/profile' />}
          >
            Perfil
          </MenuItem>
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
           <MenuItem
            onClick={this.handleClose}
            component={(props) => <Link {...props} to='/Setting' />}
          >Configuracion</MenuItem>
        </Menu>        
      </Fragment>
    )

    
    const guestLinks = (
      <div style={{ marginRight: '15px' }}>
        <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
          <Button color='inherit' style={{ marginRight: '15px' }}>
            Ingresar
          </Button>
        </Link>

        <Link to='/register' style={{ textDecoration: 'none', color: 'white' }}>
          <Button color='inherit' style={{ marginRight: '15px' }}>
            Registrarse
          </Button>
        </Link>
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar
          position='fixed'
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!this.state.open}>
            {isAuthenticated ? (
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            
            <Link
              to='/login'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <Icon
                fontSize='small'               
                style={{ marginLeft: '20px' }}
                                
              >  <img src={image}/>
              </Icon>
            </Link>
            <div style={{ flex: '1' }} />
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
        
        
        {isAuthenticated ? (
          <Drawer
            variant='permanent'
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>
            
            <List>{mainListItems}</List>  
                     
          </Drawer>
        ) : null}

        {/* <main className={classes.content}> */}
        <main
          className={
            this.state.open ? classes.contentCollapsed : classes.contentStreched
          }
        >
          <div className={classes.toolbar} />

          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = {
  logoutUser,
  layoutUpdate
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

SideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
  withRouter
)(SideDrawer)
