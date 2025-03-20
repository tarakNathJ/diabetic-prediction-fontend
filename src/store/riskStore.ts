import { create } from 'zustand';
import { useProfileStore } from './profileStore';
import axios from 'axios';

interface RiskState {
  age: number;
  hypertension: boolean | null;
  heartDisease: boolean | null;
  bmi: number;
  hba1c: number;
  glucose: number;
  risk: number;
  showResult: boolean;
  userId: string;
  XgBoost:string;
  Randomforest:string;
  modelName:string;

  setAge: (age: number) => void;
  setBMI: (bmi: number) => void;
  setBinaryValue: (key: 'hypertension' | 'heartDisease', value: boolean) => void;
  setBloodLevel: (key: 'hba1c' | 'glucose', value: number, fromProfile?: boolean) => void;
  calculateHbA1c: (glucose: number) => number;
  calculateRisk: () => void;
  resetAssessment: () => void;
  setUserId: (userId: string) => void;
  setModelName: (modelName: string) => void;

}

export const useRiskStore = create<RiskState>((set, get) => ({
  age: 25,
  hypertension: null,
  heartDisease: null,
  bmi: 24.5,
  hba1c: 5.7,
  glucose: 95,
  risk: 0,
  showResult: false,
  userId: "empty",
  XgBoost:"Not Diabetic",
  Randomforest:"Not Diabetic",
  modelName:"GEMINI_MODEL",



  setAge: (age) => set({ age }),
  setBMI: (bmi) => set({ bmi }),
  setBinaryValue: (key, value) => set({ [key]: value }),
  setUserId: (userId) => set({ userId }),
  setModelName: (modelName) => set({ modelName }),

  setBloodLevel: (key, value, fromProfile = false) => {
    if (key === 'glucose') {
      // Calculate HbA1c when glucose is updated
      const hba1c = get().calculateHbA1c(value);
      set({ glucose: value, hba1c });

      // Sync with profile store if not from profile
      if (!fromProfile) {
        const profileStore = useProfileStore.getState();
        profileStore.isUpdatingFromRisk = true;
        profileStore.updateProfile({ glucoseLevel: value });
      }
    } else {
      set({ [key]: value });
    }
  },

  calculateHbA1c: (glucose: number) => {
    // Formula: HbA1c = (Average Glucose + 46.7) / 28.7
    const hba1c = (glucose + 46.7) / 28.7;
    // Round to 1 decimal place and clamp between 4 and 12
    return Math.min(Math.max(Math.round(hba1c * 10) / 10, 4), 12);
  },

  calculateRisk: async() => {
    
    const state = get();
    const Route = state.modelName == "CUSTOM_AI_MODEL" ? "predict" : "Predict_With_Gemini";
   
   
    try {
      const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/${Route}`, {
        ID:state.userId,
        age:state.age,
        hypertension:state.hypertension == true? "yes" :"no",
        heart_disease:state.heartDisease == true? "yes" :"no",
        bmi:state.bmi,
        HbA1c_level:state.hba1c,
        blood_glucose_level:state.glucose
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });      
      
     
      set({ XgBoost:Responce.data.data.StoreUserResult.XgBoost ,Randomforest:Responce.data.data.StoreUserResult.Randomforest , showResult: true });
    } catch (error) {
     
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }

    
  },

  resetAssessment: () => set({ showResult: false }),
}));
