import {createSlice} from "@reduxjs/toolkit";
import {LoadState ,StoreData ,RemoveData} from './SessionStorage';
const SessionKey = "SignUpdata"


const UserSignUpSlice = createSlice({
    name:"SignUpData",
    initialState:{
        data:LoadState(SessionKey,[]),
        
    },
    reducers:{
        UserDetails(state,action){
            state.data = action.payload;
			StoreData(SessionKey,state.data);

        },
        RemoveUserDetails(state){
            state.data =[];
			RemoveData(SessionKey)
        }
    }
})

export const {UserDetails,RemoveUserDetails}  = UserSignUpSlice.actions;

export default UserSignUpSlice.reducer;