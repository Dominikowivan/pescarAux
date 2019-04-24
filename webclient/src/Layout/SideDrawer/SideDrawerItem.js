import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const SideDrawerItem = (props) => {
  return (
    <ListItem button={true} {...props}>
      {props.children && <ListItemIcon>{props.children}</ListItemIcon>}
      <ListItemText primary={props.primary} />
    </ListItem>
  )
}

export default SideDrawerItem
