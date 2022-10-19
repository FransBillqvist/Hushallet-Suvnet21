import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../Config/firebase';
import { User } from '../Data/user';

// type User = Omit<FirebaseUser, "toJSON" | "delete" | "reload" | "getIdTokenResult" | "getIdToken">;

interface UserState {
  user: User | undefined;
  isLoading: boolean;
  errorMsg: string;
}

const initialState: UserState = {
  user: undefined,
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
      return thunkApi.rejectWithValue(error.message);
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
      state.errorMsg = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      // Om det är ett firebase fel se till att spara en användarvänlig text
      state.errorMsg = action.payload || '';
      state.isLoading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.errorMsg = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      // Om det är ett firebase fel se till att spara en användarvänlig text
      state.errorMsg = action.payload || '';
      state.isLoading = false;
    });
  },
});

export const userReducer = userSlice.reducer;
