import React, { useEffect } from "react";
import UserPurchase from "../components/UserPurchase/UserPurchase";
import { useDispatch } from "react-redux";
import { getMyPaymentThunk } from "../store/slices/paymentSlice";

function UserPayment() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPaymentThunk());
  }, []);
  return <UserPurchase />;
}

export default UserPayment;
