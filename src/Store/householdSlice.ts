import { collection, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { db } from '../Config/firebase';
import { Household } from '../Data/household';
import { Profile } from '../Data/profile';
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

export const setHouseholdName = createAsyncThunk<string, string>(
  'user/sethouseholdname',
  async (name, thunkApi) => {
    return name;
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
      for(let i = 0; profile.name != ''; i++) {
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
      // const state = thunkApi.getState() as AppState;
      const householdids = profiles.map((pro) => pro.householdId)
      const q = query(collection(db, 'Household'), where('id', 'in', householdids));
      const querySnapshot = await getDocs(q);
      console.log('getDocs() ')
      console.log( querySnapshot.docs)
      const result = querySnapshot.docs.map(doc => doc.data() as Household) ;
      console.log('result FROM addAllHouseholdsFromProfile');
      console.log(result);
      return result;
      } catch (error) {
        console.error(error)
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
        alert('Det finnns inget hushåll med detta id');
      }
      return thunkApi.rejectWithValue('Det gick inte');
    }
  },
);

const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {
    setHousehold: (state, action) => {
      state.singleHousehold = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setHouseholdName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setHouseholdName.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.name = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setHouseholdName.rejected, (state, action) => {
      state.isLoading = false;
      // state.error = action.payload || 'Unknown error';
      console.log('rejected');
    });

    builder.addCase(getHouseHoldByCode.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getHouseHoldByCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.households.push(action.payload);
      console.log('fulfilled');
    });
    builder.addCase(getHouseHoldByCode.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
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
      console.log('rejected');
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
      console.log('Here comes the payload');
      console.log(action.payload);
      console.log('Here comes the household array');
      console.log(state.households);
    });
    builder.addCase(editHouseholdName.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
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
  },
});

export const { setHousehold } = householdSlice.actions;

export const householdReducer = householdSlice.reducer;
