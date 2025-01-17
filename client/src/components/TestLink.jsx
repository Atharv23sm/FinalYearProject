import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function TestLink({ link, text }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex tems-center flex-col lg:flex-row lg:gap-2 h-fit rounded-md border-2 border-[#50f]">
      <div
        onClick={async () => {
          const linkToCopy = link;
          await navigator.clipboard.writeText(linkToCopy);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 3000);
        }}
        className="w-full lg:w-max px-4 py-2 flex gap-2 items-center bg-[#50f] text-white cursor-pointer"
      >
        {copied ? "Copied" : text}
        <FaCopy size={20} />
      </div>
      <div className="place-content-center px-4 py-2 text-sm md:text-base overflow-hidden text-ellipsis ">
        {link}
      </div>
    </div>
  );
}
