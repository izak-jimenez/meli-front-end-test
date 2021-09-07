/**
 * SearchContext component
 * This component was implemented for keeping the context (state) of the search functionality of the application
 * In the future, if any additional functionality needs to be kept or added, new functions can be exposed via custom hooks accessible to all Consumers
 * @returns {Function} withLayoutContext
 */

import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext({
  loading: false,
  setLoading: (value: boolean) => {},
  cachedSearch: '',
  setCachedSearch: (value: string) => {},
})

export const SearchContextProvider = SearchContext.Provider
export const SearchContextConsumer = SearchContext.Consumer

SearchContext.displayName = 'SearchContext'

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error(`Context cannot be used outside the Provider`)
  }
  return context
}

export const LayoutConsumer: React.FC<{}> = ({ children }) => {
  return (
    <>
      {typeof children === 'function' ? (
        <SearchContextConsumer>
          {(ctx) => {
            if (ctx === undefined) {
              throw new Error('LayoutContextConsumer must be used within a LayoutConsumer')
            }
            return children({ ...ctx })
          }}
        </SearchContextConsumer>
      ) : (
        children
      )}
    </>
  )
}

export const LayoutProvider: React.FC<{}> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [cachedSearch, setCachedSearch] = useState('')

  return (
    <SearchContextProvider
      value={{
        loading,
        setLoading: (value: boolean) => {},
        cachedSearch,
        setCachedSearch: (value: string) => {},
      }}
    >
      {children}
    </SearchContextProvider>
  )
}

export const LayoutContextWrapper = (props: { children: any }) => {
  const { children } = props
  return <LayoutProvider>{children}</LayoutProvider>
}

export const withLayoutContext = (Component: any) => {
  const innerWithLayoutContext = (props: JSX.IntrinsicAttributes) => {
    return (
      <LayoutContextWrapper>
        <Component {...props} />
      </LayoutContextWrapper>
    )
  }
  innerWithLayoutContext.propTypes = {}
  return innerWithLayoutContext
}
