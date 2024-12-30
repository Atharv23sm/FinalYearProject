import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosCandidateInstance from "../axiosCandidateInstance";

export default function StartPage() {
  const [currentTime, setCurrentTime] = useState(null);
  const [testDetails, setTestDetails] = useState({});
  const navigate = useNavigate();
  const testId = useParams().testId;

  useEffect(() => {
    const getTestDetails = async () => {
      try {
        const response = await axiosCandidateInstance.get(
          `/get-test-details/${testId}`
        );
        console.log(response.data.testDetails)
        setTestDetails(response.data.testDetails);
        // console.log(response);
      } catch (err) {
        // setError(err.response.data.message);
        console.log(err);
      }
    };
    getTestDetails();

    setInterval(() => {
      const currentIST = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });
      setCurrentTime(currentIST.slice(12, 17));
    }, 1000);
  }, []);

  const checkIsTestStarted = () => {
    if (currentTime) {
      const [h1, m1] = currentTime.split(":").map(Number);
      const t1 = h1 * 60 + m1;

      console.log(testDetails)
      const [h2, m2] = testDetails.startTime.split(":").map(Number);
      const t2 = h2 * 60 + m2;
      // console.log(t1,t2)
      return t1 >= t2;
    }
  };

  const checkIsTestEnded = () => {
    if (currentTime) {
      const [h1, m1] = currentTime.split(":").map(Number);
      const t1 = h1 * 60 + m1;

      const [h2, m2] = testDetails.startTime.split(":").map(Number);
      const t2 = h2 * 60 + m2 + testDetails.duration;
      // console.log(t1, t2);
      return t1 >= t2;
    }
  };

  return (
    <div className="w-full px-4 min-h-screen flex justify-center items-center">
      <div className="w-full h-fit flex flex-col items-center gap-4 md:w-1/2 p-2 md:p-4 bg-[#ccf] rounded-md">
        <div className="w-full p-2 md:p-4 bg-white rounded-md flex justify-center text-lg">
          {currentTime == null
            ? "..."
            : !checkIsTestStarted()
            ? "Get ready! Your test is about to start soon."
            : checkIsTestEnded()
            ? "The test has been ended."
            : "The test is going on."}
        </div>
        <div
          onClick={() => {
            {
              checkIsTestStarted() &&
                !checkIsTestEnded() &&
                navigate(`/test/${testId}`);
            }
          }}
          className={`button w-fit p-4 ${
            !checkIsTestStarted()
              ? "hidden"
              : checkIsTestEnded()
              ? "hidden"
              : currentTime == null
              ? ""
              : "block"
          }`}
        >
          Start Test
        </div>
      </div>
    </div>
  );
}
