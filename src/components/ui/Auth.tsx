import React from 'react';
import Link from "next/link";

const Auth = () => {
  return (
    <div className='flex border-2 rounded-2xl'>
      <Link className='px-4 py-2 rounded-2xl' href='/auth/registration'>Sign-up</Link>
      <Link className='px-4 py-2 rounded-2xl bg-foreground text-background' href='/auth/login'>Sign-in</Link>
    </div>
  );
};

export default Auth;