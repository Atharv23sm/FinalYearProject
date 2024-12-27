import { useEffect, useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight, FaBars } from "react-icons/fa";
import Timer from "../components/Timer";
import { useAuth } from "../context/UserContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function Test() {
  const [questions, setQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState([]);
  const [error, setError] = useState("");
  const { adminId, isLogged } = useAuth();
  const { testId } = useParams();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-questions/676ee1664bd7fec6aa8afddf` //sample
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.log(error);
        setError("No Questions found!");
      }
    };
    if (isLogged) {
      getQuestions();
    }
  }, []);

  useEffect(() => {
    const getTestDuration = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-test-details/676ee1664bd7fec6aa8afddf`
        );
        setTestDetails(response.data.testDetails);
      } catch (error) {
        console.log(error);
        setError("No Questions found!");
      }
    };
    if (isLogged) {
      getTestDuration();
    }
  }, []);

  const keys = [
    "currentSelected",
    "selectedOption",
    "isAttempted",
    "currentIndex",
  ];
  const [
    storedCurrentSelected,
    storedSelectedOption,
    storedIsAttempted,
    storedCurrentIndex,
  ] = keys.map((key) => localStorage.getItem(key));

  const [currentIndex, setCurrentIndex] = useState(
    storedCurrentIndex ? Number(storedCurrentIndex) : 1
  );

  const [selectedOption, setSelectedOption] = useState(
    storedSelectedOption
      ? JSON.parse(storedSelectedOption)
      : new Array(questions.length).fill(null)
  );

  const [currentSelected, setCurrentSelected] = useState(
    storedCurrentSelected
      ? JSON.parse(storedCurrentSelected)
      : new Array(questions.length).fill(null)
  );

  const [isAttempted, setIsAttempted] = useState(
    storedIsAttempted
      ? JSON.parse(storedIsAttempted)
      : new Array(questions.length).fill(null)
  );

  const [isProgressShown, setIsProgressShown] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const itemRefs = useRef([]);
  const currentQuestion = questions[currentIndex - 1];

  const tempClicked = () => {
    const tempCurrentSelected = [...currentSelected];
    tempCurrentSelected[currentIndex - 1] = selectedOption[currentIndex - 1];
    return tempCurrentSelected;
  };

  const handleNext = () => {
    if (currentIndex < questions.length) {
      setCurrentSelected(tempClicked);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSaveNext = () => {
    if (currentIndex < questions.length) {
      setCurrentIndex(currentIndex + 1);
      itemRefs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 1) {
      setCurrentSelected(tempClicked);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTimerComplete = () => {
    setTimerComplete(true);
  };

  const showProgress = () => {
    setIsProgressShown(!isProgressShown);
  };

  useEffect(() => {
    localStorage.setItem("currentSelected", JSON.stringify(currentSelected));
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
    localStorage.setItem("isAttempted", JSON.stringify(isAttempted));
    localStorage.setItem("currentIndex", currentIndex);
  });

  return (
    currentQuestion &&
    testDetails[0] && (
      <>
        <div className="w-full p-2 md:p-4 select-none">
          <div className="w-full md:h-[95vh] bg-[#ddd] rounded-md p-2 md:p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
              <div
                className={`w-full flex ${
                  isProgressShown && "flex-wrap"
                } items-center gap-2 p-2 md:p-4 bg-white rounded-md ${
                  !isProgressShown && "overflow-x-auto"
                }`}
              >
                {questions.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center cursor-pointer border-2 border-[#50f]
                  ${currentIndex === item.index && "bg-[#aaa]"}
                  ${
                    isAttempted[item.index - 1] == "attempted" &&
                    "bg-[#2a1] text-white"
                  }  
                  ${
                    isAttempted[item.index - 1] == "skipped" &&
                    "bg-[#f00] text-white"
                  }
                  `}
                    onClick={() => {
                      setCurrentIndex(item.index);
                    }}
                  >
                    {item.index}
                  </div>
                ))}
              </div>
              <div className="w-fit h-fit hidden p-4 md:flex items-center justify-center bg-white rounded-md">
                <FaBars
                  size={20}
                  className="cursor-pointer"
                  onClick={showProgress}
                />
              </div>
              <div className="w-fit h-fit p-2 md:p-4 bg-white rounded-md flex justify-center items-center">
                {!timerComplete ? (
                  <Timer
                    duration={(testDetails[0]?.duration) * 60}
                    onComplete={handleTimerComplete}
                  />
                ) : (
                  <h3>Timer Completed!</h3>
                )}
              </div>
            </div>
            <div className="md:h-[64vh] flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[60%] overflow-auto bg-white rounded-md p-2 md:p-4">
                <div className="">
                  {currentQuestion.index}
                  {") "}
                  {currentQuestion.question}
                </div>
              </div>
              <div className="w-full md:w-[40%] overflow-auto p-2 md:p-4 bg-white rounded-md">
                <div className="flex flex-col items-center gap-4">
                  {Object.values(currentQuestion.options).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        const tempCurrentSelected = [...currentSelected];
                        if (
                          tempCurrentSelected[currentIndex - 1] === item.label
                        ) {
                          tempCurrentSelected[currentIndex - 1] = null;
                        } else {
                          tempCurrentSelected[currentIndex - 1] = item.label;
                        }
                        setCurrentSelected(tempCurrentSelected);
                      }}
                      className={`w-full p-2 md:p-4 cursor-pointer rounded-md border-2 border-[#50f] ${
                        currentSelected[currentIndex - 1] === item.label &&
                        "bg-[#50f] text-white"
                      }`}
                    >
                      {"("}
                      {item.label}
                      {") "}
                      {item.answer}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-2 p-2 md:p-4 bg-white rounded-md">
              <div className="md:w-[60%] flex items-center justify-between gap-2 text-xs md:text-base">
                <div
                  className="button px-2 md:px-4 py-2"
                  onClick={handlePrevious}
                >
                  <FaAngleLeft size={20} />
                </div>
                <div className="button px-2 md:px-4 py-2" onClick={handleNext}>
                  <FaAngleRight size={20} />
                </div>
              </div>
              <div
                className="button px-4 py-2"
                onClick={() => {
                  if (currentSelected[currentIndex - 1] != null) {
                    isAttempted[currentIndex - 1] = "attempted";
                    setIsAttempted(isAttempted);
                  } else {
                    isAttempted[currentIndex - 1] = "skipped";
                  }
                  const tempSelectedOption = [...selectedOption];
                  tempSelectedOption[currentIndex - 1] =
                    currentSelected[currentIndex - 1];
                  setSelectedOption(tempSelectedOption);
                  setCurrentSelected(tempSelectedOption);
                  currentIndex != questions.length && handleSaveNext();
                }}
              >
                {currentIndex == questions.length ? "Submit" : "Save & Next"}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Test;
