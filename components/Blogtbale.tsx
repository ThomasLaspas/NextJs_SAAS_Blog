"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { readBlogAdmin } from "@/lib/admin/apis";
import { Button } from "./ui/button";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { deleteBlogById } from "@/lib/admin/apis";

interface supabase {
  id: string;
  content: string;
  title: string;
  image_url: string;
  is_premium: boolean;
  is_published: boolean;
  created_at: string;
}

function Blogtbale() {
  const supabase2 = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [blog, setBlogs] = useState<supabase[] | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readBlogAdmin();

        setBlogs(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Define the subscription
    const channels = supabase2
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blog" },
        (event: any) => {
          console.log(event);
          if (event.eventType === "UPDATE") {
            const { new: newOrder } = event;
            setBlogs((prevPosts) => {
              if (!prevPosts) return null; // Handle null case
              return prevPosts.map((post) => {
                if (post.id === newOrder.id) {
                  return {
                    ...post,
                    ...newOrder,
                  };
                }
                return post;
              });
            });
          } else if (event.eventType === "DELETE") {
            setBlogs((prevPosts) => {
              if (!prevPosts) return null; // Handle null case
              return prevPosts.filter((post) => post.id !== event.old.id);
            });
          }
        }
      )
      .subscribe();

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      channels.unsubscribe();
    };
  }, []);

  return (
    <Table className=" border-[0.5px] border-primary mt-10">
      <TableHeader>
        <TableRow className=" border-[0.5px] border-primary">
          <TableHead>Title</TableHead>
          <TableHead>Premium</TableHead>
          <TableHead>Publish</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blog?.map((invoice) => (
          <TableRow key={invoice.id} className=" border-[0.5px] border-primary">
            <TableCell className="font-medium">{invoice.title}</TableCell>
            <TableCell>
              <Switch checked={invoice.is_premium} />
            </TableCell>
            <TableCell>
              <Switch checked={invoice.is_published} />
            </TableCell>
            <TableCell className="flex flex-col gap-2">
              <Button variant="link">
                <Link
                  href={`/blog/${invoice.id}`}
                  className="flex items-center gap-2"
                >
                  <EyeOpenIcon /> View
                </Link>
              </Button>
              <Button variant="link" onClick={() => deleteBlogById(invoice.id)}>
                <TrashIcon /> Delete
              </Button>
              <Button variant="link">
                <Link
                  href={`/dashboard/blog/edit/${invoice.id}`}
                  className="flex items-center gap-2"
                >
                  <Pencil1Icon /> Edit
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Blogtbale;
