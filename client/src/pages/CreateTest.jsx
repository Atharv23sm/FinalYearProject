import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import SubmitButton from "../components/SubmitButton";

function CreateTest() {
  const [testName, setTestName] = useState("");
  const [testDuration, setTestDuration] = useState("");
  const [error, setError] = useState("");
  const [testFile, setTestFile] = useState("");


  const handleSubmit = async()=>{};

  return (
    <>
      <Header />
      <div className="min-w-full min-h-screen py-16 px-2 sm:px-4 md:px-6 flex justify-center">
        <div className="w-full p-2 md:p-4 bg-[#eee] flex flex-col md:flex-row md:justify-between gap-4 rounded-md">
          <div className="w-full md:p-4 text-sm md:text-base">
            Instructions :
            <br />
            1) Click the Download Template button to get the Excel template.{" "}
            <br />
            <div className="w-fit h-fit my-[10px] px-4 py-2 rounded-md bg-[#50f] hover:bg-[#31b] duration-500 text-white cursor-pointer text-base flex items-center gap-2">
              Download Template
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
            <div className=" mb-[10px]  ">
              Test Name <br />
              <input
                type="text"
                name="testName"
                required
                value={testName}
                className="w-full border-[1px] md:border-2 border-[#50f] rounded-md outline-none p-[6px] bg-transparent"
                onChange={(e) => {
                  setTestName(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className=" mb-[10px]  ">
              Duration (in minutes)
              <br />
              <input
                type="number"
                name="testDuration"
                required
                value={testDuration}
                className="w-1/2 border-[1px] md:border-2 border-[#50f] rounded-md outline-none p-[6px] bg-transparent"
                onChange={(e) => {
                  setTestDuration(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className=" mb-[10px] ">
              Upload the File
              <br />
              <input
                type="file"
                name="testFile"
                accept=".xls, .xlsx"
                required
                className="w-full border-[1px] md:border-2 border-[#50f] rounded-md outline-none p-[6px] bg-transparent"
                onChange={(e) => {
                  setTestFile(e.target.files[0])
                  setError("");
                }}
              />
            </div>
            <div className="flex gap-2 items-center text-sm py-4">
              <input type="checkbox" name="CheckB" required/>I've read all the instructions carefully.
            </div>
            <div className="w-full flex justify-center py-4">
              <SubmitButton value="Create" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateTest;
