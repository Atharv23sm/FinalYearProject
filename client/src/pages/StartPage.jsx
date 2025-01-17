import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosCandidateInstance from "../axiosCandidateInstance";
import Instructions from "../components/Instructions";

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
        // console.log(response.data.testDetails);
        setTestDetails(response.data.testDetails);
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
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(currentIST);
    }, 1000);
  }, []);

  const checkIsTestStarted = () => {
    const mongoDate = new Date(testDetails.date ? testDetails.date : null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    mongoDate.setHours(0, 0, 0, 0);

    if (mongoDate.getTime() >= today.getTime()) {
      if (currentTime) {
        const [h1, m1] = currentTime.split(":").map(Number);
        const t1 = h1 * 60 + m1;

        const [h2, m2] = testDetails.startTime
          ? testDetails.startTime.split(":").map(Number)
          : [0, 0];
        const t2 = h2 * 60 + m2;

        return t1 >= t2;
      }
    } else {
      return false;
    }
  };

  const checkIsTestEnded = () => {
    const mongoDate = new Date(testDetails.date ? testDetails.date : null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    mongoDate.setHours(0, 0, 0, 0);

    if (mongoDate.getTime() >= today.getTime()) {
      if (currentTime) {
        const [h1, m1] = currentTime.split(":").map(Number);
        const t1 = h1 * 60 + m1;

        const [h2, m2] = testDetails.startTime
          ? testDetails.startTime.split(":").map(Number)
          : [0, 0];
        const t2 = h2 * 60 + m2 + testDetails.duration;
        return t1 >= t2;
      }
    } else {
      return true;
    }
  };

  return (
    <div className="w-full p-4 md:p-6 lg:p-8 min-h-screen">
      <div className="w-full h-fit flex flex-col items-center gap-4 p-2 md:p-4 bg-[#ccf] rounded-md">
        <div className="w-full p-2 md:p-4 bg-white rounded-md">
          {currentTime == null ? (
            "..."
          ) : checkIsTestEnded() ? (
            "The test has been ended."
          ) : checkIsTestStarted() ? (
            <>
              <div className="text-lg text-center font-bold">
                The test is going on.
              </div>
              <Instructions />
            </>
          ) : (
            <>
              <div className="text-lg text-center">
                Get ready! Your test is about to start soon.
              </div>
              <Instructions/>
            </>
          )}
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
            checkIsTestEnded()
              ? "hidden"
              : !checkIsTestStarted()
              ? "hidden"
              : currentTime == null
              ? "hidden"
              : "block"
          }`}
        >
          Start Test
        </div>
      </div>
    </div>
  );
}
