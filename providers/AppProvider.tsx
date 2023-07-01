'use client'
import { LoadingPopUp } from '@/components/moleculers'
import store from '@/redux/features/store'
import { SnackbarProvider } from 'notistack'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

interface IAppProviderProps {
  children: ReactNode
}

// const StyledSnackbarProvider = styled(SnackbarProvider)`
//   &.SnackbarItem-contentRoot {
//     background-color: #ffffff00;
//     box-shadow: none;O
//   }
// `
const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  // const modal = useSelector((state: RootState) => state.modal)

  return (
    <Provider store={store}>
      <div>
        <Toaster />
        <LoadingPopUp />
        <SnackbarProvider autoHideDuration={3000}>{children}</SnackbarProvider>
      </div>
    </Provider>
  )
}

export default AppProvider
