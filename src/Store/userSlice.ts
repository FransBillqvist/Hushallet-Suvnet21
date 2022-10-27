import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../Config/firebase';
import { User } from '../Data/user';

interface UserState {
  user: User;
  isLoading: boolean;
  errorMsg: string;
}

const initialState: UserState = {
  user: { uid: '', email: '' },
  isLoading: false,
  errorMsg: '',
};

export const registerUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('user/registeruser', async ({ email, password }, thunkApi) => {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential.user.toJSON() as User;
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      alert('Fel i databasen, möjligtvis så används den angivna e-posten redan.');
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue('Det gick tyvärr inte att registrera denna användaren');
  }
});

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async ({ email, password }, thunkApi) => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential.user.toJSON() as User;
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      alert('Fel användarnamn/lösenord');
      return thunkApi.rejectWithValue('Fel användarnamn eller lösenord');
    }
    return thunkApi.rejectWithValue('Det gick tyvärr inte att logga in');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.errorMsg = 'Något gick fel';
      state.isLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = { uid: action.payload.uid, email: action.payload.email };
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.errorMsg = 'Mail och eller lösenordet är fel';
      state.isLoading = false;
    });
  },
});

export const userReducer = userSlice.reducer;
