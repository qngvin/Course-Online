import React, { useEffect } from "react";
import HeaderReusable from "../../components/Admin/HeaderReusable";
import StatisticsChart from "../../components/Admin/StatisticsChart";
import {
  faBookOpen,
  faCoins,
  faGraduationCap,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import RevenueChart from "../../components/Admin/RevenueChart";
import CompleteChart from "../../components/Admin/CompleteChart";
import StatisticsCourses from "../../components/Admin/StatisticsCourses";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalCourses,
  getTotalEarning,
  getTotalInstructors,
  getTotalStudents,
} from "../../store/slices/adminSlice";
import InsAndStuChart from "../../components/Admin/InsAndStuChart";

export default function DashBoardPage() {
  //declare
  const dispatch = useDispatch();
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  let lastMonth = currentTime.getMonth();
  let currentMonth = currentTime.getMonth() + 1;
  const { revenue,totalStudents, totalInstructors, totalCourses } = useSelector(
    (state) => state.adminReducer
  );

  //Calculator
  let totalRevenueYear = revenue?.reduce((acc, month) => {
    return acc + month.earning;
  }, 0);
  let totalStudentYear = totalStudents?.reduce((acc, month) => {
    return acc + month.numOfStudent;
  }, 0);
  let totalInstructorYear = totalInstructors?.reduce((acc, month) => {
    return acc + month.numOfInstructor;
  }, 0);
  let totalCoursesYear = totalCourses?.reduce((acc, month) => {
    return acc + month.totalCourses;
  }, 0);

  function GrowthRate(currentValue, previousValue) {
    if (previousValue === 0) {
      return 0;
    }

    return ((currentValue - previousValue) / previousValue) * 100;
  }

  function getTotalCurrentMonth(monthlyData, currentMonth, name) {
    const currentMonthData = monthlyData?.find(
      (item) => item.month === currentMonth
    );

    return currentMonthData ? currentMonthData[name] : 0;
  }

  function getTotalLastMonth(monthlyData, lastMonth, name) {
    const currentMonthData = monthlyData?.find(
      (item) => item.month === lastMonth
    );

    return currentMonthData ? currentMonthData[name] : 0;
  }
  const totalRevenueLastMonth = getTotalLastMonth(
    revenue,
    lastMonth,
    "earning"
  );
  const totalStudentCountLastMonth = getTotalLastMonth(
    totalStudents,
    lastMonth,
    "numOfStudent"
  );
  const totalInstructorCountLastMonth = getTotalLastMonth(
    totalInstructors,
    lastMonth,
    "numOfInstructor"
  );
  const totalCoursesLastMonth = getTotalLastMonth(
    totalCourses,
    lastMonth,
    "totalCourses"
  );
  const totalRevenueCurrentMonth = getTotalLastMonth(
    revenue,
    currentMonth,
    "earning"
  );
  const totalStudentCountCurrentMonth = getTotalCurrentMonth(
    totalStudents,
    currentMonth,
    "numOfStudent"
  );
  const totalInstructorCountCurrentMonth = getTotalCurrentMonth(
    totalInstructors,
    currentMonth,
    "numOfInstructor"
  );
  const totalCoursesCurrentMonth = getTotalCurrentMonth(
    totalCourses,
    currentMonth,
    "totalCourses"
  );
  const growthRevenue = GrowthRate(
    totalRevenueCurrentMonth,
    totalRevenueLastMonth
  );
  const growthStudent = GrowthRate(
    totalStudentCountCurrentMonth,
    totalStudentCountLastMonth
  );
  const growthInstructor = GrowthRate(
    totalInstructorCountCurrentMonth,
    totalInstructorCountLastMonth
  );
  const growthCourse = GrowthRate(
    totalCoursesCurrentMonth,
    totalCoursesLastMonth
  );

  useEffect(() => {
    dispatch(getTotalStudents(year));
    dispatch(getTotalInstructors(year));
    dispatch(getTotalCourses(year));
    dispatch(getTotalEarning(year));
  }, [dispatch]);
  return (
    <div className="w-full px-4 py-4 overflow-y-scroll">
      <HeaderReusable text={"Dashboard"} border={"b"} />
      <div className="grid grid-cols-12 gap-4 w-full ">
        <StatisticsChart
          title={"Overall earnings"}
          icon={faCoins}
          bgIcon={"#3361dd"}
          total={totalRevenueYear}
          data={revenue}
          dataKey={"earning"}
          growth={growthRevenue.toFixed(2)}
          
        />

        <StatisticsChart
          title={"Total Students"}
          icon={faGraduationCap}
          bgIcon={"#ee721b"}
          total={totalStudentYear}
          data={totalStudents}
          dataKey={"numOfStudent"}
          growth={growthStudent.toFixed(2)}
        />
        <StatisticsChart
          title={"Total Instructors"}
          icon={faUserGroup}
          bgIcon={"#61c669"}
          total={totalInstructorYear}
          data={totalInstructors}
          dataKey={"numOfInstructor"}
          growth={growthInstructor.toFixed(2)}
        />

        <StatisticsChart
          title={"Total Courses"}
          icon={faBookOpen}
          bgIcon={"#d73bec"}
          total={totalCoursesYear}
          data={totalCourses}
          dataKey={"totalCourses"}
          growth={growthCourse.toFixed(2)}
        />
        <RevenueChart />
        <CompleteChart />
        <StatisticsCourses />
        <InsAndStuChart />
      </div>
    </div>
  );
}
