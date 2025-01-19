import { FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full bg-[#50f] text-white p-4 bottom-0 left-0 flex flex-col gap-2">
      <div>Join the conversation</div>
      <div className="flex gap-6">
        <Link to={"https://github.com/Atharv23sm/FinalYearProject"}>
          <FaGithub size={"28"} />
        </Link>
        <Link to={"https://www.instagram.com/atharv_mahabal/"}>
          <FaInstagram size={"28"} />
        </Link>
      </div>
      <div className="text-xs">BETA Version</div>
      <div className="text-xs">{"Team © " + new Date().getFullYear()}</div>
    </div>
  );
}

export default Footer;
