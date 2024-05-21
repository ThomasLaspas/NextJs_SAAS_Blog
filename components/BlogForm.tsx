"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";

import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import {
  BlogFormSchema,
  BlogFormSchemaType,
} from "../lib/admin/createblogShema";
import { useState } from "react";

import { Button } from "./ui/button";
import { createBlog } from "@/lib/admin/apis";
import { createBrowserClient } from "@supabase/ssr";
import { Preview } from "./Preview";
function BlogForm() {
  const [isprem, setprem] = useState<boolean>(false);
  const [ispublish, setpub] = useState<boolean>(false);
  const { toast } = useToast();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image_url: "",
      is_premium: isprem,
      is_published: ispublish,
    },
  });
  const handleSubmit = async (values: z.infer<typeof BlogFormSchema>) => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];

    // Check if a file is selected
    if (!file) {
      return toast({
        variant: "destructive",
        title: "Something goes wrong with agaiyour file n.",
        description: `Chech if you add an image for the blog.`,
      });
    }
    const filename = values.image_url.split("\\").pop();

    const filePath = `saasblog/${filename}`;

    const { data, error } = await supabase.storage
      .from("Blog")
      .upload(filePath, file);
    if (error) {
      console.log("false");
      return;
    } else {
      const { data, error } = await supabase.storage
        .from("Blog")
        .createSignedUrl(`saasblog/${filename}`, 60 * 60);
      if (error) {
        return toast({
          variant: "destructive",
          title: "Something goes wrong when your image upload on database. ",
          description: `Maybe you elready upload these image.`,
        });
      } else {
        const dt = {
          content: values.content,
          title: values.title,
          image_url: data.signedUrl,
          is_premium: values.is_premium,
          is_published: values.is_published,
        };
        createBlog(dt);
        return toast({
          variant: "default",
          title: "Your blog created succesfullt. ",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4  border border-primary p-4"
      >
        <div className="flex justify-between pb-2  border-b border-primary">
          <section className="flex sm:flex-row flex-col items-center sm:gap-[20%] gap-6 sm:px-[2%] ">
            <FormField
              control={form.control}
              name="is_premium"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center gap-4 sm:text-md text-sm">
                    <FormLabel className="flex items-center gap-1 sm:text-md text-sm">
                      <StarIcon /> Premium
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={isprem}
                        onCheckedChange={() => {
                          setprem((prev) => !prev);
                          form.setValue("is_premium", !isprem);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center gap-4 sm:text-md text-sm">
                    <FormLabel className="flex items-center gap-1 sm:text-md text-sm">
                      <RocketIcon /> Publish
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={() => {
                          setpub((prev) => !prev);
                          form.setValue("is_published", !ispublish);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </section>
          <div className="flex items-center sm:gap-9 sm:px-9">
            <Preview title={form.watch("title")} con={form.watch("content")} />
            <Button
              type="submit"
              variant="link"
              className="sm:text-2xl text-lg flex items-center gap-4 sm:px-[2%] px-[1%]"
            >
              Save <BsSave />
            </Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Blog title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image"
                    type="file"
                    accept="image/*"
                    {...field}
                    //onChange={(e) => setimag(e.target.files.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your blog content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}

export default BlogForm;
