import React from "react";

export default function EndPage() {
  return (
    <div className="w-full px-4 min-h-screen flex justify-center items-center">
      <div className=" p-4 bg-[#eef] rounded-md">
        <div className="w-[16rem] h-[16rem] p-4 bg-[#88f] rounded-md font-bold text-[#003] flex flex-col gap-4">
          <div>
            <div className="text-[4.5rem] leading-none">Thank</div>
            <div className="text-[6.7rem] leading-none -translate-y-4">you!</div>
          </div>
          <div className="font-semibold text-center ">Test Submission Received.</div>
        </div>
      </div>
    </div>
  );
}
