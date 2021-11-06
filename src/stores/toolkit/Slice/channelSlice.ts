import { listCommentByVideoId } from 'api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IChannel } from 'interface/channel'

export const listComment = createAsyncThunk('comment/list', async (videoId) => {
  return await listCommentByVideoId(videoId)
})

const initialState: {
  isLoading: boolean
  error: string | any
  comments: {
    items: IChannel[],
    nextPageToken: string
  }
} = {
  isLoading: false,
  error: '',
  comments: {
    items: [],
    nextPageToken: ''
  },
}

const comment = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listComment.pending, (state) => { state.isLoading = true })
      .addCase(listComment.rejected, (state, action) => {
        state.isLoading = false
        // state.error = action.error
      })
      .addCase(listComment.fulfilled, (state, action) => {
        const { payload } = action
        state.comments.nextPageToken = payload?.nextPageToken
        state.comments.items = payload?.items
        state.isLoading = false
      })
  }
})

const { reducer } = comment
export default reducer