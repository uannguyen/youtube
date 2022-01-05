import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from 'api/api'
import { IOption, IVideo } from 'interface/index'

export const searchVideos: any = createAsyncThunk('relatedVideo/list', async (options: IOption) => {
  try {
    return await API.search(options)
  } catch (error: any) {
    console.log(error.message)
  }
})

interface IinitialState {
  isLoading: boolean,
  error: string,
  videos: IVideo
}

const initialState: IinitialState = {
  isLoading: false,
  error: '',
  videos: {
    items: [],
    pageToken: ''
  }
}

const videoSearch = createSlice({
  name: 'relatedVideo',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchVideos.pending, (state) => { state.isLoading = true })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        const { payload, meta: { arg } } = action
        if (!action?.payload) return
        state.videos = {
          ...state.videos,
          items: arg?.pageToken ? [...state.videos.items, ...payload.items] : payload.items,
          pageToken: payload?.nextPageToken
        }
        state.isLoading = false
      })
  }
})

const { reducer } = videoSearch
export default reducer