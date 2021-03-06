import { listCommentByVideoId } from 'api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IComment } from 'interface/comment'

export const listComment = createAsyncThunk('comment/list', async (options: any) => {
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
  reducers: {
    updateComment: (state, action) => {
      if (!action?.payload) return
      state.comments.items = [action.payload, ...state.comments.items]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(listComment.pending, (state) => { state.isLoading = true })
      .addCase(listComment.rejected, (state, action) => {
        state.isLoading = false
      })
      .addCase(listComment.fulfilled, (state, action) => {
        const { payload = {}, meta: { arg } } = action
        return {
          ...state,
          comments: {
            nextPageToken: payload?.nextPageToken,
            pageInfo: payload?.pageInfo,
            items: !arg?.pageToken ? payload?.items : [...state.comments.items , ...payload?.items]
          },
          isLoading: false
        }
      })
  }
})

const { reducer } = comment
export const { updateComment } = comment.actions

export default reducer