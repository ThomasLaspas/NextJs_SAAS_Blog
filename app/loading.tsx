import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5  sm:px-tablet">
      <section className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-primary transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3">
        <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
          <Skeleton className=" w-full h-full  rounded-md object-cover object-center " />
        </div>
        <div className="space-y-2">
          <Skeleton className=" w-[200px]  h-8 " />

          <Skeleton className=" w-[200px] h-8  " />
        </div>
      </section>
      <section className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-primary transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3">
        <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
          <Skeleton className=" w-full h-full rounded-md object-cover object-center " />
        </div>
        <div className="space-y-2">
          <Skeleton className=" w-[200px] h-8  " />

          <Skeleton className=" w-[200px]  h-8 " />
        </div>
      </section>
      <section className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-primary transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3">
        <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
          <Skeleton className=" w-full h-full  rounded-md object-cover object-center " />
        </div>
        <div className="space-y-2">
          <Skeleton className=" w-[200px]  h-8 " />

          <Skeleton className=" w-[200px] h-8  " />
        </div>
      </section>
      <section className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-primary transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3">
        <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
          <Skeleton className=" w-full h-full  rounded-md object-cover object-center " />
        </div>
        <div className="space-y-2">
          <Skeleton className=" w-[200px] h-8  " />

          <Skeleton className=" w-[200px] h-8  " />
        </div>
      </section>
    </div>
  );
}
