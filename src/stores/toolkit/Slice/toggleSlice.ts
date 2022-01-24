import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface CounterState {
  isOpenSidebar: boolean
}

const initialState = { 
  isOpenSidebar: false
 } as CounterState

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    handleToggleSidebar(state, { payload }) {
      state.isOpenSidebar = payload
    }
  }
})

export const { actions: { handleToggleSidebar } } = toggleSlice
export default toggleSlice.reducer