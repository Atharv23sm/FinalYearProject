import React from "react";

function TestPreview(questions) {
  return (
    <div className="w-full p-2 md:p-4 bg-[#eee] rounded-md flex flex-col gap-4">
      {questions.value.map((item, index) => (
        <div
          key={index}
          className="w-full p-2 md:p-4 bg-white rounded-md flex flex-col gap-4"
        >
          <div>
            {"Question " + item.index + " : "}
            <br />
            {item.question}
          </div>
          <div>
            {"Options : "}
            <br />
            <div>
              {Object.values(item.options).map((item, index) => (
                <div key={index}>{item.label + ") " + item.answer}</div>
              ))}
            </div>
          </div>
          <div>{"Correct Answer : " + item.correctAnswer}</div>
        </div>
      ))}
    </div>
  );
}

export default TestPreview;
