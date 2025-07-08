import React, {FC} from 'react';
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";

type Props = {
  children: React.ReactNode;
}

const ContextMenuWrapper:FC<Props> = ({children}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem
          inset
          onSelect={() => {
            console.log('change')
          }}
        >
          change
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuWrapper;