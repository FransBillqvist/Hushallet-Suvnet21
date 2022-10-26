import { collection, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { db } from '../Config/firebase';
import { Household } from '../Data/household';
import { Profile } from '../Data/profile';

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
      const q = query(collection(db, 'Household'), where('id', '==', profile.householdId));
      const querySnapshot = await getDocs(q);
      const household = querySnapshot.docs[0].data() as Household;
      return household;
    } catch (error) {
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
    });
    builder.addCase(editHouseholdName.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });
  },
});

export const { setHousehold } = householdSlice.actions;

export const householdReducer = householdSlice.reducer;
