import { configureStore } from '@reduxjs/toolkit'
import loading from './slices/loading'
import user from './slices/user'
const store = configureStore({
  reducer: { loading, user }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
