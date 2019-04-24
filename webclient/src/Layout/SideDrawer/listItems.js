import React from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/HomeOutlined'


const styles = {
  links: {
    textDecoration: 'none'
  }
}

export const mainListItems = (
  <div>
    <Link to='/dashboard' style={styles.links}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
    </Link>    
  </div>
)

