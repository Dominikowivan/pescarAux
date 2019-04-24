import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ProfileDataCard from './ProfileDataCard'
import ProfileAvatar from './ProfileAvatar'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputField from '../common/InputField'
import { profileData } from '../../actions/profileActions'

const styles = {
  root: {
    flexGrow: 1
  },

  gridContainer: {
    maxWidth: '75%'
  },
  gridBigItem: {
    paddingLeft: '25rem'
  },
  gridMediumItemClosed: {
    paddingLeft: '5rem'
  },
  gridMediumItemOpen: {
    paddingLeft: '10rem'
  },
  paper: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
}

export class Profile extends Component {
  constructor () {
    super()
    this.state = {
      open: false 
    }
  }

  componentDidMount(){
    this.props.profileData()
    console.log(this.props.profile)
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }   


  render () {
    const { drawerExpanded } = this.props.layout  
  
    return (
      <div style={styles.root}>        
          <Grid 
          container
          spacing={24}
          direction='row'
          alignItems='stretch'
          style={styles.gridContainer}
          >
          <Grid item xs={12} style={styles.gridBigItem}>
            <ProfileDataCard userData={this.props.profile}/>            
          </Grid>
            
          </Grid>        
      </div>
    )
  }
}

const mapDispatchToProps = {
  profileData
}

const mapStateToProps = (state) => ({
  layout: state.layout,
  profile: state.profileData
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

