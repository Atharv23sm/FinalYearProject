import { FaAngleLeft, FaAngleRight, FaBars } from "react-icons/fa";

export default function Instructions() {
  return (
    <p className="text-sm md:text-base">
      {"Instructions:"}
      <br />
      {
        "1) At the top right of the screen, you will see a Timer showing the remaining time for the test. Keep an eye on it to ensure you complete the test within the allotted time."
      }
      <br />
      {
        "2) On the top side of the screen, you will find rounded boxes displaying question numbers. These represent all the questions in the test. You can click on any question number to directly jump to that question."
      }
      <br />
      {"3) Click the "}
      <FaBars />
      {
        "icon to see all the question numbers at once. This allows you to quickly navigate through your test and check your progress."
      }
      <br />
      {
        "4) Each question will present 4 answer options labeled A, B, C, and D. Select the correct option for each question."
      }
      <br />
      {
        '5) After selecting your answer, click the "Save & Next" button to save your answer and move to the next question.'
      }
      <br />
      {"6) Use the"}
      <span className="flex">
        <FaAngleLeft />
        <FaAngleRight />
      </span>{" "}
      {
        "to navigate between questions. You can go back to review any previous question or move forward to the next one."
      }
      <br />
      {
        '7) Once you have answered the questions, click the "Submit" button at the bottom right of the screen to finalize and submit your test.'
      }
    </p>
  );
}
