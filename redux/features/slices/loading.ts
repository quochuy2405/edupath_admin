import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
interface LoadingReduxProps {
  status: boolean
  title?: ReactNode
  mode?: 'default' | 'success' | 'error' | 'mail'
}
const initialState: LoadingReduxProps = {
  status: false,
  title: 'Loading...',
  mode: 'default'
}
export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<LoadingReduxProps>) => {
      state.status = actions.payload.status
      if (actions.payload.title) state.title = actions.payload.title
      if (actions.payload.mode) state.mode = actions.payload.mode
      return state
    },
    closeLoading: () => {
      return initialState
    }
  }
})

export const { setLoading, closeLoading } = loadingSlice.actions

export default loadingSlice.reducer
