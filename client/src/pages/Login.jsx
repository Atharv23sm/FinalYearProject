import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../url";
import Footer from "../partials/Footer";
import SubmitButton from "../components/SubmitButton";
import Loading from "../Loading";
import axios from "axios";
import { useAuth } from "../context/UserContext";
import Image1 from "../public/Q_gridd.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState();
  const [passtype, setPasstype] = useState("password");
  const navigate = useNavigate();
  const { setAdminId } = useAuth();

  function showPassword() {
    setPasstype(passtype === "password" ? "text" : "password");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("adminId", response.data.adminId);
      setAdminId(response.data.adminId);
      navigate("/home");
    } catch (err) {
      setIsLoggingIn(false);
      setAdminId(null);
      setError(err.response.data.message);
    }
  };

  return isLoggingIn ? (
    <Loading />
  ) : (
    <>
      <div className="w-full min-h-screen p-4 md:p-0 flex justify-center items-center bg-[#eef]">
        <div className="hidden lg:block">
          <img src={Image1} alt="IQ" className="h-[480px] shadow-lg rounded-lg mx-8"/>
        </div>
        <div className="w-full sm:w-1/2 lg:mx-8 md:w-[40%] lg:w-[30%] flex flex-col items-center gap-4 p-4 bg-[#ddf] rounded-md">
          <div className="w-full flex justify-between bg-white p-2 md:p-4 rounded-md">
            <div className="text-2xl font-bold">Log in</div>
            <Link to="/signup" className="navigateSigning">
              Sign up
            </Link>
          </div>

          <div className="w-full bg-white rounded-md p-2 md:p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div>
                Email <br />
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  className="formInput"
                  onChange={(e) => {
                    setEmail(e.target.value.toLowerCase());
                    setError("");
                  }}
                />
              </div>

              <div className="mb-4 relative">
                Password <br />
                <input
                  type={passtype}
                  name="password"
                  value={password}
                  maxLength={20}
                  minLength={6}
                  required
                  className="formInput"
                  onChange={(e) => {
                    setPassword(e.target.value.toLowerCase());
                    setError("");
                  }}
                />
                {passtype == "password" ? (
                  <FaEye
                    size={20}
                    onClick={showPassword}
                    className="showPassword"
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    onClick={showPassword}
                    className="showPassword"
                  />
                )}
              </div>

              {error && <div className="error md:text-md">{error}</div>}

              <SubmitButton value="Login" />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
