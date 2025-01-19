import { useNavigate } from "react-router-dom";
import Footer from "../partials/Footer";
import Logo from "../components/Logo";
import Image1 from "/landimg.jpg";

const token = localStorage.getItem("token");

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-w-full min-h-screen bg-[#eef] select-none py-[4.4rem] md:py-[5.6rem]">
        <div
          className="fixed z-50 shadow-xl w-full h-fit bg-[#fffc] backdrop-blur-[4px] flex justify-between items-center top-0 left-0
        py-4 md:py-6 px-4 md:px-8"
        >
          <Logo />
          <div
            onClick={() => {
              token ? navigate("/home") : navigate("/login");
            }}
            className="py-2 px-4 text-white rounded-md cursor-pointer
            bg-[#50f] hover:bg-[#117] duration-500"
          >
            Get Started
          </div>
        </div>
        <div
          className="relative overflow-hidden h-fit px-4 py-4 sm:py-12 flex flex-col justify-center items-center gap-8 sm:gap-16 m-2 sm:m-4 md:m-8 lg:m-12 bg-white bg-cover bg-top md:bg-center rounded-lg shadow-lg shadow-[#0004]"
          style={{ backgroundImage: `url('/grid.jpg')` }}
        >
          <div className="animate-[landingTrans1_5s_ease] leading-none text-[9vw] sm:text-[5.6vw] font-extrabold">
            Aptitude Assessment Platform
          </div>
          <div className="w-full min-h-fit flex flex-col items-center px-4 md:px-8 gap-4">
            <div className="landingCard w-[80%] lg:w-[50%] h-20 text-[1.3rem] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[1.8rem] animate-[landingTrans2_1200ms_ease]">
              Automated Evaluation
            </div>
            <div className="landingCard w-[90%] lg:w-[60%] h-24 text-[1.6rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.3rem] animate-[landingTrans2_1700ms_ease]">
              Candidate Insights
            </div>
            <div className="landingCard w-full lg:w-[70%] h-28 text-[1.9rem] sm:text-[2.2rem] md:text-[2.4rem] lg:text-[2.6rem] animate-[landingTrans2_2200ms_ease]">
              Customized Assessment
            </div>
          </div>
        </div>

        <div
          className="min-w-fit bg-white rounded-lg p-2
        mx-2 sm:mx-4 md:mx-8 lg:mx-12 min-h-fit shadow-lg
        flex flex-col lg:flex-row justify-between relative overflow-hidden"
        >
          <div className="z-20 absolute -right-20 -bottom-32 w-60 h-60 bg-[#50f] blur-[60px] rounded-full animate-[projection_10s_infinite]" />
          <div className="z-10 absolute right-12 -bottom-32 w-80 h-80 bg-gradient-to-br from-[#88f] to-[#77fa] blur-[100px] rounded-full animate-[projection_12s_infinite]" />
          <img
            src={Image1}
            alt="IQ"
            className="w-full lg:w-1/2 h-full rounded-md z-30"
          />
          <div className="z-30 w-full lg:w-1/2 p-4 lg:p-8 md:text-lg lg:text-2xl">
            "Our platform provides easy-to-use aptitude assessments for a wide
            range of needs. Whether for hiring or skill evaluations, it helps
            you to make informed decisions with accurate results."
          </div>
        </div>

        
        <div className="bg-white shadow-lg relative overflow-hidden m-2 sm:m-4 md:m-8 lg:m-12 py-4 p-2 sm:p-4 md:p-8 rounded-md flex flex-col items-center gap-8">
        <div className="z-10 absolute -left-32 sm:-left-10 -top-20 w-80 h-80 bg-[#50f] blur-[60px] rounded-full animate-[projection_10s_infinite]" />
        <div className="z-20 absolute left-40 sm:-left-20 -top-12 w-1/3 h-80 bg-gradient-to-br from-[#88f] to-[#77fa] blur-[100px] rounded-full animate-[projection_12s_infinite]" />
        <div className="z-50 text-[1.2rem] md:text-[2rem] font-bold ">
            100+ Companies trust us
          </div>
          <div className="z-50 flex flex-wrap justify-center gap-4 md:gap-8">
            {["A", "B", "C", "D", "E"].map((item, index) => (
              <div key={index} className="w-12 sm:w-20 md:w-24 lg:w-36 h-12 sm:h-20 md:h-24 lg:h-36 bg-[#eef] rounded-lg md:rounded-xl lg:rounded-2xl border shadow-[0_0_10px_#0002] p-2 md:p-3 lg:p-4 text-[1rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] font-extrabold place-content-center text-center">{item}</div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Landing;
