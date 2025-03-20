import {createSlice} from "@reduxjs/toolkit";


const UserPriviousResult = createSlice({
    name:"SignUpData",
    initialState:{
        data:[],
        
    },
    reducers:{
        AddUserAllResult(state,action){
            state.data = action.payload;
        },
        
        RemoveUserAllResult(state){
            state.data =[];  
          }
    }
})

export const {AddUserAllResult,RemoveUserAllResult}  = UserPriviousResult.actions;

export default UserPriviousResult.reducer;