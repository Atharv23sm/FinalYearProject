import { useNavigate } from "react-router-dom";
import Footer from "../partials/Footer";
import Logo from "../components/Logo";
import Image1 from "/landimg.jpg";

const token = localStorage.getItem("token");

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-w-full min-h-screen bg-gradient-to-b from-[#88f4] to-[#fff] select-none">
        <div
          className="bg-white flex justify-between items-center top-0 left-0
        py-4 md:py-6 px-4 md:px-8"
        >
          <Logo />
          <div
            onClick={() => {
              token ? navigate("/home") : navigate("/login");
            }}
            className="py-2 px-4 text-white rounded-md cursor-pointer
            bg-[#50f] hover:bg-[#31b] duration-500"
          >
            Get Started
          </div>
        </div>
        <div className="relative overflow-hidden h-fit px-4 py-4 sm:py-16 flex flex-col justify-center items-center gap-8 sm:gap-16 m-4 md:m-8 lg:m-12 bg-white bg-cover bg-top md:bg-center rounded-lg shadow-lg" style={{ backgroundImage: `url('/grid.jpg')` }}>
          <div className="animate-[landingTrans1_3s_ease] leading-none text-[9vw] sm:text-[5.6vw] font-extrabold">
            Aptitude Assessment Platform
          </div>
          <div
            className="w-fit min-h-fit flex place-self-center flex-row justify-between items-center gap-[2vw] lg:gap-12 sm:gap-4 md:gap-8 md:hover:cursor-none"
          >
            <div className="landingCard text-[3.8vw] lg:text-[2.4vw] animate-[landingTrans2_1200ms_ease]">
              Boost <br />
              Hiring Accuracy
            </div>
            <div className="landingCard text-[3.8vw] lg:text-[2.4vw] animate-[landingTrans2_1600ms_ease]">
              Automated Aptitude Assessment
            </div>
            <div className="landingCard text-[3.8vw] lg:text-[2.4vw] animate-[landingTrans2_2000ms_ease]">
              Objective Candidate Insights
            </div>
          </div>
        </div>

        <div
          className="min-w-fit bg-white rounded-lg p-2
        mx-4 md:mx-8 lg:mx-12 mb-12 min-h-fit shadow-lg
        flex flex-col md:flex-row justify-between items-center"
        >
          <img
            src={Image1}
            alt="IQ"
            className="w-full md:w-[400px] lg:w-[400px] h-full rounded-md"
          />
          <div className="text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] m-[2vw]">
            "Our platform provides easy-to-use aptitude assessments for a wide
            range of needs. Whether for hiring or skill evaluations, it helps
            you to make informed decisions with accurate results."
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Landing;
