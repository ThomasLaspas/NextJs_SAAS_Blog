"use client";
import MarkdownPreview from "./MarkdownPreview";
import Link from "next/link";
interface Props {
  content: string | undefined;
  userstatus: boolean | undefined;
  role: string | undefined;
  login: string | undefined;
}
import React, { ChangeEvent, useTransition } from "react";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";
import { checkout } from "@/lib/stripe/Sapi";
import { Button } from "./ui/button";
function Content({ content, userstatus, role, login }: Props) {
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const handleCheckOut = () => {
    startTransition(async () => {
      const data = JSON.parse(
        await checkout(login!, location.origin + pathname)
      );
      window.location.href = data.url;
    });
  };
  console.log(process.env.NEXT_STRIPE_PUBLIC);
  if (!login) {
    return <Link href="/login">You must login first </Link>;
  }

  if (userstatus || role === "admin") {
    return <MarkdownPreview content={content || ""} />;
  } else {
    return (
      <div className="w-full sm:h-[15vh] lg:h-[20vh] h-[10vh] flex items-center justify-center">
        <Button
          onClick={handleCheckOut}
          variant="link"
          className="w-1/2 h-1/2 flex items-center gap-4 border border-primary"
        >
          <h1 className={isPending ? "animate-spin" : "animate-bounce"}>
            <LightningBoltIcon />{" "}
          </h1>{" "}
          Upgrade to pro
        </Button>
      </div>
    );
  }
}

export default Content;
