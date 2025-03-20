import React from 'react';
import { Container } from './ui/Container';
import ProfileHeader from './profile/ProfileHeader';
import ProfileInputs from './profile/ProfileInputs';
import HealthMetrics from './profile/HealthMetrics';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AddUserAllResult } from '../ReduxStore/UserPriviousResult';

export default function Profile() {
  const UserData = useSelector((state: any) => state.ProfileData)
  if (Object.keys(UserData.data).length == 0) {
    window.location.href = '/login';
  } else {
   API_Controller(UserData.data._id);
  }
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="space-y-6">
          <ProfileHeader />
          <ProfileInputs />
          <HealthMetrics />
        </div>
      </Container>
    </div>
  );
}

async function API_Controller (ID: string){
  const Dispatch = useDispatch();
  try {
    const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/AllResult`, {
      ID:ID
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    Dispatch(AddUserAllResult(Responce.data.data.FindUserProviousResult));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return
    }
    if (axios.isCancel(error)) {
      return
    }
  }

}