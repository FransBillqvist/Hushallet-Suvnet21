import { addDoc, collection } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../Config/firebase';
import { ChoreHistory } from '../Data/choreHistory';

interface ChoreHistoryState {
  isLoading: boolean;
  error?: string;
  choresHistory: ChoreHistory[];
}

const initialState: ChoreHistoryState = {
  isLoading: false,
  choresHistory: [],
};

export const addChoreHistoryToDb = createAsyncThunk<ChoreHistory, ChoreHistory>(
  'househod/addchorehistory',
  async (choreHistory, thunkApi) => {
    try {
      console.log(choreHistory.date);
      await addDoc(collection(db, 'ChoreHistory'), choreHistory);
      return choreHistory;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const choreHistorySlice = createSlice({
  name: 'choreHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addChoreHistoryToDb.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(addChoreHistoryToDb.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choresHistory.push(action.payload);
      console.log('pending');
    });
    builder.addCase(addChoreHistoryToDb.rejected, (state) => {
      state.isLoading = false;
      console.log('pending');
    });
  },
});

export const choreHistoryReducer = choreHistorySlice.reducer;
