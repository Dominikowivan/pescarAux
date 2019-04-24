import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: {
      main: '#f44336'
    },
    error: red
  }
})

export default theme
