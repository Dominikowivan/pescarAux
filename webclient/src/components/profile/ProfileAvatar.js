import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import _ from 'lodash'
const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10
  },
  big: {
    width: 180,
    height: 180,
    margin: 10
  },
  small: {
    width: 10,
    height: 10,
    margin: 10
  }
}

const ProfileAvatar = (props) => {
  const { size, userData } = props
  return (
    <div style={styles.row}>
      <Avatar
        alt="test"
        style={size === 'big' ? styles.big : styles.small}
      >
        {"test"}
      </Avatar>
    </div>
  )
}

ProfileAvatar.propTypes = {
  size: PropTypes.string
}

ProfileAvatar.defaultProps = {
  size: 'small'
}

export default withStyles(styles)(ProfileAvatar)
