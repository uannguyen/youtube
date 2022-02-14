import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { list, updateRate } from 'api'
import { IOption, IVideo, ChannelItem } from 'interface'

export const getVideos: any = createAsyncThunk('video/list', async (options: IOption) => {
  try {
    return await list(options)
  } catch (error: any) {
    console.log(error.message)
  }
})

interface InitialState {
  isLoading: boolean,
  error: string,
  videos: IVideo,
  channels: ChannelItem[],
  videoCategoryId: number,
  rating: '' | 'like' | 'dislike'
}

const initialState: InitialState = {
  isLoading: false,
  error: '',
  videos: {
    items: [],
    pageToken: ''
  },
  channels: [],
  videoCategoryId: 999,
  rating: ''
}

const video = createSlice({
  name: 'video',
  initialState: initialState,
  reducers: {
    updateVideoRate: (state, action) => {
      
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state) => { state.isLoading = true })
      .addCase(getVideos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        const { payload, meta: { arg } } = action
        if (!action?.payload) return
        state.videos = {
          ...state.videos,
          items: (arg?.videoCategoryId !== state.videoCategoryId && !arg?.pageToken)
            ? payload?.videos.items
            : [...state.videos.items, ...payload?.videos.items],
          pageToken: payload?.videos?.nextPageToken
        }
        state.channels = (arg?.videoCategoryId !== state.videoCategoryId && !arg?.pageToken)
          ? [...payload?.channels]
          : [...state.channels, ...payload?.channels]
        state.isLoading = false
        if (arg?.videoCategoryId) state.videoCategoryId = arg?.videoCategoryId
      })
  }
})

const { reducer } = video
export default reducer