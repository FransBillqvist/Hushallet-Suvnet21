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

export const setProfileName = createAsyncThunk<string, string>(
  'profile/setprofilename',
  async (name, thunkApi) => {
    return name;
  },
);

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
    return thunkApi.rejectWithValue('Ett fel inträffade!');
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
    return thunkApi.rejectWithValue('Ett fel inträffade!');
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
      return thunkApi.rejectWithValue('Ett fel inträffade!');
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
        return thunkApi.rejectWithValue(error.message);
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
      console.log(profilesInAccount);
      thunkApi.dispatch(addAllHouseholdsFromProfile(profilesInAccount));
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

export const getCurrentProfile = createAsyncThunk<Profile, Profile[], { rejectValue: string }>(
  'profile/getcurrentprofile',
  async (profiles, thunkApi) => {
    try {
      const profile = profiles.find((profile) => profile.userId === profiles[0].userId) as Profile;
      return profile;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Något gick snett, kontakta supporten!');
    }
  },
);

export const getProfilesByProfileId = createAsyncThunk<Profile, string, { rejectValue: string }>(
  'profile/getprofilesbyprofileid',
  async (profileId, thunkApi) => {
    try {
      const q = query(collection(db, 'Profile'), where('id', '==', profileId));
      const querySnapshot = await getDocs(q);
      const profile = querySnapshot.docs.map((doc) => doc.data() as Profile);
      console.log('Jag är på rad 156')
      const currentProfile = profile[0];
      console.log(currentProfile)
      return currentProfile;
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue('Något gick snett, kontakta supporten!');
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
  },
  extraReducers: (builder) => {
    //setProfileName
    builder.addCase(setProfileName.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(setProfileName.fulfilled, (state) => {
      state.isLoading = false;
      // state.profiles[index].name = action.payload;
      console.log('fulfilled');
    });
    builder.addCase(setProfileName.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected');
    });
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
      console.log('Rejected getProfilesByUserId');
    });

    //getCurrentProfile
    builder.addCase(getCurrentProfile.pending, (state) => {
      state.isLoading = true;
      console.log('getCurrentProfile pending');
    });
    builder.addCase(getCurrentProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProfile = action.payload;
      console.log('getCurrentProfile fulfilled');
    });
    builder.addCase(getCurrentProfile.rejected, (state) => {
      state.isLoading = false;
      console.log('rejected getCurrentProfile');
    });

    //getProfilesByProfileId
    builder.addCase(getProfilesByProfileId.pending, (state) => {
      state.isLoading = true;
      console.log('getProfilesByProfileId pending');
    });
    builder.addCase(getProfilesByProfileId.fulfilled, (state) => {
      state.isLoading = false;
      console.log('getProfilesByProfileId fulfilled');
    });
    builder.addCase(getProfilesByProfileId.rejected, (state) => {
      state.isLoading = false;
      console.log('getProfilesByProfileId rejected');
    });
  },
});

export const { flushCurrentProfile } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
