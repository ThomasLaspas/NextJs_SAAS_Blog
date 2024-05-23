"use client";
import * as z from "zod";
import Submitform from "../Submitform";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@supabase/ssr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GitHubLoginButton from "../Githhublogin";
import Goggleloginbutton from "../Googlelogin";


const formSchema2 = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6),
});


export default function Loginform() {
  const [load, setload] = useState<boolean>(false);

  const { toast } = useToast();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [sign, setsign] = useState<boolean>(true);

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });


  const handleSubmit2 = async (values: z.infer<typeof formSchema2>) => {
    setload(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.emailAddress,
      password: values.password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your details try again.",
      });
      setload(false);
      return;
    }
    setload(false);
    return (window.location.href = "/");
  };
  const change = () => {
    setsign((prev) => !prev);
  };

  return (
    <main className="flex h-min flex-col items-center justify-between sm:p-24  p-8 w-full border border-primary border-3 rounded-2xl">
      {sign ? (
        <Form {...form2}>
          <form
            onSubmit={form2.handleSubmit(handleSubmit2)}
            className="w-full flex flex-col gap-4 "
          >
            <FormField
              control={form2.control}
              name="emailAddress"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form2.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full flex items-center gap-6">
              SignIn{" "}
              <AiOutlineLoading3Quarters
                className={load ? "animate-spin" : "hidden"}
              />
            </Button>
          </form>
          <GitHubLoginButton />
          <Goggleloginbutton />
          <div className="flex items-center space-x-2 mt-4">
            <Switch id="airplane-mode" onClick={change} checked={!sign} />
            <Label htmlFor="airplane-mode">{sign ? "SignUp" : "SignIn"}</Label>
          </div>
        </Form>
      ) : (
        <Submitform sign={sign} change={change} />
      )}
    </main>
  );
}
