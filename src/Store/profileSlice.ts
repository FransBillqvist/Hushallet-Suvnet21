import { addDoc, collection, getDocs, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { db } from '../Config/firebase';
import { Profile } from '../Data/profile';

interface ProfileState {
  profiles: Profile[];
  isLoading: boolean;
  error: string;
}

const initialState: ProfileState = {
  profiles: [],
  isLoading: false,
  error: '',
};

export const setProfileName = createAsyncThunk<string, string>(
  'profile/setprofilename',
  async (name, thunkApi) => {
    return name;
  },
);

export const profileAlreadyInHousehold = createAsyncThunk<boolean, string[]>(
  'profile/profileinhousehold',
  async (input, thunkApi) => {
    try {
      const q = query(collection(db, 'Profile'), where('householdId', '==', input[1]));
      const querySnapshot = await getDocs(q);
      const profiles = querySnapshot.docs.map((doc) => doc.data() as Profile);
      const profile = profiles.find((profile) => profile.userId === input[0]);
      if (profile) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getCurrentAmountOfProfiles = createAsyncThunk<boolean, string>(
  'profile/getcurrentamountofprofiles',
  async (householdId, thunkApi) => {
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
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getProfilesForHousehold = createAsyncThunk<Profile[], string>(
  'profile/getprofilesforhousehold',
  async (householdid, thunkApi) => {
    try {
      const profilesInDB: Profile[] = [];

      const q = query(collection(db, 'Profile'), where('householdId', '==', householdid));
      const querySnapshot = await getDocs(q);
      profilesInDB.push(...querySnapshot.docs.map((doc) => doc.data() as Profile));

      return profilesInDB;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const addNewProfile = createAsyncThunk<Profile, Profile, { rejectValue: string }>(
  'profile/addnewprofile',
  async (Profile, thunkApi) => {
    // const q = query(collection(db, 'Profile'));
    // const querySnapshot = await getDocs(q);
    // const profiles = querySnapshot.docs.map((doc) => doc.data() as Profile);
    // const userNameExists = profiles.find((name) => Profile.name === Profile.name);
    try {
      await addDoc(collection(db, 'Profile'), {
        id: Profile.id,
        name: Profile.name,
        avatar: Profile.avatar,
        householdId: Profile.householdId,
        role: Profile.role,
        userId: Profile.userId,
      });
      return Profile;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Databasfel, vänligen kontakta support!');
    }
  },
);

export const getProfilesByUserId = createAsyncThunk<Profile[], string>(
  'profile/getprofilesbyuserid',
  async (userId, thunkApi) => {
    try {
      const profilesInAccount: Profile[] = [];
      const q = query(collection(db, 'Profile'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      profilesInAccount.push(...querySnapshot.docs.map((doc) => doc.data() as Profile));
      console.log(typeof profilesInAccount);
      return profilesInAccount;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Databasfel, du har inget konto!');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //setProfileName
    builder.addCase(setProfileName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setProfileName.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.profiles[index].name = action.payload;
      console.log('fulfilled');
    });
    // builder.addCase(setProfileName.rejected, (state, action) => {
    //   state.isLoading = false;
    //   //   state.error = action.payload || 'Unknown error';
    //   console.log('rejected');
    // });
    //profileAlreadyInHousehold
    builder.addCase(profileAlreadyInHousehold.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(profileAlreadyInHousehold.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.profiles[index].name = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(profileAlreadyInHousehold.rejected, (state, action) => {
      state.isLoading = false;
      //   state.error = action.payload || 'Unknown error';
      console.log('rejected');
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
    builder.addCase(getCurrentAmountOfProfiles.rejected, (state, action) => {
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
      state.profiles.push(...action.payload);
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
    builder.addCase(addNewProfile.fulfilled, (state) => {
      state.isLoading = false;
      // state.profiles.push(action.payload);
      console.log('addNewProfile fulfilled');
    });
    builder.addCase(addNewProfile.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected! add new profile ');
    });

    //getProfilesByUserId
    builder.addCase(getProfilesByUserId.pending, (state) => {
      state.isLoading = true;
      console.log('getProfilesByUserId pending');
    });
    builder.addCase(getProfilesByUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profiles.push(...action.payload);
      console.log('getProfilesByUserId fulfilled');
    });
    builder.addCase(getProfilesByUserId.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected! getProfilesByUserId');
    });
  },
});

export const profileReducer = profileSlice.reducer;
