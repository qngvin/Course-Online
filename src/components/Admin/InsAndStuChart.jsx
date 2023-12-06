import React from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function InsAndStuChart() {
  const { totalStudents, totalInstructors } = useSelector(
    (state) => state.adminReducer
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const mergedData = totalStudents.map((student) => {
    const instructor = totalInstructors.find(
      (inst) => inst.month === student.month
    );
    return {
      month: months[student.month - 1],
      Student: student.numOfStudent,
      Instructor: instructor ? instructor.numOfInstructor : 0,
    };
  });
  // console.log(mergedData)
  return (
    <div className="col-span-7 p-4   border border-solid border-[#e8e8e8] rounded-[5px] hover:transform hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-box_shadow_10 transition-transform duration-300">
      <h1 className="text-center text-[20px] font-semibold">
        Students - Instructors
      </h1>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={"100%"}
          height={300}
          data={mergedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Student"
            fill="#61A3BA"
            activeBar={<Rectangle fill="#61A3BA" stroke="#61A3BA" />}
          />
          <Bar
            dataKey="Instructor"
            fill="#D2DE32"
            activeBar={<Rectangle fill="#D2DE32" stroke="#D2DE32" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
