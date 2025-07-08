'use client'

import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {CirclePlus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useStore} from "@/store";
import {createTask} from "@/lib/firebase/firestore/createTask";

const formSchema = z.object({
  title: z.string().min(1, "title required"),
  description: z.string()
})

const AddTask = () => {

  const selectedTodoList = useStore(state => state.selectedTodoList);
  const addTaskZustand = useStore(state => state.addTask);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedTodoList) return;
    try {
      await createTask(selectedTodoList.id, values.title, values.description).then(addTaskZustand);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='h-6 w-fit'>
          ADD
          <CirclePlus/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-center'>Додайте завдання до списку</DialogTitle>
          <DialogDescription className='text-center text-sm text-gray-500'>
            Заповніть форму, щоб створити нове завдання.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6 mb-6">

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className='grid gap-3'>
                    <FormLabel>Назва завдання</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className='grid gap-3'>
                    <FormLabel>Опис Завдання (не обов&apos;язково)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='flex justify-center'>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;