import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center min-h-[90vh] p-12 border gap-8">
        <div className="flex items-center justify-center w-full max-w-2xl gap-2 p-2 text-xl border rounded-2xl hover:border-black">
          <input
            placeholder="Search Blockchain Names"
            size="large"
            className="w-full p-4 border-none"
          />
          <button className="p-4 px-8 bg-accent rounded-2xl focus:shadow-none">
            Search
          </button>
        </div>
        <ul className="flex gap-4 select">
          <li className="px-4 py-2 border rounded-full hover:border-black">
            .eth
          </li>
          <li className="px-4 py-2 border rounded-full hover:border-black">
            .apt
          </li>
          <li className="px-4 py-2 border rounded-full hover:border-black">
            .fil
          </li>
          <Link className="px-4 py-2 border rounded-full hover:border-black">
            Create Custom Space
          </Link>
        </ul>
      </div>
      <div></div>
    </section>
  );
};

export default index;
