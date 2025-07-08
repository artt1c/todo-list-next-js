import React from 'react';
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul className='flex gap-4 underline'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='todo-list'>Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;