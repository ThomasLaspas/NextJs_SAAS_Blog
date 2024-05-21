"use client";
import { readBlogById } from "@/lib/admin/apis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Content from "@/components/Content";
interface Props {
  data?:
    | {
        id: string;
        email: string;
        username: string;
        role: string;
        subscription_status: boolean;
        stripe_customer_id: string;
        created_at: string;
        stripe_subscription: string;
      }[]
    | null;
}
interface Daata {
  id: string;
  content: string;
  title: string;
  image_url: string;
  is_premium: boolean;
  is_published: boolean;
  created_at: string;
}

function Blogpage({ data }: Props) {
  const [blog, setBlog] = useState<Daata | null>(null);
  const params = useParams();
  const [load, setload] = useState<boolean>(false);
  const [login, setlogin] = useState<string | undefined>(data?.[0].email);
  console.log(data);
  useEffect(() => {
    async function fetchBlog() {
      if (params.id && typeof params.id === "string") {
        setload(true);
        try {
          const blogData = await readBlogById(params.id);
          setBlog(blogData.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setload(false);
        }
      }
    }
    fetchBlog();
  }, []);

  const subscriptionStatus = data?.[0]?.subscription_status;
  return (
    <div className="max-w-5xl mx-auto min-h-screen sm:px-4 lg:px-0 px-3 pt-10 space-y-10">
      <div className="sm:px-10 space-y-5">
        <h1 className=" text-3xl font-bold dark:text-gray-200">
          {blog?.title}
        </h1>
        <p className="text-sm dark:text-gray-400">
          {new Date(blog?.created_at!).toDateString()}
        </p>
      </div>

      <div className="w-full sm:h-88 lg:h-96 h-80 relative">
        <Image
          priority
          src={blog?.image_url!}
          alt="cover"
          fill
          className=" object-cover object-center rounded-md border-[0.5px] border-zinc-600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <Content
        content={blog?.content}
        userstatus={subscriptionStatus}
        role={data?.[0].role}
        login={login}
      />
    </div>
  );
}

export default Blogpage;
