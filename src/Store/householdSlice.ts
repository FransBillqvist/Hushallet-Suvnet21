import { addDoc, collection, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { db } from '../Config/firebase';
import { Household } from '../Data/household';
import { Profile } from '../Data/profile';
import { emptyChoreHistoryState, getChoreHistoryFromDbByChores } from './choreHistorySlice';
import { getChores } from './choreSlice';
import { getProfilesByUserId, getProfilesForHousehold, setCurrentProfile } from './profileSlice';
import { AppState } from './store';

interface HouseholdsState<Household> {
  households: Household[];
  isLoading: boolean;
  error?: string;
  singleHousehold?: Household;
}

const initialState: HouseholdsState<Household> = {
  households: [],
  isLoading: false,
  error: '',
  singleHousehold: { id: '', name: '', code: '' },
};

export const createNewHousehold = createAsyncThunk<Household, Household>(
  'household/createnewhousehold',
  async (household, thunkApi) => {
    try {
      await addDoc(collection(db, 'Household'), household);
      return household;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getHouseHoldByCode = createAsyncThunk<Household, string>(
  'household/gethousehold',
  async (code, thunkApi) => {
    try {
      const q = query(collection(db, 'Household'), where('code', '==', code));
      const querySnapshot = await getDocs(q);
      const household = querySnapshot.docs[0].data() as Household;
      thunkApi.dispatch(setHousehold(household));
      return household;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getHouseholdByProfileId = createAsyncThunk<Household, Profile>(
  'household/gethouseholdbyprofileid',
  async (profile, thunkApi) => {
    try {
      for (let i = 0; profile.name != ''; i++) {
        const q = query(collection(db, 'Household'), where('id', '==', profile.householdId));
        const querySnapshot = await getDocs(q);
        const household = querySnapshot.docs[i].data() as Household;

        return household;
      }
      return thunkApi.rejectWithValue('No household found');
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const addAllHouseholdsFromProfile = createAsyncThunk<Household[], Profile[]>(
  'household/addallhouseholdsfromprofile',
  async (profiles, thunkApi) => {
    try {
      if (profiles.length > 0) {
        const householdids = profiles.map((pro) => pro.householdId);
        const q = query(collection(db, 'Household'), where('id', 'in', householdids));
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc) => doc.data() as Household);
        console.log('result FROM addAllHouseholdsFromProfile');
        console.log(result);
        return result;
      } else return [];
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const editHouseholdName = createAsyncThunk<Household, Household, { rejectValue: string }>(
  'household/editchore',
  async (Household, thunkApi) => {
    try {
      const q = query(collection(db, 'Household'), where('id', '==', Household.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const id = querySnapshot.docs[0].id;
        const edit = doc(db, 'Household', id);
        await updateDoc(edit, {
          name: Household.name,
        });
      }
      return Household;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue('Databasfel, kontakta systemadministratören.');
      }
      return thunkApi.rejectWithValue('Det gick inte');
    }
  },
);

export const selectActiveHousehold = createAsyncThunk<
  Household,
  string,
  { rejectValue: string; state: AppState }
>('household/selectactivehousehold', async (id, thunkApi) => {
  try {
    const q = query(collection(db, 'Household'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data() as Household);
    let state = thunkApi.getState();
    thunkApi.dispatch(getProfilesForHousehold(id));
    thunkApi.dispatch(getProfilesByUserId(state.user.user.uid));
    thunkApi.dispatch(emptyChoreHistoryState());
    thunkApi.dispatch(
      setCurrentProfile(
        state.profile.profiles.find(
          (pro) => pro.userId === state.user.user.uid && pro.householdId === id,
        ),
      ),
    );
    await thunkApi.dispatch(getChores(id));
    state = thunkApi.getState();
    await thunkApi.dispatch(getChoreHistoryFromDbByChores(state.chore.chores));
    return result[0];
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      return thunkApi.rejectWithValue('Databasfel. Hittar inget hushåll med detta id.');
    }
    return thunkApi.rejectWithValue('Det gick inte');
  }
});

export const addHouseholdToHouseholdList = createAsyncThunk<Household, Household>(
  'household/addHouseholdtohouseholdlist',
  (household, thunkApi) => {
    try {
      return household;
    } catch (error) {
      console.error(error);
    }
    return thunkApi.rejectWithValue(
      'Något dåligt hände och hushållet kunde inte läggas till. Kontakta support!',
    );
  },
);

const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {
    setHousehold: (state, action) => {
      state.singleHousehold = action.payload;
    },
    flushHousehold: (state) => {
      state.singleHousehold = { id: '', name: '', code: '' };
      state.households = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewHousehold.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(createNewHousehold.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleHousehold = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(createNewHousehold.rejected, (state) => {
      state.isLoading = false;
      console.log('create new household rejected');
    });

    builder.addCase(getHouseHoldByCode.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getHouseHoldByCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleHousehold = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(getHouseHoldByCode.rejected, (state) => {
      state.isLoading = false;
      console.log('get householdbycode rejected');
    });

    builder.addCase(getHouseholdByProfileId.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getHouseholdByProfileId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.households.push(action.payload);
      console.log('fulfilled');
    });
    builder.addCase(getHouseholdByProfileId.rejected, (state) => {
      state.isLoading = false;
      console.log('gethouseholdbyprofile rejected');
    });

    builder.addCase(editHouseholdName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(editHouseholdName.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.households.findIndex((h) => h.id == action.payload.id);
      state.households.splice(index, 1, action.payload);
      console.log('fulfilled');
    });
    builder.addCase(editHouseholdName.rejected, (state) => {
      state.isLoading = false;
      console.log('edithouseholdname rejected');
    });

    //addAllHouseholdsFromProfile
    builder.addCase(addAllHouseholdsFromProfile.pending, (state) => {
      state.isLoading = true;
      console.log('addAllHouseholdsFromProfile: pending');
    });
    builder.addCase(addAllHouseholdsFromProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.households = action.payload;
      console.log('addAllHouseholdsFromProfile: fulfilled');
    });
    builder.addCase(addAllHouseholdsFromProfile.rejected, (state) => {
      state.isLoading = false;
      console.log('addAllHouseholdsFromProfile: rejected');
    });
    //selectActiveHousehold
    builder.addCase(selectActiveHousehold.pending, (state) => {
      state.isLoading = true;
      console.log('selectActiveHousehold: pending');
    });
    builder.addCase(selectActiveHousehold.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleHousehold = action.payload;
      console.log('selectActiveHousehold: fulfilled');
    });
    builder.addCase(selectActiveHousehold.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Det gick inte';
      console.log('selectActiveHousehold: rejected');
    });

    //addHouseholdToHouseholdList
    builder.addCase(addHouseholdToHouseholdList.pending, (state) => {
      state.isLoading = true;
      console.log('addHouseholdToState: pending');
    });
    builder.addCase(addHouseholdToHouseholdList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.households.push(action.payload);
      console.log('addHouseholdToState: fulfilled');
    });
    builder.addCase(addHouseholdToHouseholdList.rejected, (state) => {
      state.isLoading = false;
      console.log('addHouseholdToState: rejected');
    });
  },
});

export const { setHousehold, flushHousehold } = householdSlice.actions;

export const householdReducer = householdSlice.reducer;
