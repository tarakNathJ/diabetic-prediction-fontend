import React from 'react';
import EditableName from './EditableName';
import ProfileMenu from './ProfileMenu';
import { useSelector } from 'react-redux';


export default function ProfileHeader() {
   const UserData = useSelector((state: any) => state.ProfileData)
  return (
    <div className="flex justify-between items-center mb-8 ">
      <EditableName />
      <div className={`relative group z-50 ${(Object.keys(UserData.data).length != 0)?"hidden":""}`}>
        <button className="px-4 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600/30 transition-colors text-purple-400 hover:text-purple-300">
          Account
        </button>
        <ProfileMenu />
      </div>
    </div>
  );
}