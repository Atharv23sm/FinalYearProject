import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      className="w-fit h-fit font-[Gabarito] font-bold text-[#31b]
      text-lg md:text-xl lg:text-3xl"
    >
      PROJECT
    </Link>
  );
}

export default Logo;
