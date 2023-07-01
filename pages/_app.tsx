import AppProvider from '@/providers/AppProvider'
import '../styles/global.css'
import { AppProps } from '@/types/next'
function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: any) => page)
  const layouts = getLayout(<Component {...pageProps} />)

  return <AppProvider>{layouts}</AppProvider>
}

export default App
