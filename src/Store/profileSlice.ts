import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../Data/profile';

interface ProfileState {
  profiles: Profile[];
  isLoading: boolean;
  error: string;
}

const initialState: ProfileState = {
  profiles: [],
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
      // state.profiles[index].name = action.payload;
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
