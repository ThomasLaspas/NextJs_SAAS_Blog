import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto min-h-screen  pt-10 space-y-10">
      <div className="sm:px-10 space-y-5">
        <Skeleton className="w-[200px] h-8" />
        <Skeleton className="w-[200px] h-8" />
      </div>

      <div className="w-full h-96 relative">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="w-full h-[15vh]" />
    </div>
  );
}
