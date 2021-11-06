import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface CounterState {
  toggleSidebar: 'large' | 'small'
}

const initialState = { 
  toggleSidebar: 'large'
 } as CounterState

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    handleToggleSidebar(state) {
      if (state.toggleSidebar === 'large') state.toggleSidebar = 'small'
      else state.toggleSidebar = 'large'
    }
  }
})

export const { actions: { handleToggleSidebar } } = toggleSlice
export default toggleSlice.reducer