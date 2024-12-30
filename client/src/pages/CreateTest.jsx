import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { BASE_URL } from "../url";
import axiosInstance from "../axiosInstance";
import { FaDownload } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import SubmitButton from "../components/SubmitButton";
import TestPreview from "../components/TestPreview";

export default function CreateTest() {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [testFile, setTestFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState(formattedDate);
  const [testStartTime, setStartTime] = useState("");
  const [questions, setQuestions] = useState([]);
  // const [currentTime, setCurrentTime] = useState({ hours: "", minutes: "" });
  const [testDuration, setTestDuration] = useState("");
  const [error, setError] = useState("");
  const { adminId } = useAuth();

  const downloadTemplate = () => {
    window.location.href = `${BASE_URL}/download-template`;
  };

  const formData = new FormData();
  const navigate = useNavigate();

  const previewTest = async (e) => {
    // e.preventDefault();
    if (testFile) {
      formData.append("file", testFile);
      try {
        const response = await axiosInstance.post(
          `/get-test-preview`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        response.data && setQuestions(response.data.questions);
        setIsUploaded(true);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("file", testFile);
    formData.append("name", testName);
    formData.append("duration", testDuration);
    formData.append("adminId", adminId);
    formData.append("date", testDate);
    formData.append("time", testStartTime);
    try {
      const response = await axiosInstance.post("/create-test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 200) {
        alert("The test has been created successfully.");
        navigate("/home");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  // useEffect(() => {
  //   let hours = today.getHours();
  //   let minutes = today.getMinutes();
  //   if (hours < 10) hours = "0" + hours;
  //   if (minutes < 10) minutes = "0" + minutes;
  //   setCurrentTime({ hours: hours, minutes: minutes });
  // }, [testStartTime]);

  useEffect(() => {
    previewTest();
  }, [testFile, setTestFile]);

  return adminId ? (
    <>
      <Header />
      <div className="min-w-full min-h-screen py-16 px-2 sm:px-4 md:px-6 flex flex-col justify-center">
        <div className="w-full p-2 md:p-4 bg-[#eef] flex flex-col md:flex-row md:justify-between gap-4 rounded-md">
          <div className="w-full md:p-4 text-sm md:text-base">
            Instructions :
            <br />
            1) Click the Download Template button to get the Excel template.{" "}
            <br />
            <div className="w-fit h-fit my-[10px] px-4 py-2 rounded-md bg-[#50f] hover:bg-[#31b] duration-500 text-white cursor-pointer text-base flex items-center gap-2">
              <button type="button" onClick={downloadTemplate}>
                Download Template
              </button>
              <FaDownload size={16} />
            </div>
            2) Open the downloaded Excel file. <br />
            3) Enter your questions in the "Question" column. <br />
            4) Provide the answer options (A, B, C, D) in the corresponding
            columns. <br />
            5) Mark the correct answer in the "Answer" column.
            <br />
            Example, if 'A' is correct answer then mark 'A' in the "Answer"
            column.
            <br />
            6) After filling out the template, save the file in .xlsx format.
            <br />
            7) Select the filled file, and click Open to upload.
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-md p-3"
          >
            <div className="mb-[10px]">
              Test Name <br />
              <input
                type="text"
                name="testName"
                required
                value={testName}
                className="formInput"
                onChange={(e) => {
                  setTestName(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="mb-[10px]">
              Test Date <br />
              <input
                type="date"
                name="testDate"
                required
                value={testDate}
                min={formattedDate}
                className="formInput"
                onChange={(e) => {
                  setTestDate(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="mb-[10px]">
              Start Time <br />{" "}
              <input
                type="time"
                name="testStartTime"
                required
                value={testStartTime}
                className="formInput"
                onChange={(e) => {
                  // const [h, m] = e.target.value.split(":");
                  // if (currentTime.hours <= h && currentTime.minutes + 5 < m) {
                  //   setStartTime(e.target.value);
                  // } else {
                  //   alert(
                  //     "Please set the time 5 minutes ahead from current time."
                  //   );
                  // }
                  setStartTime(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="mb-[10px] ">
              Duration (in minutes)
              <br />
              <input
                type="number"
                name="testDuration"
                required
                value={testDuration}
                className="formInput"
                onChange={(e) => {
                  setTestDuration(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="mb-[10px]">
              Upload the File
              <br />
              <input
                type="file"
                name="file"
                accept=".xls,.xlsx"
                required
                className="formInput"
                onChange={(e) => {
                  setIsUploaded(false);
                  setTestFile(e.target.files[0]);
                  setQuestions([]);
                  setError("");
                }}
              />
            </div>
            <div className="flex gap-2 items-center text-sm py-4">
              <input type="checkbox" name="CheckB" required />
              I've read all the instructions carefully.
            </div>

            {error && <div className="error md:text-md">{error}</div>}

            <div className="w-full flex flex-wrap justify-between py-4 gap-4">
              {isUploaded && (
                <div
                  className="button px-2 md:px-4 py-2"
                  onClick={() => {
                    setIsPreviewClicked(!isPreviewClicked);
                  }}
                >
                  {isPreviewClicked ? "Hide preview" : "Preview Test"}
                </div>
              )}
              <SubmitButton value="Create" />
            </div>
          </form>
        </div>
        {isPreviewClicked && <TestPreview value={questions} />}
      </div>
      <Footer />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}
