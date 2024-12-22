import { Link, useNavigate } from "react-router-dom";
import Footer from "../partials/Footer";
import Logo from "../components/Logo";
import Image1 from "../public/landimg.jpg";

function Landing() {
  return (
    <>
      <div className="min-w-full min-h-screen bg-gradient-to-br from-[#50f4] via-[#fff] to-[#fff]">
        <div
          className="bg-white flex justify-between items-center top-0 left-0
        py-4 md:py-6 px-4 md:px-8"
        >
          <Logo />
          <Link
            to="/signup"
            className="py-2 px-4 text-white rounded-md cursor-pointer
            bg-[#50f] hover:bg-[#31b] duration-500"
          >
            Get Started
          </Link>
        </div>
        <div className="w-full flex justify-center px-6 py-16 lg:py-24">
          <div className="animate-[landingTrans1_3s_ease] leading-none text-[14vw] lg:text-[6vw] font-extrabold">
            Online Aptitude Assessment
          </div>
        </div>
        <div
          className="min-w-fit bg-[#eee] rounded-md p-2
        animate-[landingTrans2_1500ms_ease]
        mx-[5vw] lg:mx-[10vw] mb-20 min-h-fit
        flex flex-col md:flex-row justify-between items-center gap-[2vw]"
        >
          <img
            src={Image1}
            alt="IQ"
            className="w-full md:w-[400px] lg:w-[400px] h-full rounded-md"
          />
          <div className="text-[4vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw]">
            "Our platform provides easy-to-use aptitude assessments for a wide
            range of needs. Whether for hiring, student exams or skill
            evaluations, it helps you to make informed decisions with accurate
            results."
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Landing;
