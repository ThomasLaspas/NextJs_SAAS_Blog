import { FaRegCopyright } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { IoHome } from "react-icons/io5";
export default function Footer() {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <div className="w-full mt-tablet p-8 border-t border-primary text-white">
      <section className="flex items-center justify-center gap-6 text-primary sm:text-3xl text-lg">
        <a
          href="https://github.com/ThomasLaspas"
          className="hover:saturate-200"
        >
          <IoLogoGithub />
        </a>
        <a
          href="linkedin.com/in/θωμάς-λάσπας-a1a3862ab"
          className="hover:saturate-200"
        >
          <FaLinkedin />
        </a>
        <a href="https://www.thomaslaspas.com/" className="hover:saturate-200">
          <IoHome />
        </a>
      </section>
      <section className="flex items-center justify-center mt-5">
        <FaRegCopyright /> {year} Thomas Laspas.All right reserved
      </section>
    </div>
  );
}
