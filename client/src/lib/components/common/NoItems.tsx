/**
 * NoItems component
 * Renders a No Items Found screen component
 * @returns {JSXElement} NoItems
 */

import { Container, Box, Grid, Typography } from '@material-ui/core'
import '../../styles/Main.scss'

const NoItems = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className="no-items-text">☹️</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className="no-items-text">Lo sentimos. No se econtró ningún resultado.</Typography>
      </Grid>
    </Grid>
  )
}

export default NoItems
