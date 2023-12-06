import React from "react";
import { useLocation } from "react-router-dom";

export default function SectionDetail() {
  const location = useLocation();
  const sectionCurrent = location.state?.section;
  return (
    <div className="border border-solid border-gray_2 rounded-[5px] px-4 py-4">
      <h1 className="font-medium">
        {sectionCurrent?.no}. {sectionCurrent?.name}
      </h1>
      <p dangerouslySetInnerHTML={{ __html: sectionCurrent?.description }} />
    </div>
  );
}
