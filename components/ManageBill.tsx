"use client";
import { Button } from "@/components/ui/button";
import { manageBillingPortal } from "@/lib/stripe/Sapi";
import { BackpackIcon } from "@radix-ui/react-icons";

import React, { ChangeEvent, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface Props {
  customerid: string;
}
function ManageBill({ customerid }: Props) {
  const [isPending, startTransition] = useTransition();
  const bill = () => {
    startTransition(async () => {
      const data = JSON.parse(await manageBillingPortal(customerid));
      window.location.href = data.url;
    });
  };
  return (
    <Button
      variant="ghost"
      className="w-full flex justify-between items-center border-primary"
      onClick={bill}
    >
      <h4 className="flex items-center gap-2">
        {" "}
        ManageBill{" "}
        <AiOutlineLoading3Quarters
          className={isPending ? "animate-spin" : "hidden"}
        />
      </h4>{" "}
      <BackpackIcon />
    </Button>
  );
}

export default ManageBill;
