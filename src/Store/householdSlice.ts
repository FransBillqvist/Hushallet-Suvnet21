import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface HouseholdState {
  id: string;
  name: string;
  code: string;
  isLoading: boolean;
  error: string;
}

const initialState: HouseholdState = {
  id: '',
  name: '',
  code: '',
  isLoading: false,
  error: '',
};

export const setHouseholdName = createAsyncThunk<string, string>(
  'user/sethouseholdname',
  async (name, thunkApi) => {
    return name;
  },
);

const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setHouseholdName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setHouseholdName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.name = action.payload;
      console.log('fulfilled');
    });
    // builder.addCase(setHouseholdName.rejected, (state, action) => {
    //   state.isLoading = false;
    //   //   state.error = action.payload || 'Unknown error';
    //   console.log('rejected');
    // });
  },
});

export const householdReducer = householdSlice.reducer;
