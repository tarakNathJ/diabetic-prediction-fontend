import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useRiskStore } from './riskStore';

interface ProfileState {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  glucoseLevel: number;
  isUpdatingFromRisk: boolean;
  updateProfile: (data: Partial<Omit<ProfileState, 'isUpdatingFromRisk' | 'updateProfile'>>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      age: 25,
      gender: 'male',
      height: 170,
      weight: 70,
      glucoseLevel: 95,
      isUpdatingFromRisk: false,
      updateProfile: (data) => {
        if (get().isUpdatingFromRisk) {
          set({ isUpdatingFromRisk: false, ...data });
          return;
        }

        set((state) => {
          const newState = { ...state, ...data };
          // After updating the profile, sync with risk store
          if (data.glucoseLevel !== undefined) {
            const riskStore = useRiskStore.getState();
            riskStore.setBloodLevel('glucose', data.glucoseLevel, true);
            // Also update HbA1c based on new glucose level
            const hba1c = riskStore.calculateHbA1c(data.glucoseLevel);
            riskStore.setBloodLevel('hba1c', hba1c, true);
          }
          return newState;
        });
      },
    }),
    {
      name: 'profile-storage',
      partialize: (state) => {
        const { isUpdatingFromRisk, ...rest } = state;
        return rest;
      },
    }
  )
);