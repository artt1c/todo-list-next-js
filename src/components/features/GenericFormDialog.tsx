'use client'

import React, {FC, useState} from 'react';
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
import {getFormSchema} from "@/validators/dynamic.validator";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {IFormData} from "@/models/IFormData";

type Props = {
  title: string;
  description: string
  hasDescription: boolean;
  initialValues?: IFormData;
  handlerSubmit: (data: IFormData) => void;
  children?: React.ReactNode;
}

const GenericFormDialog:FC<Props> = ({hasDescription, initialValues, handlerSubmit, children, description, title}) => {

  const [isOpen, setIsOpen] = useState(false);

  const formSchema = getFormSchema(hasDescription);

  const form = useForm<IFormData>({
    resolver: joiResolver(formSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? ''
    }
  });

  const onSubmit = (data: IFormData) => {
    if (!hasDescription) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { description:_description, ...rest } = data;
      handlerSubmit(rest as IFormData);
    } else {
      handlerSubmit(data);
    }
    form.reset();
    setIsOpen(false);
    toast.success('Операція успішна')
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit h-fit !p-0">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6 mb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Назва</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {hasDescription && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Опис</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <DialogFooter className="flex justify-center">
              <DialogClose asChild>
                <Button variant="outline">Скасувати</Button>
              </DialogClose>
              <Button type="submit">Зберегти</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default GenericFormDialog;
