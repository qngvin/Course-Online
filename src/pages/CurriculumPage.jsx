import React from "react";
import ProfilePageNav from "../components/ProfilePage/ProfilePageNav";
import Curriculum from "../components/Instructor/CreatCourse/Curriculum";

function CurriculumPage() {
  return (
    <div className="h-full">
      <div className="h-full overflow-y-scroll">
        <div className="h-[10%]">
          <ProfilePageNav text={"Lesson"} />
        </div>
        <div className="h-[90%] px-10 py-5">
          <div className="h-full overflow-y-auto bg-gray_1 rounded-[10px] px-4 py-5">
            <Curriculum />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurriculumPage;
