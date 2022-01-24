import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import AuthSlice from './Slice/authSlice'
import VideoSlice from './Slice/videoSlice'
import CommentSlice from './Slice/commentSlide'
import VideoSearchSlice from './Slice/videoSearchSlice'
import ToggleSlice from './Slice/toggleSlice'

const rootReducer = {
  auth: AuthSlice,
  video: VideoSlice,
  comment: CommentSlice,
  videoSearch: VideoSearchSlice,
  toggle: ToggleSlice
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