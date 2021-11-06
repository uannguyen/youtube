import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import AuthSlice from './Slice/authSlice'
import VideoSlice from './Slice/videoSlice'
import ToggleSlice from './Slice/toggleSlice'
import CommentSlice from './Slice/commentSlide'

const rootReducer = {
  app: AuthSlice,
  video: VideoSlice,
  toggle: ToggleSlice,
  comment: CommentSlice
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type AppDispash = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>