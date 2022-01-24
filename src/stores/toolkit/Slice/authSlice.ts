import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAccessToken } from 'api/auth'

export const handleAuth: any = createAsyncThunk('app/auth', async (code: string) => {
  try {
    return await getAccessToken(code)
  } catch (error: any) {
    console.log(error.message)
  }
})

interface InitialState {
  access_token?: string
  id_token?: string
  userInfo?: any
  isLoading?: boolean
}

const initialState: InitialState = {
  access_token: '',
  id_token: '',
  userInfo: null,
  isLoading: false
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null
      state.access_token = ""
      state.id_token = ""
      localStorage.setItem("access_token", "")
      localStorage.setItem("id_token", "")
    },
    updateAuthState: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action?.payload
      }
    }
  },
  extraReducers: {
    [handleAuth.pending]: (state) => {
      state.isLoading = true
    },
    [handleAuth.rejected]: (state) => {
      state.isLoading = false
    },
    [handleAuth.fulfilled]: (state, action) => {
      const { payload } = action
      state.access_token = payload?.access_token
      state.id_token = payload?.id_token
      state.isLoading = false
    }
  }
})

const { reducer } = auth
export const { logout, updateAuthState } = auth.actions
export default reducer