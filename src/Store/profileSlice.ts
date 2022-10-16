import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ProfileState {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: string;
  householdId: string;
  isLoading: boolean;
  error: string;
}

const initialState: ProfileState = {
  id: '',
  userId: '',
  name: '',
  avatar: '',
  role: '',
  householdId: '',
  isLoading: false,
  error: '',
};

export const setProfileName = createAsyncThunk<string, string>(
  'user/setprofilename',
  async (name, thunkApi) => {
    return name;
  },
);

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setProfileName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setProfileName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.name = action.payload;
      console.log('fulfilled');
    });
    // builder.addCase(setProfileName.rejected, (state, action) => {
    //   state.isLoading = false;
    //   //   state.error = action.payload || 'Unknown error';
    //   console.log('rejected');
    // });
  },
});

export const profileReducer = profileSlice.reducer;
