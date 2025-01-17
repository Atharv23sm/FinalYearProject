import React from "react";

export default function HomeLoader() {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-8 items-center">
      {[1, 2, 3, 4].map((item) => {
        return (
          <div
            key={item}
            className="w-full h-44 bg-white rounded-md animate-[loading_1s_infinite] flex flex-col gap-2 p-2 md:p-4"
          >
            <div className="w-full h-10 bg-[#ddf]" />
            <hr className="border-[#aac] rounded-lg my-4" />
            <div className="w-1/2 h-6 bg-[#ddf]" />
            <div className="w-1/2 h-6 bg-[#ddf]" />
            <div className="w-1/2 h-6 bg-[#ddf]" />
          </div>
        );
      })}
    </div>
  );
}
