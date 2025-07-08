'use client'

import React, {FC} from 'react';
import {IUser} from "@/models/IUser";

type Props = {
  user: IUser
}

const User:FC<Props> = ({user}) => {

  return (
    <div className='flex items-center border-2 rounded-4xl px-3 py-1'>
      <div className='rounded-full bg-gray-500 size-8 mr-2'></div>
      <p>{user.displayName}</p>
    </div>
  );
};

export default User;