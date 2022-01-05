import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAccessToken } from 'api/auth'

export const handleAuth:any = createAsyncThunk('app/auth', async (code) => {
  try {
    return await getAccessToken(code)
  } catch (error: any) {
    console.log(error.message)
  }
})

interface InitialState {
  access_token: string
  refresh_token: string
  isLoading: boolean
}

const initialState: InitialState = {
  access_token: '',
  refresh_token: '',
  isLoading: false
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      console.log('logout', state, action)
      // state = { ...state, access_token: '' }
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
      state.isLoading = false
      state.access_token = action?.payload?.access_token
      state.refresh_token = action?.payload?.refresh_token
     }
  }
})

const { reducer } = auth
export const { logout } = auth.actions
export default reducer