import { Link } from "react-router-dom";
import Image1 from "../public/Q_logo.png";

export default function Logo() {
  return (
    <Link
      to="/home"
      className="w-fit h-fit"
    >
      <img
        src={Image1}
        alt="Q"
        className="h-8"
      />
    </Link>
  );
}
