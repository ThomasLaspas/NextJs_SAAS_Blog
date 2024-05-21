"use client"; // Marking the parent component as a Client Component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./button";
import ManageBill from "../ManageBill";
interface user {
  id: string;
  email: string;
  created_at: string;
  role: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  username: string;
  subscription_status: boolean;
}
export default function AuthButton() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [user, setUser] = useState<string | null>(null);
  const [avatar, setavatar] = useState<any | null>(null);
  const [isAdmin, setisadmin] = useState<string | null>(null);
  const [stripe, setstripe] = useState<user | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        return;
      } else {
        setUser(userData?.user?.email ?? null);
        setavatar(userData?.user?.user_metadata?.avatar_url);
        setisadmin(userData?.user?.user_metadata.role || null);
        let { data: profiles, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id);
        if (profiles && profiles.length > 0) {
          setstripe(profiles[0]); // Assuming you expect only one profile
        } else {
          setstripe(null); // Set to null if no profile is found
        }
      }
    };
    getUser();
  }, []);
  console.log(stripe);
  const admin = isAdmin === "admin";
  const signOut = async () => {
    await supabase.auth.signOut();
    return (window.location.href = "/");
  };

  return user ? (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            className="hover:border-2 hover:rounded-full border-primary "
            src={avatar ? avatar : `https://github.com/shadcn.png`}
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="space-y-3 divide-y p-2 border-primary"
        side="bottom"
      >
        <div className="px-4">
          <p className="text-sm text-gray-500">{user}</p>
        </div>
        {!admin && stripe?.subscription_status && (
          <ManageBill customerid={stripe.stripe_customer_id} />
        )}

        {admin && (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full flex justify-between items-center border-primary"
            >
              Dashboard <DashboardIcon />
            </Button>
          </Link>
        )}

        <Button
          variant="ghost"
          className="w-full flex justify-between items-center border-primary"
          onClick={signOut}
        >
          Log out <LockOpen1Icon />
        </Button>
      </PopoverContent>
    </Popover>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
