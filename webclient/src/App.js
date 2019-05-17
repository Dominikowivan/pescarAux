import React, { Component } from "react";
import { Provider } from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ChangePassword from "./components/auth/ChangePassword";
import SideDrawer from "./Layout/SideDrawer/SideDrawer";
import theme from "./theme";
import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";
import Profile from "./components/profile/Profile";
import store from "./store";
import ProfileStepper from "./components/profile/ProfileStepper";
import checkAuthToken from "./utils/checkAuthToken";
import ActivateUser from "./components/auth/ActivateUser";
import NotificationPage from "./components/notification/NotificationPage";
import Setting from './components/setting/Setting';
import EditProfile from './components/setting/EditProfile';
import TableList from "./components/setting/TableList";


checkAuthToken(store);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <SideDrawer>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                  exact
                  path="/forgot/password"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/change/password/:username/:code"
                  component={ChangePassword}
                />
                <Route
                  exact
                  path="/activate/:code"
                  component={ActivateUser}
                />
                <Route
                  exact
                  path="/notification"
                  component={NotificationPage}
                />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/submitProfile"
                    component={props => <ProfileStepper {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path="/profile"
                    component={props => <Profile {...props} />}
                  />
  		  <PrivateRoute
                    exact
                    path='/setting'
                    component={(props) => <Setting {...props} />}
                  />
        <PrivateRoute
                    exact
                    path='/setting/editProfile/:id'
                    component={(props) => <EditProfile {...props} />}
                  />
                </Switch>
              </SideDrawer>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
