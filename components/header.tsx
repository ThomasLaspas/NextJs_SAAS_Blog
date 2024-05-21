import AuthButton from "./ui/AuthButton";
import Link from "next/link";

function Header() {
  return (
    <div className="sm:px-tablet  px-3 sm:py-6  py-4 flex items-center justify-between">
      <Link href="/" className="font-logo sm:text-4xl text-xl text-primary ">
        SAAS BLOG
      </Link>

      <AuthButton />
    </div>
  );
}

export default Header;
