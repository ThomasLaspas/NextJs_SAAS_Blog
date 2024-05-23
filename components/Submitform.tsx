"use client";
import * as z from "zod";

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

const formSchema = z.object({
    email: z.string().email(),
    pass: z.string().min(6),
    passconf: z.string(),
})
    .refine(
        (data) => {
            return data.pass === data.passconf;
        },
        {
            message: "Passwords do not match",
            path: ["passwordConfirm"],
        }
    );
interface Props {
    sign: boolean;
    change: () => void;
}
function Submitform({ sign, change }: Props) {
    const [load2, setload2] = useState<boolean>(false);
    const { toast } = useToast();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            pass: "",
            passconf: "",
        },
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        if (values.pass === values.passconf) {
            setload2(true);
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.pass,
            });
            if (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your details try again.",
                });
                setload2(false);
                return;
            }

            toast({
                variant: "default",
                title: "You create o profile succefully.",
                description: `Check your verification email that we sent to ${values.email}.`,
            });
            setload2(false);
            return;
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-4 "
            >
                <FormField
                    control={form.control}
                    name="email"
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
                    control={form.control}
                    name="pass"
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
                <FormField
                    control={form.control}
                    name="passconf"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Password confirm</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Password confirm"
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
                    SignUp{" "}
                    <AiOutlineLoading3Quarters
                        className={load2 ? "animate-spin" : "hidden"}
                    />
                </Button>
            </form>
            <div className="flex items-center space-x-2 mt-4">
                <Switch id="airplane-mode" onClick={change} checked={!sign} />
                <Label htmlFor="airplane-mode">{sign ? "SignUp" : "SingIn"}</Label>
            </div>
        </Form>
    )
}

export default Submitform