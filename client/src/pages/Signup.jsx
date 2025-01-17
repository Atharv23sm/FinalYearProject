import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../url";
import Footer from "../partials/Footer";
import SubmitButton from "../components/SubmitButton";
import Loading from "../Loading";
import axios from "axios";
import Image1 from "../public/Q_gridd.jpg";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passtype, setPasstype] = useState("password");
  const [isSigningUp, setIsSigningUp] = useState();
  const navigate = useNavigate();

  function showPassword() {
    setPasstype((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setIsSigningUp(false);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      {isSigningUp ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen p-4 md:p-0 flex justify-center items-center bg-[#eef]">
          <div className="hidden lg:block">
            <img
              src={Image1}
              alt="IQ"
              className="h-[480px] shadow-lg rounded-lg mx-8"
            />
          </div>
          <div className="w-full sm:w-1/2 lg:mx-8 md:w-[40%] lg:w-[30%] flex flex-col items-center gap-4 p-4 bg-[#ddf] rounded-md">
            <div className="w-full flex justify-between bg-white p-2 md:p-4 rounded-md">
              <div className="text-2xl font-bold">Sign up</div>
              <Link to="/login" className="navigateSigning">
                Login
              </Link>
            </div>

            <div className="w-full bg-white rounded-md p-2 md:p-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {/*
              <div className="flex gap-10 p-4">
                <div>
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    required
                    onChange={() => {
                      setRole("admin");
                      setError("");
                    }}
                  />{" "}
                  Admin
                </div>
                <div>
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    required
                    onChange={() => {
                      setRole("candidate");
                      setError("");
                    }}
                  />{" "}
                  Candidate
                </div>
              </div>*/}

                <div>
                  Name <br />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    maxLength={30}
                    required
                    className="formInput"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                  />
                </div>

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

                <div className="relative mb-4">
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

                <SubmitButton value="Signup" />
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Signup;
