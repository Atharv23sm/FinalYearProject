import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import TestPreview from "../components/TestPreview";
import { useAuth } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

function TestDetails() {
  const [questions, setQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState([]);
  const [copied, setCopied] = useState(false);
  const [viewQuestions, setViewQuestions] = useState(false);
  const [error, setError] = useState("");
  const { adminId, isLogged } = useAuth();
  const { testId } = useParams();

  useEffect(() => {
    const getTestDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-test-details/676ee1664bd7fec6aa8afddf`
        );
        setTestDetails(response.data.testDetails[0]);
      } catch (error) {
        console.log(error);
        setError("No Questions found!");
      }
    };
    if (isLogged) {
      getTestDetails();
    }
  }, []);

  useEffect(() => {
    console.log(isLogged);
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/get-questions/${testId}`);
        setQuestions(response.data.questions);
        // console.log(response.data?.questions);
      } catch (error) {
        console.log(error);
        setError("No Questions found!");
      }
    };
    if (isLogged) {
      getQuestions();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen py-16 px-2 md:px-4 flex flex-col gap-4 ">
        <div className="w-full p-2 md:p-4 bg-[#eee] rounded-md">
          <div className="bg-white p-2 md:p-4 rounded-md flex flex-col gap-4">
            <div>Name : {testDetails.name}</div>
            <div>Date : {testDetails.date?.slice(0, 10)}</div>
            <div>Start Time : {testDetails.startTime}</div>
            <div>Duration : {testDetails.duration}</div>
            <div className="flex justify-between items-center gap-2 h-fit rounded-md border-2 border-[#50f]">
              <div
                onClick={async () => {
                  const linkToCopy = window.location.href;
                  await navigator.clipboard.writeText(linkToCopy);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                }}
                className="w-fit p-2 md:p-4 flex gap-2 items-center bg-[#50f] text-white cursor-pointer"
              >
                {copied ? "Copied" : "Link"}
                <FaCopy size={20} />
              </div>
              <div className="w-full md:px-4 text-xs sm:text-sm md:text-base overflow-hidden text-ellipsis ">
                {window.location.href}
              </div>
            </div>
            <div>Total Registered Candidates :</div>
            <div>Total Candidates Attempted :</div>
            <div
              className="w-fit button px-4 py-2"
              onClick={() => {
                setViewQuestions(!viewQuestions);
                window.scrollBy(0, 200);
              }}
            >
              {viewQuestions ? "Hide Questions" : "View Questions"}
            </div>
          </div>
        </div>
        {error ? (
          <div>{error}</div>
        ) : (
          viewQuestions && <TestPreview value={questions} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default TestDetails;
