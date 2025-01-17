import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../url";
import Footer from "../partials/Footer";
import SubmitButton from "../components/SubmitButton";
import Image1 from "/aptiboy.png";

const CandidateLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testId, setTestId] = useState(useParams().testId);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginForTest(testId);
  };

  const LoginForTest = async (testId) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/candidate-login`, {
        name,
        email,
        testId,
      });

      localStorage.setItem("candidate_token", response.data.token);
      navigate(`/start-page/${testId}`);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Error Logging for test :", err);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen p-4 md:p-0 flex justify-center items-center bg-[#eef]">
        <div className="hidden lg:block">
          <img
            src={Image1}
            alt="IQ"
            className="h-[480px] bg-white shadow-lg rounded-lg mx-8"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:mx-8 md:w-[40%] lg:w-[30%] flex flex-col items-center gap-4 p-4 bg-[#ddf] rounded-md">
          <div className="w-full bg-white rounded-md p-2 md:p-4">
            <div>
              <div className="mb-4 text-2xl font-bold text-center duration-300 ease-out rounded-md">
                Candidate Login
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <div className="md-4">
                <input
                  type="hidden"
                  name="testId"
                  required
                  value={testId}
                  className="formInput"
                  onChange={(e) => {
                    setTestId(e.target.value);
                    setError("");
                  }}
                />
              </div>

              {error && <div className="error">{error}</div>}

              <SubmitButton value={isLoading ? "Logging in..." : "Login"} />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CandidateLogin;
