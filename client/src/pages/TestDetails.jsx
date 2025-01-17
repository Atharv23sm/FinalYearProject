import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import TestPreview from "../components/TestPreview";
import { useAuth } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URL } from "../url";
import TestLink from "../components/TestLink";
import { LuTrash2 } from "react-icons/lu";

function TestDetails() {
  const [questions, setQuestions] = useState([]);
  const [testDetails, setTestDetails] = useState([]);
  const [registeredCount, setRegisetredCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [viewQuestions, setViewQuestions] = useState(false);
  const [isMailsSending, setIsMailsSending] = useState(false);
  const [error, setError] = useState("");
  const { adminId } = useAuth();
  const { testId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTestDetails = async () => {
      try {
        const response = await axiosInstance.get(`/get-test-details/${testId}`);
        setTestDetails(response.data.testDetails);
        setRegisetredCount(response.data.registeredCount);
        setSubmittedCount(response.data.submittedCount);
      } catch (error) {
        // console.log(error);
        setError(err.response.data.message);
      }
    };
    if (adminId) {
      getTestDetails();
    }
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/get-questions/${testId}`);
        setQuestions(response.data.questions);
        // console.log(response.data?.questions);
      } catch (err) {
        // console.log(error);
        setError(err.response.data.message);
      }
    };
    if (adminId) {
      getQuestions();
    }
  }, []);

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const deteleTest = async () => {
    try {
      const response = await axiosInstance.delete(`/delete-test/${testId}`);
      // console.log(response);
      alert("Test has been successfully deleted.");
      navigate("/home");
    } catch (err) {
      // console.log(error);
      setError("No Questions found!");
    }
  };

  const sendMail = async () => {
    try {
      setIsMailsSending(true);
      const response = await axiosInstance.post(`/send-test-mails/${testId}`, {
        testLink: `${CLIENT_URL}/candidate-login/${testId}`,
      });
      setIsMailsSending(false);
      response && alert("Emails have been sent successfully.");
      // console.log(response.data);
      // console.log(response.data.message);
      // console.log("Total Mail Sent: ",response.data.totalEmails);
    } catch (err) {
      // console.log(error);
      setIsMailsSending(false);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen py-16 px-2 md:px-4 flex flex-col gap-4 ">
        <div className="w-full p-2 md:p-4 bg-[#eef] rounded-md">
          <div className="bg-white p-2 md:p-4 rounded-md flex flex-col gap-4">
            <div>Name : {testDetails.name}</div>
            <div>Date : {testDetails.date?.slice(0, 10)}</div>
            <div>Start Time : {testDetails.startTime}</div>
            <div>Duration : {testDetails.duration}</div>
            <div
              className="w-fit button px-4 py-2 mb-6"
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth",
                });
                setViewQuestions(!viewQuestions);
              }}
            >
              {viewQuestions ? "Hide Questions" : "View Questions"}
            </div>
            <TestLink
              link={`${CLIENT_URL}/test-register/${testId}`}
              text="Candidate Registration Link"
            />
            <TestLink
              link={`${CLIENT_URL}/candidate-login/${testId}`}
              text="Candidate Login Link"
            />

            <div
              onClick={() => {
                if (
                  confirm("Are you sure? You're sending the link via email.")
                ) {
                  !isMailsSending && sendMail();
                }
              }}
              className="button w-fit px-4 py-2 mb-6"
            >
              {!isMailsSending
                ? "Send candidate login link via email"
                : "Sending..."}
            </div>

            <div>Total Registered Candidates : {registeredCount}</div>
            <div>Total Candidates Attempted : {submittedCount}</div>

            <div className="w-full flex justify-between items-end">
              <div
                onClick={() => {
                  navigate(`/test-results/${testId}`);
                }}
                className="button w-fit p-4"
              >
                Results
              </div>
              <LuTrash2
                onClick={() => {
                  confirm("Are you sure? You're deleting the test.") &&
                    deteleTest();
                }}
                size={28}
                color="white"
                className="p-1 bg-[#f00] rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>
        {viewQuestions && (
          <TestPreview value={{ questions, setViewQuestions }} />
        )}
      </div>
      <Footer />
    </>
  );
}

export default TestDetails;
