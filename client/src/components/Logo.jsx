import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/home"
      className="w-fit h-fit font-[Gabarito] font-bold text-[#31b] text-2xl px-1 border-[3px] rounded-md border-[#31b]"
    >
      RAA
    </Link>
  );
}
