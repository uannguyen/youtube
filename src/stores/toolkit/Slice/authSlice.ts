import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import firebase from 'firebase/app'
import authFibase from '../../../api/firebase'

export const auth:any = createAsyncThunk('app/auth', async (type: string) => {
  try {
    if (type === 'login') {
      const provider = new firebase.auth.GoogleAuthProvider()
      const res = await authFibase.signInWithPopup(provider)
      return res
    } else if (type === 'logout') await authFibase.signOut()
  } catch (error: any) {
    console.log(error.message)
  }
})

const app = createSlice({
  name: 'app',
  initialState: {
    credential: {
      accessToken: null
    },
    user: null,
    isLoading: false,
    error: ''
  },
  reducers: {},
  extraReducers: {
    [auth.pending]: (state) => { 
      state.isLoading = true
     },
    [auth.rejected]: (state, action) => { 
      state.isLoading = false
      state.error = action.error
     },
    [auth.fulfilled]: (state, action) => { 
      if (action?.meta?.arg === 'logout') {
        state.credential = { accessToken: null }
        state.user = null
      }
      if (action?.payload) {
        const { credential, additionalUserInfo } = action.payload
        state.credential = { ...state.credential, ...credential }
        state.user = additionalUserInfo?.profile
        state.isLoading = false
      }
     }
  }
})

const { reducer } = app
export default reducer