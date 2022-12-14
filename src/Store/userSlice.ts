import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../Config/firebase';
import { removeUserFromStorage } from '../Data/AsyncStorage/userStorage';
import { User } from '../Data/user';

interface UserState {
  user: User;
  isLoading: boolean;
  errorMsg: string;
}

const initialState: UserState = {
  user: {
    uid: '',
    email: '',
  },
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
    return userCredential.user.toJSON() as User;
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      console.log(error.message);
      return thunkApi.rejectWithValue('Kunde inte registrera användaren.');
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
    return userCredential.user.toJSON() as User;
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      console.log(error.message);
      return thunkApi.rejectWithValue('Fel användarnamn eller lösenord');
    }
    return thunkApi.rejectWithValue('Det gick tyvärr inte att logga in');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.user.uid = action.payload;
    },

    logout: (state) => {
      state.user = { uid: '', email: '' };
      removeUserFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      const jsonUser = JSON.stringify(state.user);
      AsyncStorage.setItem('user', jsonUser);

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
      state.errorMsg = 'Email eller lösenord är fel';
      state.isLoading = false;
    });
  },
});

export const { setUserState, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
