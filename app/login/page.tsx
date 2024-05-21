import Loginform from "@/components/ui/Loginform";

function page() {
  return (
    <div className="w-full  grid place-items-center ">
      <section className="sm:w-1/3 w-[95%] h-min mt-page">
        <Loginform />
      </section>
    </div>
  );
}

export default page;
