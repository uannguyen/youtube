import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken, handleRefreshToken, isExpiredAccessToken } from "api";

export const getTokens: any = createAsyncThunk(
  "app/auth",
  async (code: string) => {
    try {
      return await getAccessToken(code);
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const handleAuth: any = createAsyncThunk("app/auth", async () => {
  try {
    const accessToken = localStorage.getItem("access_token") || "";
    const refreshToken = localStorage.getItem("refresh_token") || "";
    console.log("refreshToken", refreshToken, accessToken);
    if (refreshToken && !(await isExpiredAccessToken(accessToken))) {
      return await handleRefreshToken(refreshToken);
    }
    return { access_token: accessToken };
  } catch (error: any) {
    console.log(error.message);
  }
});

interface InitialState {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  userInfo?: any;
  isLoading?: boolean;
}

const initialState: InitialState = {
  access_token: "",
  refresh_token: "",
  id_token: "",
  userInfo: null,
  isLoading: false
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.setItem("refresh_token", "");
      localStorage.setItem("access_token", "");
      localStorage.setItem("id_token", "");
      return {
        ...state,
        userInfo: null,
        access_token: "",
        refresh_token: "",
        id_token: ""
      };
    },
    updateUser: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action?.payload
      };
    }
  },
  extraReducers: {
    [getTokens.pending]: (state) => {
      state.isLoading = true;
    },
    [getTokens.rejected]: (state) => {
      state.isLoading = false;
    },
    [getTokens.fulfilled]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        access_token: payload?.access_token,
        refresh_token: payload?.refresh_token,
        id_token: payload?.id_token,
        isLoading: false
      };
    },
    [handleAuth.pending]: (state) => {
      state.isLoading = true;
    },
    [handleAuth.rejected]: (state) => {
      state.isLoading = false;
    },
    [handleAuth.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload?.access_token) {
        const { access_token, id_token } = payload;
        return {
          ...state,
          isLoading: false,
          access_token,
          id_token
        };
      }
    }
  }
});

const { reducer } = auth;
export const { logout, updateUser } = auth.actions;
export default reducer;
