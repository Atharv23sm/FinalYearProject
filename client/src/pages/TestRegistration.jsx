import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import Footer from "../partials/Footer";
import SubmitButton from "../components/SubmitButton";
import { BASE_URL } from "../url";

const TestRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [testId, setTestId] = useState(useParams()); //sample
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerForTest(testId);
  };

  const registerForTest = async (testId) => {
    try {
      const response = await axios.post(`${BASE_URL}/register-candidate`, {
        name,
        email,
        testId,
      });

      if (response.status == 200) {
        navigate("/successful-registration");
      }

      //   const { token, user } = response1.data;
      //   console.log(token);
      //   if (token) {
      //     localStorage.setItem("token", token);
      //   }
      //   // console.log(testId);
      //   const response2 = await axiosInstance.post("/register-test", {
      //     name,
      //     email,
      //     testId,
      //   });
      //   const { testId } = response2.data;

      //   if (testId) {
      //     navigate("/test", { state: testId }); // Redirect to the test page
      //   } else {
      //     console.error("No redirect URL provided.");
      //   }
    } catch (e) {
      console.error("Error registering for test :", e);
      setError(e.response.data.message);

      if (e.response.status == 400) {
        setError("Candidate is already registered for this test.");
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen p-2 md:p-0 flex flex-col items-center justify-center">
        <div className="w-full sm:w-1/2 md:w-[40%] lg:w-[30%] bg-[#eef] rounded-md p-2 md:p-4">
          <div className="w-full bg-white rounded-md p-2 md:p-4">
            <div>
              <div className="mb-4 text-2xl font-bold text-center duration-300 ease-out rounded-md">
                Test Registeration
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

              <SubmitButton value="Register" />
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TestRegistration;
