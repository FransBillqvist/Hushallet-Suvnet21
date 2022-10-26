import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
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
  'household/addchorehistory',
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

export const getChoreHistoryFromDbByProfileId = createAsyncThunk<ChoreHistory[], string>(
  'household/getchorehistorybyprofileid',
  async (profileId, thunkApi) => {
    try {
      const choreHistories: ChoreHistory[] = [];
      const q = query(collection(db, 'ChoreHistory'), where('profileId', '==', profileId));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach((doc) => {
        if (doc.exists()) choreHistories.push(doc.data() as ChoreHistory);
      });
      return choreHistories;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getChoreHistoryFromDbByChoreId = createAsyncThunk<ChoreHistory[], string>(
  'household/getchorehistorybychoreid',
  async (choreId, thunkApi) => {
    try {
      const choreHistories: ChoreHistory[] = [];
      const q = query(collection(db, 'ChoreHistory'), where('choreId', '==', choreId));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach((doc) => {
        if (doc.exists()) choreHistories.push(doc.data() as ChoreHistory);
      });
      return choreHistories;
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
      console.log('fulfill');
    });
    builder.addCase(addChoreHistoryToDb.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });

    builder.addCase(getChoreHistoryFromDbByProfileId.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getChoreHistoryFromDbByProfileId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choresHistory.push(...action.payload);
      console.log('fulfill');
    });
    builder.addCase(getChoreHistoryFromDbByProfileId.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });

    builder.addCase(getChoreHistoryFromDbByChoreId.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getChoreHistoryFromDbByChoreId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choresHistory.push(...action.payload);
      console.log('fulfill');
    });
    builder.addCase(getChoreHistoryFromDbByChoreId.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });
  },
});

export const choreHistoryReducer = choreHistorySlice.reducer;