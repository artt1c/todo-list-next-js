'use client'

import React from 'react';
import Nav from "@/components/ui/Nav";
import Auth from "@/components/ui/Auth";
import {useStore} from "@/store";
import User from "@/components/ui/User";

const Header = () => {

  const user = useStore(state => state.user);

  return (
    <header className='h-[7vh] border-b-3 flex items-center justify-between px-[5vw]'>
      <div className={'flex gap-10'}>
        <h2>Task Manager</h2>
        <Nav/>
      </div>
      {user ? (<User user={user}/>) : (<Auth/>)}

    </header>
  );
};

export default Header;