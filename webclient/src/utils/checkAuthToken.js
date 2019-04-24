import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from '../actions/authActions'

const checkAuthToken = (store) => {
  // Check for token
  if (localStorage.user) {
    // Set auth token header
    setAuthToken(JSON.parse(localStorage.getItem('user')).token)

    // Decode token and get expiration data
    const decoded = jwt_decode(JSON.parse(localStorage.getItem('user')).token)

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem('user'))))

    // Check for expired token
    const currentTime = Date.now() / 1000
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser())
      // Clear current Profile
      //store.dispatch(clearCurrentProfile())
      // Redirect to login
      window.location.href = '/login'
    }
  }
}
export default checkAuthToken
