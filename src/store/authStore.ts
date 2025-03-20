import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'universal-cookie';




const cookies = new Cookies();


interface CookieOptions { // Import or define CookieSetOptions if you are using a specific version with stricter types
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none' | true | false;
  partitioned?: boolean;
  [key: string]: any; // Allow other options if needed
}

interface YourDataType { // Define the structure of your cookie data
  userId: string;
  userName: string;
  // ... other properties based on your actual data structure
}



interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {

        try {
          // Simulate API call
          const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/logIn`, {
            email: email,
            password: password

          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          const accessToken: YourDataType | any = Responce.data.data.accessToken;
          const refressToken: YourDataType | any = Responce.data.data.refreshToken;
          cookies.set('accessToken', accessToken);
          cookies.set('refreshToken', refressToken);
          return Responce.data.data.user
        
        } catch (error) {
          if(axios.isAxiosError(error)){
            console.log(error);
          }
        }
      },

      signup: async (email: string, password: string, name: string) => {
        try {
          const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/signUp`, {
            userName:name,
            email:email,
            password:password
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        
        } catch (error) {
          if(axios.isAxiosError(error)){
            console.log(error);
          }
        }
      },

      logout: async() => {
        try {
          const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/logOut`, {
         
          }, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        
        } catch (error) {
          if(axios.isAxiosError(error)){
            console.log(error);
          }
        }
      },

      updateProfile: async (data: Partial<User>) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);