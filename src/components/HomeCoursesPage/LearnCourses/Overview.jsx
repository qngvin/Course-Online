import React from "react";

export default function Overview({ courseDetail }) {
  return (
    <div className="py-4 px-4">
      <h1 className="font-bold text-[20px] ">{courseDetail?.name}</h1>
      <p className="text-[11px] py-4 text-[#616161]">
        {courseDetail?.description}
      </p>
      <h1 className="font-semibold text-[12px] pb-1">
        The course will have{" "}
        <span className="text-blue-700">{courseDetail?.sections.length}</span>{" "}
        sections
      </h1>
      <ul className="text-[11px] list-disc text-[#616161] ml-4">
        {courseDetail &&
          courseDetail.sections.map((section) => (
            <li key={section.id} className="p-1">
              {section.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
