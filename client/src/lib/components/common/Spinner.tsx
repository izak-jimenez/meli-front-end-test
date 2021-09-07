/**
 * Spinner component
 * Renders a component with a loading spinner
 * @returns {JSXElement} Spinner
 */

import { CircularProgress, Grid } from '@material-ui/core'
import '../../styles/Main.scss'

const Spinner = () => {
  return (
    <Grid container>
      <Grid item className="spinner-container">
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Spinner
