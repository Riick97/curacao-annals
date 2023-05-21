import React from 'react'
import Image from "next/image";
import logo from "/components/gobiernu.png";
import thumbnail from "/components/thumbnail.png";

export default function Footer() {
  return (
    <footer
      className={
        "bg-[#3b3736] text-white h-72 p-32 flex justify-between items-end"
      }
    >
      <div>
        <div className="w-36 h-12 relative mr-5 ">
          <Image
            className={"text-white "}
            src={thumbnail}
            layout="fill"
            objectFit="cover"
            objectPosition={"50% 57%"}
            alt=""
          />
        </div>
        {/* <a href="#">ETE</a> */}
      </div>

      {/* <Link href='/PageUserAgreements'>
        <h2 className="text-gray-200 text-xs font-medium tracking-wide cursor-pointer">
            Gebruikervoorwaarden
        </h2>
        </Link> */}
    </footer>
  );
}
