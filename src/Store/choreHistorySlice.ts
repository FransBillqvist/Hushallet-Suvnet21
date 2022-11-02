import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filterCurrentWeek } from '../Components/filterChoreHistory';
import { db } from '../Config/firebase';
import { Chore } from '../Data/chore';
import { ChoreHistory } from '../Data/choreHistory';
import { Profile } from '../Data/profile';
import { ChorePieData, PieData } from '../Screens/StatisticsScreen';
import { AppState } from './store';

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

export const getChoreHistoryFromDbByProfileIds = createAsyncThunk<ChoreHistory[], Profile[]>(
  'household/getchorehistorybyprofileid',
  async (profiles, thunkApi) => {
    try {
      if (profiles.length > 0) {
        const profileids = profiles.map((pro) => pro.id);
        const q = query(collection(db, 'ChoreHistory'), where('profileId', 'in', profileids));
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc) => doc.data() as ChoreHistory);
        return result;
      } else return [];
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getChoreHistoryFromDbByChores = createAsyncThunk<ChoreHistory[], Chore[]>(
  'household/getchorehistorybychoreid',
  async (chores, thunkApi) => {
    try {
      if (chores.length > 0) {
        const choreIds = chores.map((c) => c.id);
        const q = query(collection(db, 'ChoreHistory'), where('choreId', 'in', choreIds));
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc) => doc.data() as ChoreHistory);
        return result;
      } else return [];
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getDateWhenLatestDoneChoreHistoryWithChoreId = createAsyncThunk<ChoreHistory, string>(
  'household/getlastestdatefromchorehistory',
  async (choreId, thunkApi) => {
    try {
      let worstcase: ChoreHistory = {
        id: '',
        choreId: choreId,
        profileId: '',
        date: new Date(0).toISOString().slice(0, 10),
      };
      const historyRef = collection(db, 'ChoreHistory');
      const q = query(historyRef, where('choreId', '==', choreId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const loopdate = new Date(doc.data().date);
        if (loopdate > new Date(worstcase.date)) {
          worstcase = doc.data() as ChoreHistory;
        }
      });
      const choreHistories: ChoreHistory = worstcase;
      return choreHistories;
    } catch (error) {
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

    builder.addCase(getChoreHistoryFromDbByProfileIds.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getChoreHistoryFromDbByProfileIds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choresHistory = action.payload;
      console.log('fulfill');
    });
    builder.addCase(getChoreHistoryFromDbByProfileIds.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });

    builder.addCase(getChoreHistoryFromDbByChores.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getChoreHistoryFromDbByChores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.choresHistory = action.payload;
      console.log('fulfill');
    });
    builder.addCase(getChoreHistoryFromDbByChores.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });

    //getDateWhenLatestDoneChoreHistoryWithChoreId
    builder.addCase(getDateWhenLatestDoneChoreHistoryWithChoreId.pending, (state) => {
      state.isLoading = true;
      console.log('pending : getDateWhenLatestDoneChoreHistoryWithChoreId');
    });
    builder.addCase(getDateWhenLatestDoneChoreHistoryWithChoreId.fulfilled, (state) => {
      state.isLoading = false;
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

export const selectHistoryByPeriod =
  (period: 'currentWeek' | 'previousWeek') => (state: AppState) => {
    const totalData: PieData[] = [];
    const everyPieData: ChorePieData[] = [];

    const household = state.household.singleHousehold;
    const profilesInHousehold = state.profile.profiles.filter(
      (pro) => pro.householdId == household?.id,
    );
    const choresInHousehold = state.chore.chores;
    const choreHistories = state.choreHistory.choresHistory.filter((ch) => ch.profileId !== 'null');

    console.log('||||||||||||||||||||| choreHistories |||||||||||||||||||||');
    console.log(choreHistories);

    const choreHistoryForCurrentWeek = filterCurrentWeek(choreHistories);

    profilesInHousehold.forEach((pro) => {
      let contribution = 0;
      const choresDoneByProfile = choreHistoryForCurrentWeek.filter((cH) => cH.profileId == pro.id);
      if (choresDoneByProfile.length > 0) {
        choresDoneByProfile.forEach((cH) => {
          contribution += choresInHousehold.find((chore) => chore.id == cH.choreId)?.demanding || 0;
        });
      }

      totalData.push({
        name: pro.avatar,
        contribution: contribution,
        color: setColor(pro.avatar) || '',
        legendFontColor: 'transparent',
        legendFontSize: 30,
      });
    });

    choresInHousehold.forEach((choreHousehold) => {
      const choreHasBeenDone = choreHistoryForCurrentWeek.filter(
        (cH) => cH.choreId == choreHousehold.id,
      );
      if (choreHasBeenDone.length > 0) {
        let chorePieData = everyPieData.find((data) => data.choreTitle === choreHousehold.name);
        if (!chorePieData) {
          chorePieData = { choreTitle: choreHousehold.name, pieData: [] };
          everyPieData.push(chorePieData);
        }
        choreHasBeenDone.forEach((choreDone) => {
          const avatar = profilesInHousehold.find((pro) => pro.id == choreDone.profileId)?.avatar;
          chorePieData?.pieData.push({
            name: avatar || '',
            contribution: 1,
            color: setColor(avatar || '') || '',
            legendFontColor: 'transparent',
            legendFontSize: 30,
          });
        });
      }
    });

    return { totalData, everyPieData };
  };

function setColor(name: string) {
  if (name === '🦊') {
    return 'red';
  } else if (name === '🐳') {
    return '#1AFFFF';
  } else if (name === '🐷') {
    return 'pink';
  } else if (name === '🐥') {
    return 'yellow';
  } else if (name === '🐸') {
    return '#00cc00';
  } else if (name === '🐬') {
    return '#0000E6';
  } else if (name === '🐙') {
    return '#CC00CC';
  } else if (name === '🦄') {
    return '#333333';
  }
}
