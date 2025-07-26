'use client'

import React, {FC, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusCircle, Trash, UserRoundCog} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ITodo} from "@/models/ITodo";
import {useStore} from "@/store";
import {ICollaborator} from "@/models/iCollaboartor";
import {deleteCollaborator} from "@/lib/firebase/firestore/deleteCollaborator";
import {updateCollaboratorRole} from "@/lib/firebase/firestore/updateCollaboratorRole";
import {toast} from "sonner";
import {getUidByEmail} from "@/lib/helpers/getUidByEmail";

type Props = {
  todoList: ITodo;
}

const Collaborators:FC<Props> = ({todoList}) => {

  const user= useStore(state => state.user);
  const addOrUpdateCollaborator = useStore(state => state.addOrUpdateCollaborator);
  const removeCollaborator= useStore(state => state.removeCollaborator);

  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [newCollaboratorRole, setNewCollaboratorRole] = useState<ICollaborator['role']>('viewer');

  const handleAddCollaborator = async () => {
    if (!newCollaboratorEmail || !newCollaboratorRole) {
      toast('Будь ласка, введіть email та оберіть роль.');
      return;
    }

    const collaborator = await getUidByEmail(newCollaboratorEmail);

    if (!collaborator?.uid) {
      toast('Не вдалося знайти користувача за вказаним email. Перевірте email або зареєструйте користувача.');
      return;
    }

    if (collaborator.uid === user?.uid) {
      toast('Ви не можете надати собі доступ повторно');
      return
    }

    const collaboratorObj: ICollaborator = { uid: collaborator.uid, email: collaborator.email, role: newCollaboratorRole };
    try {
      await updateCollaboratorRole(todoList.id, collaboratorObj.uid, collaboratorObj.email, collaboratorObj.role)
        .then(()=> {addOrUpdateCollaborator(todoList.id, collaboratorObj)});

      setNewCollaboratorEmail('');
      toast(`Користувачу ${newCollaboratorEmail} додано/оновлено права!`);
    } catch (error) {
      console.error('Помилка додавання/оновлення прав:', error);
      toast('Помилка додавання/оновлення прав.');
    }
  };

  const handleRemoveCollaborator = async (collaboratorUid: string) => {
    try {
      await deleteCollaborator(todoList.id, collaboratorUid);
      removeCollaborator(todoList.id, collaboratorUid);
      toast('Користувач більше немає доступу');
    } catch (error) {
      console.error('Помилка видалення колаборатора:', error);
      toast('Помилка видалення колаборатора.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="size-6">
          <UserRoundCog className="size-6 p-1"/>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className='text-center font-normal mb-2'>
            Надайте доступ до
            <i className='font-bold ml-1'>
              {todoList.title}
            </i>
          </DialogTitle>
          <DialogDescription className='text-center'>
            Додайте або видаліть користувачів, які можуть бачити та/або редагувати цей список.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-secondary p-4 rounded-2xl shadow-inner">
          <h3 className="text-md text-center font-semibold opacity-75 mb-2">Користувачі</h3>
          {todoList.collaborators.length === 0 ? (
            <p className="text-gray-500 text-center">Тут ще нікого немає</p>
          ) : (
            <ul>
              {todoList.collaborators.map((collab: ICollaborator) => (
                <li key={collab.uid} className="flex items-center justify-between border-b py-2">
                  <span>
                    {collab.email} ({collab.role})
                    {todoList.ownerId === collab.uid && " (Власник)"}
                  </span>
                  {todoList.ownerId !== collab.uid && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveCollaborator(collab.uid)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-4 py-4 items-center">

          <Label htmlFor="email" className="text-right w-fit">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={newCollaboratorEmail}
            onChange={(e) => setNewCollaboratorEmail(e.target.value)}
            className="col-span-2"
            placeholder="email@example.com"
          />

          <Select
            value={newCollaboratorRole}
            onValueChange={(value: ICollaborator['role']) => setNewCollaboratorRole(value)}
          >
            <SelectTrigger className="w-[100px] cursor-pointer">
              <SelectValue placeholder="Роль"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAddCollaborator} className='cursor-pointer'>
            <PlusCircle className="h-4 w-4"/>
          </Button>
        </div>

      </DialogContent>

    </Dialog>
  );
};

export default Collaborators;