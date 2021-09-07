/**
 * SearchBar component
 * Renders a component with a TextField that captures the search input from the user
 * Calls the items/ route with the search query parameter
 * @returns {JSXElement} SearchBar
 */

import { Container, AppBar, Toolbar, Grid, TextField, InputAdornment, IconButton } from '@material-ui/core'
import { FiSearch } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import '../../lib/styles/Main.scss'
import { MeliLogo } from './common'
import { useSearchContext } from './context'
import { routePaths } from '../../config/constants'

const SearchBar = (props: any) => {
  const { loading, setLoading, cachedSearch, setCachedSearch } = useSearchContext()
  const { handleSubmit, control, getValues } = useForm()
  const history = useHistory()

  const handleReturnHome = () => {
    history.push(routePaths.home)
  }

  const SearchInput = () => {
    const handleSearchInput = (data: any) => {
      const { search } = data
      setCachedSearch(search)
      history.push(`${routePaths.items}?search=${search}`)
    }

    return (
      <form onSubmit={handleSubmit(handleSearchInput)}>
        <Controller
          name="search"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              data-testid="search-input"
              fullWidth
              placeholder="Nunca dejes de buscar"
              variant="outlined"
              size="small"
              className="search-bar"
              InputProps={{
                endAdornment: (
                  <InputAdornment className="search-adornment" position="end">
                    <IconButton data-testid="search-button" className="search-adornment-btn" type="submit">
                      <FiSearch />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  paddingRight: '0',
                },
              }}
            />
          )}
        />
      </form>
    )
  }

  return (
    <div className="">
      <AppBar position="static">
        <Toolbar className="search-bar-box">
          <Container>
            <Grid container>
              <Grid item xs={2} className="meli-logo-container" onClick={handleReturnHome}>
                <MeliLogo width={50} />
              </Grid>
              <Grid item xs={10}>
                {SearchInput()}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default SearchBar
