import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentApi from "../../api/paymentApi";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "./cartSlice";

const initialState = {
  paymentURL: "",
  paymentInfo: null,
  payments: null,
  paymentDetail: [],
  isLoading: false,
  error: "",
};

export const createPaymentURLThunk = createAsyncThunk(
  "payment/create_link",
  async (payload) => {
    try {
      const res = await paymentApi.createPaymentURL(payload);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMyPaymentThunk = createAsyncThunk(
  "payment/get-payment",
  async (payload) => {
    try {
      const res = await paymentApi.getMyPayment();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPaymentDetail = createAsyncThunk(
  "payment/get-payment-detail",
  async (code) => {
    try {
      const res = await paymentApi.getPaymentDetail(code);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPaymentURLThunk.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(createPaymentURLThunk.fulfilled, (state, action) => {
      window.open(action.payload._data.paymentUrl, "_blank");

      return {
        ...state,
        paymentURL: action.payload._data.paymentUrl,
        paymentInfo: action.payload._data,
        isLoading: false,
      };
    });

    builder.addCase(createPaymentURLThunk.rejected, (state, action) => {
      // console.log(action);
    });

    builder.addCase(getMyPaymentThunk.fulfilled, (state, action) => {
      return {
        ...state,
        payments: action.payload._data,
      };
    });

    builder.addCase(getPaymentDetail.fulfilled, (state, action) => {
      const { paymentDetail } = state;
      const listDetail = [...paymentDetail, action.payload._data];
      return {
        ...state,
        paymentDetail: listDetail,
      };
    });

    builder.addCase(getPaymentDetail.rejected, (state, action) => {
      return {
        ...state,
        error: action.payload._message,
      };
    });
  },
});

export const { createCheckoutItems } = paymentSlice.actions;
export default paymentSlice.reducer;
