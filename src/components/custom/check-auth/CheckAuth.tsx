'use client'

import React, {FC, ReactNode, useEffect} from 'react';
import {useStore} from "@/store";
import {usePathname, useRouter} from "next/navigation";

type Props = {
  children: ReactNode;
}

const CheckAuth:FC<Props> = ({children}) => {

  const isAuth = useStore(state => state.isAuth)();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(()=> {
    if (!isAuth && !(pathname === '/auth/login' || pathname === '/auth/register')) {
      router.push('/auth/login');
    }
  }, [isAuth, pathname, router])

  return (
    <>
      {children}
    </>
  );
};

export default CheckAuth;