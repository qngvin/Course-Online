import React, { useState } from "react";
import CatalogNav from "../components/CatalogInstructor/CatalogNav";

import TableCourse from "../components/CatalogInstructor/TableCourse";
import SearchBarCourse from "../components/Instructor/SearchBarCourse";
export default function CatalogPage() {
  //declare
  const [showForm, setShowForm] = useState(1);

  //handle
  const handleButtonClick = (value) => {
    setShowForm(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (value) => {
    setSearchTerm(value.toLowerCase());
    console.log(value);
  };
  return (
    <div className="h-full md:px-8 pb-5 overflow-y-auto">
      <div className="px-2 h-[70px]">
        <CatalogNav />
      </div>
      <div className=" flex items-center justify-between pt-4 px-2">
        <ul className="flex gap-10">
          <li>
            <button
              onClick={() => handleButtonClick(1)}
              autoFocus
              className={`${
                showForm === 1 ? "bg-red_1 text-[#4B4B4B]" : ""
              } px-2 focus:outline-none cursor-pointer rounded-[10px] text-[16px] `}
            >
              Ongoing Courses
            </button>
          </li>
        </ul>
        <SearchBarCourse
          inputText={searchTerm}
          inputHandler={handleSearchChange}
        />
      </div>
      <div className="pt-4">
        {showForm === 1 && (
          <TableCourse
            inputText={searchTerm}
            inputHandler={handleSearchChange}
          />
        )}
      </div>
    </div>
  );
}
