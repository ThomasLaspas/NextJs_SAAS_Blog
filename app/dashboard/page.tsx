import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Blogtbale from "@/components/Blogtbale";

function page() {
  return (
    <div className="sm:px-[5%] px-1   sm:mt-[3%] mt-[5%]  ">
      <section className="flex justify-between items-center">
        <h1 className="sm:text-2xl lg:text-5xl">Blogs</h1>
        <Link href="/dashboard/blog/create" className="border-2 border-primary">
          <Button className="flex items-center gap-2 " variant="link">
            Create <PlusIcon />
          </Button>
        </Link>
      </section>
      <Blogtbale />
    </div>
  );
}

export default page;
