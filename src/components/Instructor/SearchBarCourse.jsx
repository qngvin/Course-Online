import React from "react";

import { useState } from "react";
function SearchBarCourse({ inputText, inputHandler, setInputText }) {
  return (
    <div>
      <input
        className="py-1 w-[350px] border border-solid border-black rounded-lg px-2"
        type="text"
        placeholder="Search..."
        value={inputText}
        onChange={(e) => inputHandler(e.target.value)}
      />
    </div>
  );
}

export default SearchBarCourse;
