'use client'

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registrationUser} from "@/lib/auth/registrationUser";
import {useRouter} from "next/navigation";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email("email required"),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  })
})

export function RegistrationForm({className, ...props}: React.ComponentProps<"div">) {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await registrationUser(values)
    router.push("/")
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">

                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Створіть обліковий запис</h1>
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Ім&apos;я користувача</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Пошта</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <div className="flex items-center">
                        <FormLabel>Пароль</FormLabel>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="qwerty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Продовжити</Button>



              </div>

              <div className="mt-4 text-center text-sm">
                Have account?
                <a href="/auth/login" className="ml-1.5 underline underline-offset-4">
                  Sign in
                </a>
              </div>

            </form>
          </Form>

        </CardContent>
      </Card>
    </div>
  )
}