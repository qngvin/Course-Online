import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PurchaseItem from "./PurchaseItem/PurchaseItem";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetail } from "../../store/slices/paymentSlice";

function UserPurchase() {
  const { payments, paymentDetail } = useSelector(
    (state) => state.paymentReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    payments?.map((item) => {
      dispatch(getPaymentDetail(item.code));
    });
  }, []);
  return (
    <div>
      <div className="lg:px-16 sm: px-6 py-6 bg-gray-100">
        <h1 className="text-3xl font-semibold text-center mb-2">My Purchase</h1>
        <div className="w-full flex flex-col gap-2">
          {paymentDetail &&
            paymentDetail.map((item, index) => {
              return <PurchaseItem key={index} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default UserPurchase;
