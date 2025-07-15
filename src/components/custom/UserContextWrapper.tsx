import React, {FC} from 'react';
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";

type Props = {
  children: React.ReactNode;
}

const UserContextWrapper:FC<Props> = ({children}) => {

  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          className='text-destructive font-bold text-lg h-8'
          inset
          variant='destructive'
          onClick={() => {
            sessionStorage.clear()
            window.location.reload()
            console.log('click');
          }}
        >
          Logout
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default UserContextWrapper;