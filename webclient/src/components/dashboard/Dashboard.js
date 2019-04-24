import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = {
  card: {
    marginBottom: '10px'
  }
}

export class Dashboard extends Component {
  render () {
    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={6} md={4} lg={6}>
            <div>              
                <Paper style={{ textAlign: 'center' }}>
                  <h1>PlaceHolder</h1>
                </Paper>              
            </div>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

Dashboard.proptypes = {
  auth: PropTypes.object.isRequired,  
}

const mapStateToProps = (state) => ({
  auth: state.auth,  
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
