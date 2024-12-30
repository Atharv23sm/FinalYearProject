import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/home"
      className="w-fit h-fit font-[Gabarito] font-bold text-[#31b] text-2xl lg:text-3xl"
    >
      PROJECT
    </Link>
  );
}
