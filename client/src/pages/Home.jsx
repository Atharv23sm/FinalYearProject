import { Navigate, Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

const token = localStorage.getItem("token");

const tests = [
  "Java developer Test",
  "Python Developer test",
  "Full Stack developer Test",
  "Intern Test",
];

function Home() {
  return token ? (
    <>
      <div className="py-16 px-4 md:px-8">
        <Header />
        <div className="min-w-full min-h-screen flex flex-col md:flex-row bg-[#eee] rounded-md">
          <div className="min-w-fit p-4 md:p-6 border-b-2 md:border-r-2 md:border-b-0 border-[#bbb]">
            <Link to="/create-test">
              <div className="button w-fit h-fit p-6 text-[16px] md:text-2xl">
                Create a Test
              </div>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center gap-4 md:gap-8 p-4 md:p-6">
            <div className="w-full border-[1px] border-[#50f] py-2 md:p-6 rounded-md text-[16px] md:text-2xl flex justify-center items-center">
              Your Tests
            </div>
            {tests.map((item, index) => (
              <div className="w-full group bg-white p-4 rounded-md shadow-md hover:shadow-xl duration-500 ease-out cursor-pointer">
                <div className="flex justify-between items-center">
                  <div
                    key={index}
                    className="text-[20px] md:text-[28px] md:group-hover:text-[32px] duration-300 font-bold"
                  >
                    {item}
                  </div>
                  <FaAngleRight size={20} className="text-[#888]" />
                </div>
                <hr className=" rounded-lg my-4" />
                <div>Date & Time</div>
              </div>
            ))}
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
