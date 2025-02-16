import { useEffect, useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight, FaBars, FaClock } from "react-icons/fa";
import Timer from "../components/Timer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../url";
import axiosCandidateInstance from "../axiosCandidateInstance";

function Test() {
  const [questions, setQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState([]);
  const [error, setError] = useState("");
  const [duration, setDuration] = useState(null);
  const [isProgressShown, setIsProgressShown] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [wasCheating, setWasCheating] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { testId } = useParams();
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    // console.log(selectedOption);
    try {
      setIsSubmitting(true);
      const response = await axiosCandidateInstance.post(`/submit-test`, {
        testId: testId,
        selectedOption: selectedOption,
        wasCheating: wasCheating,
      });
      // console.log(response);
      alert("Test submitted successfully!");
      const storedKeys = [
        "currentSelected",
        "selectedOption",
        "isAttempted",
        "currentIndex",
        "timeLeft",
      ];
      storedKeys.map((key) => localStorage.removeItem(key));
      setIsSubmitting(false);
      navigate("/end-page");
    } catch (err) {
      setIsSubmitting(false);
      console.error("Error submitting test:", err);
      setError(err.response.date.message);
    }
  };

  useEffect(() => {
    const checkCandidateAttempt = async () => {
      const response = await axiosCandidateInstance.post(
        `/check-candidate-attempt`,
        {
          testId: testId,
        }
      );
      if (!response.data.isFirstAttempt) {
        navigate("/end-page");
      }
    };
    checkCandidateAttempt();
    localStorage.setItem("currentSelected", JSON.stringify(currentSelected));
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
    localStorage.setItem("isAttempted", JSON.stringify(isAttempted));
    localStorage.setItem("currentIndex", currentIndex);
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setTabSwitchCount((prevCount) => prevCount + 1);
        alert("Switching tabs more than 5 times is considered cheating!");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    tabSwitchCount > 5 && setWasCheating(true);
  }, [tabSwitchCount]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-questions/${testId}`);
        setQuestions(response.data.questions);
      } catch (err) {
        console.log(err);
        setError("No Questions found!");
      }
    };
    // if (adminId) {
    getQuestions();
    // }
  }, []);

  useEffect(() => {
    const getTestDuration = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/get-test-details/${testId}`
        );
        setTestDetails(response.data.testDetails);
      } catch (err) {
        console.log(err);
        setError("No Questions found!");
      }
    };

    getTestDuration();

    const intervalId = setInterval(() => {
      const currentIST = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(currentIST);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [testId, BASE_URL]);

  useEffect(() => {
    if (testDetails.date) {
      const mongoDate = new Date(testDetails.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      mongoDate.setHours(0, 0, 0, 0);
      // console.log(mongoDate.getTime(), today.getTime());
      // console.log(mongoDate.getTime() >= today.getTime());
      if (mongoDate.getTime() >= today.getTime()) {
        if (currentTime && testDetails) {
          const setExactDuration = () => {
            const [h1, m1] = currentTime.split(":").map(Number);
            const t1 = h1 * 60 + m1;

            const [h2, m2] = testDetails.startTime
              ? testDetails.startTime.split(":").map(Number)
              : [0, 0];
            const t2 = h2 * 60 + m2;

            console.log(t1, t2 + testDetails?.duration);

            if (t1 - (t2 + testDetails?.duration) >= 0) {
              handleSubmit();
            } else {
              const calculatedDuration =
                (testDetails?.duration - (t1 - t2)) * 60;
              setDuration(calculatedDuration);
            }
          };
          setExactDuration();
        }
      } else {
        navigate("/end-page");
      }
    }
  }, [currentTime, testDetails]);

  return (
    currentQuestion &&
    testDetails && (
      <>
        <div className="w-full p-2 md:p-4 select-none">
          <div className="w-full md:h-[95vh] bg-[#eef] rounded-md p-2 md:p-4 flex flex-col gap-4">
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
                    className={`w-10 h-10 rounded-md flex flex-shrink-0 items-center justify-center cursor-pointer border-2 border-[#50f]
                  ${
                    currentIndex === item.index
                      ? "bg-[#eef]"
                      : isAttempted[item.index - 1] == "attempted"
                      ? "bg-[#2a1] text-white"
                      : isAttempted[item.index - 1] == "skipped" &&
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
                  duration !== null ? (
                    <Timer
                      duration={duration}
                      onComplete={handleTimerComplete}
                    />
                  ) : (
                    <FaClock size={20} className="animate-pulse" />
                  )
                ) : (
                  <h3>Timer Completed!</h3>
                )}
              </div>
            </div>

            {error && <div className="error m-0 p-0 md:text-md">{error}</div>}

            <div className="md:h-[64vh] flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[60%] overflow-auto bg-white rounded-md p-2 md:p-4 space-y-4">
                <div className="">
                  {currentQuestion.index}
                  {") "}
                  {currentQuestion.question}
                </div>
                {currentQuestion.image && (
                  <img
                    src={currentQuestion.image}
                    alt={`Question ${currentIndex.index}`}
                    className="w-full h-auto rounded-md border border-[#50f]"
                  />
                )}
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
                  {currentIndex == questions.length ? "Save" : "Save & Next"}
                </div>
              </div>

              <div
                onClick={() => {
                  confirm("Are you sure? You are submitting the test.") &&
                    handleSubmit();
                }}
                className="button p-4"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Test;
