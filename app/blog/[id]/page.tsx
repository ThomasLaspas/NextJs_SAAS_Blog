import { getUser } from "@/lib/admin/apis";
import Blogpage from "@/components/Blogpage";
async function page() {
  const userData = await getUser();

  return (
    <>
      <Blogpage data={userData} />
    </>
  );
}

export default page;
