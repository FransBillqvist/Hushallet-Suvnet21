import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ChoreState {
  id: string;
  name: string;
  description: string;
  demanding: number;
  frequency: number;
  householdId: string;
  isLoading: boolean;
  error: string;
}

const initialState: ChoreState = {
  id: '',
  name: '',
  description: '',
  demanding: 0,
  frequency: 0,
  householdId: '',
  isLoading: false,
  error: '',
};

export const setChoreName = createAsyncThunk<string, string>(
  'user/setchorename',
  async (name, thunkApi) => {
    return name;
  },
);
export const setChoreDescription = createAsyncThunk<string, string>(
  'user/setchoredescription',
  async (description, thunkApi) => {
    return description;
  },
);
export const setChoreDemanding = createAsyncThunk<number, number>(
  'user/setchoredemanding',
  async (demanding, thunkApi) => {
    return demanding;
  },
);
export const setChoreFrequency = createAsyncThunk<number, number>(
  'user/setchorefrequency',
  async (frequency, thunkApi) => {
    return frequency;
  },
);

const choreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setChoreName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.name = action.payload;
      console.log('fulfilled');
    });

    builder.addCase(setChoreDescription.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreDescription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.description = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setChoreDemanding.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreDemanding.fulfilled, (state, action) => {
      state.isLoading = false;
      state.demanding = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setChoreFrequency.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreFrequency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.frequency = action.payload;
      console.log('fulfilled');
    });

    // builder.addCase(setChoreName.rejected, (state, action) => {
    //   state.isLoading = false;
    //   //   state.error = action.payload || 'Unknown error';
    //   console.log('rejected');
    // });
  },
});

export const choreReducer = choreSlice.reducer;
