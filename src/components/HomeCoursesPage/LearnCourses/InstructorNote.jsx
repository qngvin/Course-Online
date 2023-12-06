import React from "react";

export default function InstructorNote({instructorDetail}){
    
    return(
    <div className="py-4 px-4 flex gap-4 items-center"> 

        <img src={instructorDetail?.image}

            className="rounded-[50%] w-[80px] h-[80px]"
        />
        <div className="flex flex-col">
            <h1>{instructorDetail?.lastName} {instructorDetail?.firstName}</h1>
        </div>
    </div>

    )
}