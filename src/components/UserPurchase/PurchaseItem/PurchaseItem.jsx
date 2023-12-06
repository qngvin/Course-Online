import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPaymentDetail } from "../../../store/slices/paymentSlice";
import courseApi from "../../../api/courseApi";
import PurchaseCourse from "./PurchaseCourse";

function PurchaseItem({ item, code }) {
  return (
    <div className="bg-white px-4 lg:py-4 sm: py-2 rounded-md">
      <div className="flex lg:flex-row sm: flex-col justify-between mb-2">
        <p className="font-bold">#{item.code}</p>
        <p className="lg:mb-0 sm: mb-2">
          <span className="font-bold ">Buy time:</span>{" "}
          {new Date(item.createdDate).toLocaleString()}
        </p>
        <p
          className={`uppercase font-bold text-center px-2 rounded-md ${
            item.status === "Expired" ? "bg-red-400" : "bg-green-400"
          }  text-white`}
        >
          {item.status}
        </p>
      </div>
      <hr className="mb-2 lg:mt-0 sm: mt-4" />
      <div className="flex flex-col">
        {item.courseId &&
          item.courseId.map((course, index) => {
            return (
              <Link
                to={`/courses/course-detail/cba17256-d251-4079-8c76-8b8a5b1cf725`}
                className="w-full h-full hover:bg-slate-50 flex items-center justify-between py-2 px-2 cursor-pointer rounded-sm"
                key={index}
              >
                <PurchaseCourse id={course} />
              </Link>
            );
          })}
      </div>
      <hr className="mb-2 lg:mt-0 sm: mt-4" />

      <div className="w-full flex justify-end lg:mt-2 sm: mt-4">
        <span className="font-bold lg:text-2xl sm: text-lg mr-2">Total:</span>{" "}
        <span className="lg:text-2xl sm: text-lg text-[#15579d] font-bold">
          {item.totalPrice / 20}$
        </span>
      </div>
    </div>
  );
}

export default PurchaseItem;
