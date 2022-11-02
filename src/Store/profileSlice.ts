import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { db } from '../Config/firebase';
import { Profile } from '../Data/profile';
import { addAllHouseholdsFromProfile } from './householdSlice';

interface ProfileState {
  profiles: Profile[];
  isLoading: boolean;
  error: string;
  currentProfile: Profile;
}

const initialState: ProfileState = {
  profiles: [],
  isLoading: false,
  error: '',
  currentProfile: { id: '', userId: '', name: '', avatar: '', role: 'member', householdId: '' },
};

export const profileAlreadyInHousehold = createAsyncThunk<
  boolean,
  string[],
  { rejectValue: string }
>('profile/profileinhousehold', async (input, thunkApi) => {
  try {
    const q = query(collection(db, 'Profile'), where('householdId', '==', input[1]));
    const querySnapshot = await getDocs(q);
    const profiles = querySnapshot.docs.map((doc) => doc.data() as Profile);
    const profile = profiles.find((profile) => profile.userId === input[0]);

    if (profile) return true;
    else {
      return false;
    }
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      console.log(error.message);
      return thunkApi.rejectWithValue('Databasfel, kunde inte lägga till sysslan.');
    }
    return thunkApi.rejectWithValue('Kunde inte lägga till sysslan, vänligen kontakta support!');
  }
});

export const getCurrentAmountOfProfiles = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('profile/getcurrentamountofprofiles', async (householdId, thunkApi) => {
  try {
    const q = query(collection(db, 'Profile'), where('householdId', '==', householdId));
    const querySnapshot = await getDocs(q);
    const profiles = querySnapshot.docs.map((doc) => doc.data() as Profile);
    const amountOfProfiles = profiles.length;
    if (amountOfProfiles >= 8) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    if (error instanceof FirebaseError) {
      console.log(error.message);
      return thunkApi.rejectWithValue('Databasfel, kunde inte hämta profiler.');
    }
    return thunkApi.rejectWithValue('Databasfel, kunde inte hämta profiler!');
  }
});

export const getProfilesForHousehold = createAsyncThunk<Profile[], string, { rejectValue: string }>(
  'profile/getprofilesforhousehold',
  async (householdid, thunkApi) => {
    try {
      const profilesInDB: Profile[] = [];

      const q = query(collection(db, 'Profile'), where('householdId', '==', householdid));
      const querySnapshot = await getDocs(q);
      profilesInDB.push(...querySnapshot.docs.map((doc) => doc.data() as Profile));

      return profilesInDB;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        console.log(error.message);
        return thunkApi.rejectWithValue('Problem med databasen, kunde inte hämta profiler.');
      }
      return thunkApi.rejectWithValue('Databasfel, kunde inte hämta profiler!');
    }
  },
);

export const addNewProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>(
  'profile/addnewprofile',
  async (profile, thunkApi) => {
    try {
      await addDoc(collection(db, 'Profile'), {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        householdId: profile.householdId,
        role: profile.role,
        userId: profile.userId,
      });
      return profile;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        console.log(error.message);
        return thunkApi.rejectWithValue('Databasfel, kunde inte skapa en ny profil just nu.');
      }
      return thunkApi.rejectWithValue('Något gick snett, vänligen kontakta support!');
    }
  },
);

export const getProfilesByUserId = createAsyncThunk<Profile[], string, { rejectValue: string }>(
  'profile/getprofilesbyuserid',
  async (userId, thunkApi) => {
    try {
      const profilesInAccount: Profile[] = [];
      const q = query(collection(db, 'Profile'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      profilesInAccount.push(...querySnapshot.docs.map((doc) => doc.data() as Profile));
      thunkApi.dispatch(addAllHouseholdsFromProfile(profilesInAccount));
      return profilesInAccount;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        console.log(error.message);
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Databasfel, du har inget konto!');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    flushCurrentProfile: (state) => {
      state.currentProfile = initialState.currentProfile;
    },
    flushProfileList: (state) => {
      state.profiles = [];
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    //profileAlreadyInHousehold
    builder.addCase(profileAlreadyInHousehold.pending, (state) => {
      state.isLoading = true;
      console.log('profileAlreadyInHousehold pending');
    });
    builder.addCase(profileAlreadyInHousehold.fulfilled, (state) => {
      state.isLoading = false;
      console.log('profileAlreadyInHousehold fulfilled');
    });
    builder.addCase(profileAlreadyInHousehold.rejected, (state) => {
      state.isLoading = false;
      console.log('profileAlreadyInHousehold rejected');
    });

    //getCurrentAmountOfProfiles
    builder.addCase(getCurrentAmountOfProfiles.pending, (state) => {
      state.isLoading = true;
      console.log('getCurrentAmountOfProfiles pending');
    });
    builder.addCase(getCurrentAmountOfProfiles.fulfilled, (state) => {
      state.isLoading = false;
      console.log('getCurrentAmountOfProfiles pending');
    });
    builder.addCase(getCurrentAmountOfProfiles.rejected, (state) => {
      state.isLoading = false;
      console.log('getCurrentAmountOfProfiles Failed');
    });

    //getProfilesForHousehold
    builder.addCase(getProfilesForHousehold.pending, (state) => {
      state.isLoading = true;
      console.log('getProfilesForHousehold pending');
    });
    builder.addCase(getProfilesForHousehold.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profiles = action.payload;
      console.log('getProfilesForHousehold fulfilled');
    });
    builder.addCase(getProfilesForHousehold.rejected, (state) => {
      state.isLoading = false;
      console.log('getProfilesForHousehold rejected');
    });

    //addNewProfile
    builder.addCase(addNewProfile.pending, (state) => {
      state.isLoading = true;
      console.log('addNewProfile pending');
    });
    builder.addCase(addNewProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProfile = action.payload;
      state.profiles.push(action.payload);
      console.log('addNewProfile fulfilled');
    });
    builder.addCase(addNewProfile.rejected, (state) => {
      state.isLoading = false;
      console.log('AddNewProfile rejected');
    });

    //getProfilesByUserId
    builder.addCase(getProfilesByUserId.pending, (state) => {
      state.isLoading = true;
      console.log('getProfilesByUserId pending');
    });
    builder.addCase(getProfilesByUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profiles.push(...action.payload);
      state.profiles = state.profiles.filter(
        (value, index, self) => index === self.findIndex((pro) => pro.id === value.id),
      ); // Removes duplicates, es6 magic
      console.log('getProfilesByUserId fulfilled');
    });
    builder.addCase(getProfilesByUserId.rejected, (state) => {
      state.isLoading = false;
      console.log('getProfilesByUserId rejected');
    });
  },
});

export const { flushCurrentProfile, flushProfileList, setCurrentProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
