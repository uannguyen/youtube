import { listCommentByVideoId } from 'api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IComment } from 'interface/comment'

export const listComment = createAsyncThunk('comment/list', async (options) => {
  return await listCommentByVideoId(options)
})

const initialState: {
  isLoading: boolean
  error: string | any
  comments: {
    items: IComment[],
    nextPageToken: string,
    pageInfo: {
      resultsPerPage: number
      totalResults: number
    }
  }
} = {
  isLoading: false,
  error: '',
  comments: {
    items: [],
    nextPageToken: '',
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 20
    }
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
        state.comments.pageInfo = payload?.pageInfo
        console.log('payload?.pageInfo', payload?.pageInfo)
        state.comments.items = payload?.items
        state.isLoading = false
      })
  }
})

const { reducer } = comment
export default reducer