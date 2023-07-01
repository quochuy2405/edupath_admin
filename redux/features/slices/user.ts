import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface UserReduxProps {
  role: string
  name: string
}
const initialState: UserReduxProps = {
  role: '',
  name: ''
}
export const userSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<UserReduxProps>) => {
      if (actions.payload.name) state.name = actions.payload.name
      if (actions.payload.role) state.role = actions.payload.role
      return state
    },
    resetUser: () => {
      return initialState
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
