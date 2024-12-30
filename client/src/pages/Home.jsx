import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { useAuth } from "../context/UserContext";

import Header from "../partials/Header";
import Footer from "../partials/Footer";
import axiosInstance from "../axiosInstance";
import HomeLoader from "../components/HomeLoader";

function Home() {
  const { adminId } = useAuth();
  // const adminId = localStorage.getItem("adminId");
  // const isLogged = localStorage.getItem("token");
  const [tests, setTests] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTests = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`get-all-tests/${adminId}`);
        // console.log(response)
        setTests(response.data.tests);
        setTotal(response.data.totalTests);
        setIsLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.response.data.message);
        setIsLoading(false);
      }
    };
    if (adminId) {
      getTests();
    }
  }, []);

  return adminId ? (
    <>
      <div className="py-16 px-4 md:px-8">
        <Header />
        <div className="min-w-full min-h-screen flex flex-col md:flex-row bg-[#eef] rounded-md">
          <div className="min-w-fit p-4 md:p-6 border-b-2 md:border-r-2 md:border-b-0 border-[#bbe]">
            <Link to="/create-test">
              <div className="button w-fit h-fit p-6 text-[16px] md:text-2xl">
                Create a Test
              </div>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 md:gap-8 p-4 md:p-6">
            <div className="w-full border border-[#50f] rounded-md flex justify-between items-center overflow-hidden">
              <div className="place-content-center h-full text-[16px] md:text-2xl m-2 md:m-6">
                Your Tests
              </div>
              <div className="place-content-center px-2 md:px-4 w-fit h-full bg-white">{`Total Tests : ${total}`}</div>
            </div>
            {!isLoading ? (
              tests.map((item, index) => (
                <Link
                  key={index}
                  to={`/test-details/${item._id}`}
                  className="w-full group bg-white p-4 rounded-md shadow-md hover:shadow-xl duration-500 ease-out cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div
                      key={index}
                      className="text-[20px] md:text-[28px] md:group-hover:text-[#50f] duration-300 font-bold"
                    >
                      {item.name}
                    </div>
                    <FaAngleRight size={20} className="text-[#888]" />
                  </div>
                  <hr className="border-[#aac] rounded-lg my-4" />
                  <div>{`${item.date.slice(0, 10)} | ${item.startTime} | ${
                    item.duration
                  } minutes`}</div>
                </Link>
              ))
            ) : (
              <HomeLoader />
            )}
            {error && <div className="error md:text-md">{error}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}
export default Home;
