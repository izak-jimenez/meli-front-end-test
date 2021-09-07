/**
 * MainLayout component
 * HOC that renders its children with the MainLayout as its parent layout
 * @returns {Function} withMainLayout
 */

import { useSearchContext, LayoutConsumer, LayoutContextWrapper } from '../context'
import SearchBar from '../SearchBar'

const Layout = (props: any) => {
  const { loading, setLoading, cachedSearch, setCachedSearch } = useSearchContext()
  const { MainContent } = props

  return (
    <>
      <LayoutConsumer>
        {(ctx: any) => (
          <div>
            <SearchBar />
            <main>
              <MainContent {...props} ctx={ctx} />
            </main>
          </div>
        )}
      </LayoutConsumer>
    </>
  )
}

export const MainLayout = (props: { MainContent: any }) => {
  const { MainContent } = props
  return (
    <LayoutContextWrapper>
      <Layout {...props} MainContent={MainContent} />
    </LayoutContextWrapper>
  )
}

export const withMainLayout =
  (MainContent: any) => (props: JSX.IntrinsicAttributes & { MainContent: any }) => {
    return <MainLayout {...props} MainContent={MainContent} />
  }
