import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  id: '',
  username: '',
  password: '',
  isLoading: false,
  error: '',
};

export const setUserName = createAsyncThunk<string, string>(
  'user/setusername',
  async (username, thunkApi) => {
    return username;
  },
);
export const setUserPassword = createAsyncThunk<string, string>(
  'user/setuserpassword',
  async (password, thunkApi) => {
    return password;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setUserName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.username = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setUserPassword.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setUserPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.password = action.payload;
      console.log(action.type);
    });
    // builder.addCase(setUserName.rejected, (state, action) => {
    //   state.isLoading = false;
    //   //   state.error = action.payload || 'Unknown error';
    //   console.log('rejected');
    // });
  },
});

export const userReducer = userSlice.reducer;
