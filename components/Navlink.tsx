"use client";
import Link from "next/link";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
function Navlink() {
  const pathname = usePathname();
  return (
    <div className="sm:px-tablet px-1   sm:mt-[3%] mt-[5%] ">
      <section className="border-b-[1px] border-primary flex items-center py-2 gap-8">
        <Link
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "text-primary flex items-center gap-4"
              : "text-gray-400 flex items-center gap-4"
          }
        >
          Dashboard
          <ReaderIcon />
        </Link>
        <Link
          href="/dashboard/users"
          className={
            pathname === "/dashboard/users"
              ? "text-primary flex items-center gap-4"
              : "text-gray-400 flex items-center gap-4"
          }
        >
          Users <PersonIcon />
        </Link>
      </section>
    </div>
  );
}

export default Navlink;
