import {combineReducers,configureStore} from "@reduxjs/toolkit";
import UserSignUpSlice from './UserDetails'
import UserPrivusResult from './UserPriviousResult'

const CombineRedusers = combineReducers({
	ProfileData: UserSignUpSlice,
	Resullt:UserPrivusResult	
})

export const store = configureStore({
	reducer: CombineRedusers,
})