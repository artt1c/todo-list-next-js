import React from 'react';
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul className='flex gap-4 underline'>
        <li>
          <Link href='/'>Головна</Link>
        </li>
        <li>
          <Link href='todo-list'>Список завдань</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;