import { collection, getDocs, query, where } from '@firebase/firestore';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  'user/setprofilename',
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

// export const addNewProfile = createAsyncThunk<Profile,{avatar: string, householdId: string, id: string, name: string, role: Role ,userId: string}, {rejectValue: string}>(
//     'profile/addnewprofile',
//     async({avatar, householdId, id, name, role, userId}, thunkApi) => {
//       try{
//         const userId = useAppSelector((state) => state.user.user?.id);
//         const q = query(collection(db,'Profile'));
//         const querySnapshot = await getDocs(q);
//         const profiles = querySnapshot.docs.map((doc) => doc.data() as Profile);
//         const userExists = profiles.find(userId => userId === userId);
//         if(userExists){
//             const houseExists = profiles.find(householdId => householdId === householdId);
//             if(houseExists){
//               return thunkApi.rejectWithValue('User already exists in this household');
//             }
//         }
//         return
//         // const w = query(collection(db,'Profile'), where('householdId', '==', householdId));
//       }catch(error){
//         return thunkApi.rejectWithValue(error.message);
//       }
//     })

// export const addProfileToHousehold = createAsyncThunk<Profile, Profile>(
//   'profile/addprofile',
//   async (profile, thunkApi) => {

// )

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    builder.addCase(getCurrentAmountOfProfiles.pending, (state) => {
      state.isLoading = true;
      console.log('pending');
    });
    builder.addCase(getCurrentAmountOfProfiles.fulfilled, (state) => {
      state.isLoading = false;
      console.log('pending');
    });
    builder.addCase(getCurrentAmountOfProfiles.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Failed');
    });
  },
});

// builder.addCase(addNewProfile.pending, (state) => {
//   state.isLoading = true;
//   console.log('pending');
// });
// builder.addCase(addNewProfile.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.profiles.push = action.payload;
//   console.log('fulfilled');
// });
// builder.addCase(addNewProfile.rejected, (state, action) => {
//   state.isLoading = false;
//   console.log('rejected');
// });

export const profileReducer = profileSlice.reducer;
