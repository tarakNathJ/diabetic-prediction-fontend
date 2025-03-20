import React, { useEffect, useState } from 'react';
import { Edit2 } from 'lucide-react';
import { useSelector } from 'react-redux';



export default function EditableName() {
  // const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string | null>('John Doe');
  const UserData = useSelector((state: any) => state.ProfileData)
  useEffect(() => {
    setName(UserData.data.userName);
  }, [UserData.data.userName]);
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-3xl font-bold text-white">
        {`Hi ${name}` }<span className="wave">👋</span>
      </h1>
    </div>
  );
}