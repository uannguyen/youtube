import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/authSlice";
import CommentSlice from "./Slice/commentSlide";
import ToggleSlice from "./Slice/toggleSlice";
import VideoSearchSlice from "./Slice/videoSearchSlice";
import VideoSlice from "./Slice/videoSlice";

const rootReducer = {
  auth: AuthSlice,
  video: VideoSlice,
  comment: CommentSlice,
  videoSearch: VideoSearchSlice,
  toggle: ToggleSlice
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispash = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
