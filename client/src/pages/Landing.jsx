import { useNavigate } from "react-router-dom";
import Footer from "../partials/Footer";
import Logo from "../components/Logo";
import Image1 from "../public/landimg.jpg";
import { useEffect, useState } from "react";

const token = localStorage.getItem("token");

function Landing() {
  const navigate = useNavigate();

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="min-w-full min-h-screen bg-gradient-to-br from-[#35f6] via-[#26f4] to-[#fff_50%]">
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
        <div className="w-full flex justify-center px-6 py-16 lg:py-24">
          <div className="animate-[landingTrans1_3s_ease] leading-none text-[14vw] lg:text-[6vw] font-extrabold">
            Online Aptitude Assessment
          </div>
        </div>
        <div
          className="relative overflow-hidden w-fit bg-gradient-to-tl from-transparent to-[#77f5] backdrop-blur-sm rounded-md p-4 min-h-fit mx-4 mb-24
        flex place-self-center flex-col md:flex-row justify-between items-center gap-[2vw] md:hover:cursor-none animate-[opacity1_3000ms_ease]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="landingCard text-[2.5rem] animate-[landingTrans2_1200ms_ease]">
            Boost <br />
            Hiring Accuracy
          </div>
          <div className="landingCard text-[1.9rem] animate-[landingTrans2_1600ms_ease]">
            Automated Aptitude Assessment
          </div>
          <div className="landingCard text-[2.2rem] animate-[landingTrans2_2000ms_ease]">
            Objective Candidate Insights
          </div>
          {isHovering && (
            <div
              className="absolute w-52 h-52 backdrop-brightness-150 rounded-full pointer-events-none transform -translate-y-[68vh] -translate-x-[31vw]"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            />
          )}
        </div>
        <div
          className="min-w-fit bg-[#eef] rounded-md p-2
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
