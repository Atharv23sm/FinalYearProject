import { FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full bg-gradient-to-r from-[#50f] to-[#20a] text-white p-4 bottom-0 left-0 flex flex-col gap-4">
      <div>Join the conversation</div>
      <div className="flex gap-10">
        <Link to={"https://github.com/Atharv23sm/FinalYearProject"}>
          <FaGithub size={"28"} />
        </Link>
        <Link to={"https://www.instagram.com/atharv_mahabal/"}>
          <FaInstagram size={"28"} />
        </Link>
      </div>
      <div className="text-xs">
        Welcome to the Beta Version of Our Web App!
        <br />
        We're actively working on improvements, and your feedback is essential
        to help us enhance the experience.
        <br />
        Please share any suggestions or issues to guide us before the official
        release.
      </div>
      <div className="text-xs">{"Team RAA © " + new Date().getFullYear()}</div>
    </div>
  );
}

export default Footer;
