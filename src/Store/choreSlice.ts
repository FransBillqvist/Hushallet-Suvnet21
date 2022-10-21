import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { nanoid } from 'nanoid';
import { db } from '../Config/firebase';
import { Chore, ChoreCreate } from '../Data/chore';
import { AppState } from '../Store/store';

interface ChoreState {
  name: string;
  description: string;
  demanding: number;
  frequency: number;
  householdId: string;
  isLoading: boolean;
  isRemoved: boolean;
  error: string;
  chore: Chore[];
}

const initialState: ChoreState = {
  name: '',
  description: '',
  demanding: 0,
  frequency: 0,
  householdId: '',
  isLoading: false,
  isRemoved: false,
  error: '',
  chore: [],
};

export const addChoreToDb = createAsyncThunk<ChoreCreate, ChoreCreate, { rejectValue: string }>(
  'user/addchore',
  async (Chore, thunkApi) => {
    try {
      await addDoc(collection(db, 'Chore'), {
        id: nanoid(10),
        name: Chore.name,
        description: Chore.description,
        demanding: Chore.demanding,
        frequency: Chore.frequency,
        householdId: Chore.householdId,
      });
      return Chore;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Kunde inte lägga till sysslan, vänligen kontakta support!');
    }
  },
);

export const getChores = createAsyncThunk<
  Chore[],
  string,
  { rejectValue: string; state: AppState }
>('household/getchores', async (householdId, thunkApi) => {
  try {
    const chores: Chore[] = [];
    const q = query(collection(db, 'Chore'), where('householdId', '==', householdId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      if (doc.data().householdId === householdId) {
        const doctorData = doc.data() as Chore;
        chores.push(doctorData);
      }
    });

    return chores;
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Kunde inte hämta sysslor, vänligen kontakta support!');
  }
});

export const setChoreName = createAsyncThunk<string, string, { rejectValue: string }>(
  'user/setchorename',
  async (name, thunkApi) => {
    return name;
  },
);
export const setChoreDescription = createAsyncThunk<string, string, { rejectValue: string }>(
  'user/setchoredescription',
  async (description, thunkApi) => {
    return description;
  },
);
export const setChoreDemanding = createAsyncThunk<number, number, { rejectValue: string }>(
  'user/setchoredemanding',
  async (demanding, thunkApi) => {
    return demanding;
  },
);
export const setChoreFrequency = createAsyncThunk<number, number, { rejectValue: string }>(
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
    builder.addCase(addChoreToDb.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(addChoreToDb.fulfilled, (state) => {
      state.isLoading = false;
      console.log('fulfilled');
    });
    builder.addCase(addChoreToDb.rejected, (state, action) => {
      state.error = action.payload || '';
      state.isLoading = false;
    });

    builder.addCase(getChores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChores.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getChores.rejected, (state, action) => {
      state.error = action.payload || '';
      state.isLoading = false;
    });

    builder.addCase(setChoreName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.name = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setChoreName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Unknown error';
      console.log('rejected');
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
  },
});

export const choreReducer = choreSlice.reducer;
