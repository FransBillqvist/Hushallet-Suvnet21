import { collection, getDocs, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from '../Config/firebase';
import { Household } from '../Data/household';

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
  singleHousehold: {id: '', name: '', code: ''},
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
      return household;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
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
  },
});

export const householdReducer = householdSlice.reducer;
