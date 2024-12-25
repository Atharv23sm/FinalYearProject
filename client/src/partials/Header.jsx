import Logo from "../components/Logo";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("token");
const deco = jwtDecode(token);
const user = deco.user;

function Header() {
  return (
    <div
      className="w-full fixed top-0 left-0 bg-[#fffc] backdrop-blur-[4px]
      py-3 px-8 select none flex justify-between items-center z-30"
    >
      <Logo />
      <div className="flex gap-2 items-center">
        <FaUser size={20}></FaUser>
        {user.name}</div>
    </div>
  );
}

export default Header;
