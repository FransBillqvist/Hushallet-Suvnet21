import { addDoc, collection, getDocs, limit, orderBy, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { date } from 'yup';
import { db } from '../Config/firebase';
import { ChoreHistory } from '../Data/choreHistory';
import { Household } from '../Data/household';

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

export const getDateWhenLatestDoneChoreHistoryWithChoreId = createAsyncThunk<ChoreHistory[], string>(
  'household/getlastestdatefromchorehistory',
  async (choreId, thunkApi) => {
    try {
      let worstcase:ChoreHistory = {id: '', choreId: choreId, profileId: '', date: new Date(0).toISOString().slice(0, 10)};
      const choreHistories: ChoreHistory[] = [];
      const historyRef = collection(db, 'ChoreHistory');
      const q = query(historyRef, where('choreId', '==', choreId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log('i QuerySnapshot');
        if (doc.exists()){
          console.log('jag finns kanske...')

        }else{
          console.log('jag finns inte')
        }
        const loopdate = new Date(doc.data().date);
        console.log(loopdate);
        console.log(new Date(worstcase.date));
        if(loopdate > new Date(worstcase.date)) {
          worstcase = doc.data() as ChoreHistory;
        }});
        choreHistories.push(worstcase);
        return choreHistories;
      }
      catch (error) {
        return thunkApi.rejectWithValue(error);
      }
    },
    );
    
    // const findProfileId = querySnapshot.docs.map((doc) => doc.data().profileId);
    // const findChoreHistoryId = querySnapshot.docs.map((doc) => doc.data().id);

const choreHistorySlice = createSlice({
  name: 'choreHistory',
  initialState,
  reducers: {
    emptyChoreHistoryState: (state) => {
      state.choresHistory = [];
    },
  },
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


    //getDateWhenLatestDoneChoreHistoryWithChoreId
    builder.addCase(getDateWhenLatestDoneChoreHistoryWithChoreId.pending, (state) => {
      state.isLoading = true;
      console.log('pending : getDateWhenLatestDoneChoreHistoryWithChoreId');
    });
    builder.addCase(getDateWhenLatestDoneChoreHistoryWithChoreId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choresHistory.push(...action.payload);
      console.log('fulfill : getDateWhenLatestDoneChoreHistoryWithChoreId');
    });
    builder.addCase(getDateWhenLatestDoneChoreHistoryWithChoreId.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected : getDateWhenLatestDoneChoreHistoryWithChoreId');
    });
  },
});

export const { emptyChoreHistoryState } = choreHistorySlice.actions;

export const choreHistoryReducer = choreHistorySlice.reducer;
