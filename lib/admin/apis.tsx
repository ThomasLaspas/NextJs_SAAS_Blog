"use server";

import { createSupabaseServerClient } from "@/lib/supabase";

import { revalidatePath, unstable_noStore } from "next/cache";

import { BlogFormSchemaType } from "./createblogShema";

const DASHBOARD = "/dashboard/blog";

interface Blog {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
  is_premium: boolean;
  content: string;
  is_published: boolean;
}

export async function createBlog(dat: {
  content: string;
  title: string;
  image_url: string;
  is_premium: boolean;
  is_published: boolean;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("blog").insert(dat).select();
  if (error) {
    console.log(error);
  }
  return;
}
export async function Getusers() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "user")
    .order("created_at", { ascending: true });

  return data as {
    id: string;
    email: string;
    created_at: string;
    role: string;
    subscription_status: boolean;
    username: string;
    stripe_customer_id: string;
    stripe_subscription_id: string;
  }[];
}
export async function readBlog() {
  const supabase = await createSupabaseServerClient();
  return supabase
    .from("blog")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });
}

export async function readBlogAdmin() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = await createSupabaseServerClient();
  return supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: true });
}
export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
  } else {
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id);
    if (error) {
      console.log(error);
    }

    return profiles;
  }
}
export async function readBlogById(blogId: string) {
  const supabase = await createSupabaseServerClient();
  return supabase.from("blog").select("*").eq("id", blogId).single();
}
export async function readBlogIds() {
  const supabase = await createSupabaseServerClient();
  return supabase.from("blog").select("id");
}

export async function readBlogDeatailById(blogId: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("blog")
    .select("*,blog_content(*)")
    .eq("id", blogId)
    .single();
}

export async function readBlogContent(blogId: string) {
  unstable_noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase
    .from("blog_content")
    .select("content")
    .eq("blog_id", blogId)
    .single();
}

export async function updateBlogById(blogId: string, data: Blog) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("blog").update(data).eq("id", blogId);
  revalidatePath(DASHBOARD);
  revalidatePath("/blog/" + blogId);
  return JSON.stringify(result);
}

export async function updateBlogDetail(
  blogId: string,
  data: BlogFormSchemaType
) {
  const { ["content"]: excludedKey, ...blog } = data;

  const supabase = await createSupabaseServerClient();
  const resultBlog = await supabase.from("blog").update(blog).eq("id", blogId);
  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .update({ content: data.content })
      .eq("blog_id", blogId);
    revalidatePath(DASHBOARD);
    revalidatePath("/blog/" + blogId);

    return JSON.stringify(result);
  }
}

export async function deleteBlogById(blogId: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("blog").delete().eq("id", blogId);
  revalidatePath("/dashboard");
  revalidatePath("/blog/" + blogId);
  return JSON.stringify(result);
}

export async function uploadimg(img: string, name: string) {
  const supabase = await createSupabaseServerClient();

  const filePath = `saasblog/${name}`;

  const { data, error } = await supabase.storage
    .from("Blog")
    .upload(filePath, img);
  if (error) {
    console.log("false");
    return;
  } else {
    const { data } = supabase.storage
      .from("Blog")
      .getPublicUrl(`saasblog/${name}`);
    if (error) {
      console.log("failed to convert to url");
      return;
    } else {
      return data.publicUrl;
    }
  }
}
