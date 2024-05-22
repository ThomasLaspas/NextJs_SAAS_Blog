import Uservard from "@/components/Uservard";
import { Getusers } from "@/lib/admin/apis";
async function Users() {
  const data = await Getusers();
  console.log(data);
  return (
    <div className="sm:px-[5%] px-3   sm:mt-[3%] mt-[5%]  grid  sm:grid-cols-3 sm:gap-[10%] gap-5">
      <Uservard users={data} />
    </div>
  );
}

export default Users;
