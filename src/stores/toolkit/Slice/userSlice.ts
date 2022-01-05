import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { UserInfo } from 'interface/user'
import { getUserInfo } from 'api/auth'

export const fetchUser:any = createAsyncThunk('app/user', async (access_token) => {
  try {
    return await getUserInfo(access_token)
  } catch (error: any) {
    console.log(error.message)
  }
})

interface InitialState {
  isLoading: boolean
  userInfo: UserInfo | null
}

const initialState: InitialState = {
  isLoading: false,
  userInfo: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state = {
        ...state,
        userInfo: action?.payload
      }
      return state
    }
  },
  extraReducers: {
    [fetchUser.pending]: (state) => { 
      state.isLoading = true
     },
    [fetchUser.rejected]: (state, action) => { 
      state.isLoading = false
     },
    [fetchUser.fulfilled]: (state, action) => { 
      state.isLoading = false
      state.userInfo = action?.payload
     }
  }
})

const { reducer, actions } = user
export const { updateUser } = actions
export default reducer