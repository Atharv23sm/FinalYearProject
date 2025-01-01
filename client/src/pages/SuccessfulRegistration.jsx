import React from "react";

function SuccessfulRegistration() {
  return (
    <div className="w-full px-4 min-h-screen flex justify-center items-center">
      <div className="w-full h-fit md:w-1/2 p-2 md:p-4 bg-[#ddf] rounded-md">
        <div className="w-full p-2 md:p-4 bg-[#eef] rounded-md text-center">
          <div className="test-base md:text-lg font-bold">
            Successfully registered for the test.
          </div>
          <div test-base md:text-lg font-bold>
            You will be notified via email prior to starting the aptitude test.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessfulRegistration;
