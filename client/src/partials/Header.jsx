import Logo from "../components/Logo";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token");
const deco = jwtDecode(token);
const user = deco.user;

function Header() {
  const [showBlock, setShowBlock] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    if (confirm("Are you sure? You are logging out.")) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminId");
      navigate("/login");
    }
  };

  return (
    <div
      className="w-full fixed top-0 left-0 bg-[#fffc] backdrop-blur-[4px]
      py-3 px-8 select none flex justify-between items-center z-30"
    >
      <Logo />
      <div
        onClick={() => {
          setShowBlock(!showBlock);
        }}
        className="flex gap-2 items-center cursor-pointer"
      >
        <FaUser size={20}></FaUser>
        {user.name}
      </div>
      {showBlock && (
        <div
          onClick={() => {
            logout();
          }}
          className="absolute right-4 top-16 w-fit p-4 rounded-b-md bg-[#50f] text-white flex gap-2 items-center cursor-pointer"
        >
          Logout <FaSignOutAlt size={20} />
        </div>
      )}
    </div>
  );
}

export default Header;
