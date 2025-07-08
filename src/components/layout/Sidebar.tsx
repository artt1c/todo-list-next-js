import React from 'react';
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className='min-w-[10vw] border-r-2 h-full p-2'>
      <ul className='flex flex-col gap-2'>
        <li>
          <Link
            href='/todo-list'
            className='rounded-2xl px-2 py-1 hover:bg-blue-500 hover:text-white'
          >
            Мої Списки
          </Link>
        </li>
        <li>
          <Link
            href='/todo-list'
            className='rounded-2xl px-2 py-1 hover:bg-blue-500 hover:text-white'
          >
            Доступні мені Списки
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;