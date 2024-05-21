import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Loading() {
  return (
    <div className="sm:px-[5%] px-1   sm:mt-[3%] mt-[5%]  ">
      <section className="flex justify-between items-center">
        <Skeleton className="w-[300px] h-5" />
        <Skeleton className="w-[300px] h-5" />
      </section>
      <Table className=" border-[0.5px] border-primary mt-10">
        <TableHeader>
          <TableRow className=" border-[0.5px] border-primary">
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
            <Skeleton className="w-full h-full" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className=" border-[0.5px] border-primary">
            <TableCell className="font-medium">
              <Skeleton className="w-full h-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-full" />
            </TableCell>
            <TableCell className="flex flex-col gap-2">
              <Button variant="link">
                <Skeleton className="w-full h-full" />
              </Button>
              <Button variant="link">
                <Skeleton className="w-full h-full" />
              </Button>
              <Button variant="link">
                <Skeleton className="w-full h-full" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
