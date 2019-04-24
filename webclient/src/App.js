import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SideDrawer from './Layout/SideDrawer/SideDrawer'
import theme from './theme'
import './App.css'
import PrivateRoute from './components/common/PrivateRoute'
import Profile from './components/profile/Profile'
import Setting from './components/setting/Setting'
import store from './store'
import ProfileStepper from './components/profile/ProfileStepper'
import checkAuthToken from './utils/checkAuthToken'

checkAuthToken(store)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <SideDrawer>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Switch>
                  <PrivateRoute
                    exact
                    path='/submitProfile'
                    component={(props) => <ProfileStepper {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path='/profile'
                    component={(props) => <Profile {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path='/setting'
                    component={(props) => <Setting {...props} />}
                  />
              </Switch>  
              </SideDrawer>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
