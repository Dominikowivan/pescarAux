import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ProfileAvatar from './ProfileAvatar'
import Divider from '@material-ui/core/Divider'

const styles = {
  card: {
    maxWidth: 700
  },
  media: {
    objectFit: 'cover'
  }
}

const ProfileDataCard = (props) => {
  const { userData } = props
  console.log(userData)
  return (
    <Card style={styles.card}>
      <CardActionArea>
        <ProfileAvatar size='big' userData={userData} />
        <CardContent style={{ textAlign: 'center' }}>
          <Typography gutterBottom variant='headline' component='h2'>
            {"Tel: " + userData.profileData.telephone}
          </Typography>
          <Divider/>
          <Typography gutterBottom variant='headline' component='h2'>
            {"Tel Alternativo: " + userData.profileData.alternativeTelephone}
          </Typography>
          <Divider/>
          <Typography gutterBottom variant='headline' component='h2'>
            {"Central Pescar: " + userData.profileData.pescarCenter}
          </Typography>
          <Divider/>
          <Typography gutterBottom variant='headline' component='h2'>
            {"Counselor: " + userData.profileData.counselor}
          </Typography>
          <Divider/>
          <Typography gutterBottom variant='headline' component='h2'>
            {"Estudios Alcanzados: " + userData.profileData.maximumEducation}
          </Typography>
          <Divider/>       
          <Typography gutterBottom variant='headline' component='h2'>
            {"Fecha de Recibida: " + userData.profileData.graduationYear}
          </Typography>            
        </CardContent>
      </CardActionArea>      
    </Card>
  )
}

ProfileDataCard.propTypes = {
  userData: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileDataCard)
