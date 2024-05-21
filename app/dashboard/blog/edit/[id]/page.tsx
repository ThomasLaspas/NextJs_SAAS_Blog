"use client";
import { readBlogById } from "@/lib/admin/apis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UBlogForm from "@/components/UpdateBlogform";
interface Daata {
  id: string;
  content: string;
  title: string;
  image_url: string;
  is_premium: boolean;
  is_published: boolean;
  created_at: string;
}
function page() {
  const [blog, setBlog] = useState<Daata | null>(null);
  const params = useParams();
  const [load, setload] = useState<boolean>(false);

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
  if (load) {
    return;
  }
  return (
    <div className="mt-6 sm:px-tablet  ">
      <UBlogForm
        dataa={
          blog || {
            id: "",
            content: "",
            title: "",
            image_url: "",
            is_premium: false,
            is_published: false,
            created_at: "",
          }
        }
      />
    </div>
  );
}

export default page;
