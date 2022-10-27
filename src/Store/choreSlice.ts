import { addDoc, collection, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { db } from '../Config/firebase';
import { Chore, ChoreCreate } from '../Data/chore';
import { AppState } from '../Store/store';

interface ChoreState {
  isLoading: boolean;
  isRemoved: boolean;
  error: string;
  chores: Chore[];
  singleChore: Chore;
}

const initialState: ChoreState = {
  isLoading: false,
  isRemoved: false,
  error: '',
  chores: [],
  singleChore: { id: '', name: '', description: '', demanding: 0, frequency: 0, householdId: '' },
};

export const addChoreToDb = createAsyncThunk<ChoreCreate, ChoreCreate, { rejectValue: string }>(
  'user/addchore',
  async (Chore, thunkApi) => {
    try {
      await addDoc(collection(db, 'Chore'), {
        id: Chore.id,
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

export const editChore = createAsyncThunk<Chore, Chore, { rejectValue: string }>(
  'household/editchore',
  async (Chore, thunkApi) => {
    try {
      const q = query(collection(db, 'Chore'), where('id', '==', Chore.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const id = querySnapshot.docs[0].id;

        const edit = doc(db, 'Chore', id);
        await updateDoc(edit, {
          name: Chore.name,
          description: Chore.description,
          demanding: Chore.demanding,
          frequency: Chore.frequency,
        });
      }
      return Chore;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Det gick inte!');
    }
  },
);

export const getASingleChore = createAsyncThunk<Chore, string, { rejectValue: string }>(
  'household/getasinglechore',
  async (id, thunkApi) => {
    try {
      const q = query(collection(db, 'Chore'), where('id', '==', id));
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map((doc) => doc.data() as Chore);
      return result[0];
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        alert('Kunde inte hämta sysslan, vänligen kontakta support!');
      }
      return thunkApi.rejectWithValue('Kunde inte hämta sysslan, vänligen kontakta support!');
    }
  },
);

export const setChoreName = createAsyncThunk<string, string, { rejectValue: string }>(
  'user/setchorename',
  async (name, thunkApi) => {
    try {
      return name;
    } catch (error) {
      console.error(error);
    }
    return thunkApi.rejectWithValue('Det gick inte att ändra sysslans namn just nu.');
  },
);
export const setChoreDescription = createAsyncThunk<string, string, { rejectValue: string }>(
  'user/setchoredescription',
  async (description, thunkApi) => {
    try {
      return description;
    } catch (error) {
      console.error(error);
    }
    return thunkApi.rejectWithValue('Det gick inte att ändra sysslans beskrivning just nu.');
  },
);
export const setChoreDemanding = createAsyncThunk<number, number, { rejectValue: string }>(
  'user/setchoredemanding',
  async (demanding, thunkApi) => {
    try {
      return demanding;
    } catch (error) {
      console.error(error);
    }
    return thunkApi.rejectWithValue('Det gick inte att ändra sysslans energinivå just nu.');
  },
);
export const setChoreFrequency = createAsyncThunk<number, number, { rejectValue: string }>(
  'user/setchorefrequency',
  async (frequency, thunkApi) => {
    try {
      return frequency;
    } catch (error) {
      console.error(error);
    }
    return thunkApi.rejectWithValue(
      'Det gick inte att ändra hur ofta sysslan ska göras för tillfället.',
    );
  },
);

const choreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //addChore
    builder.addCase(addChoreToDb.pending, (state) => {
      state.isLoading = true;
      console.log('addChoreToDb pending');
    });
    builder.addCase(addChoreToDb.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chores.push(action.payload);
      console.log('addChoreToDb fulfilled');
    });
    builder.addCase(addChoreToDb.rejected, (state, action) => {
      state.error = action.payload || '';
      state.isLoading = false;
      console.log('addChoreToDb rejected');
    });
    //
    //getChores
    builder.addCase(getChores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chores = action.payload;
    });
    builder.addCase(getChores.rejected, (state, action) => {
      state.error = action.payload || '';
      state.isLoading = false;
    });

    //editChore
    builder.addCase(editChore.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editChore.fulfilled, (state, action) => {
      const index = state.chores.findIndex((c) => c.id == action.payload.id);
      state.chores.splice(index, 1, action.payload);
      state.isLoading = false;
    });
    builder.addCase(editChore.rejected, (state, action) => {
      state.error = action.payload || '';
      state.isLoading = false;
    });

    //setChoreName
    builder.addCase(setChoreName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleChore.name = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setChoreName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Unknown error';
      console.log('rejected');
    });

    //setChoreDescription
    builder.addCase(setChoreDescription.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreDescription.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleChore.description = action.payload;
      console.log('fulfilled');
    });

    //setChoreDemanding
    builder.addCase(setChoreDemanding.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreDemanding.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleChore.demanding = action.payload;
      console.log('fulfilled');
    });

    //setChoreFrequency
    builder.addCase(setChoreFrequency.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setChoreFrequency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleChore.frequency = action.payload;
      console.log('fulfilled');
    });

    // getASingleChore
    builder.addCase(getASingleChore.pending, (state) => {
      state.isLoading = true;
      console.log('getASingleChore: pending');
    });
    builder.addCase(getASingleChore.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleChore = action.payload;
      console.log('getASingleChore: fulfilled');
    });
    builder.addCase(getASingleChore.rejected, (state, action) => {
      state.error = action.payload || '';
      state.isLoading = false;
    });
  },
});

export const choreReducer = choreSlice.reducer;
