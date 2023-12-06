import axiosPayment from "./axiosPayment";

const paymentApi = {
  createPaymentURL(params) {
    const url = "create-payment-url";
    return axiosPayment.post(url, params);
  },

  getMyPayment() {
    const url = "/my-payment";
    return axiosPayment.get(url);
  },

  getPaymentDetail(code) {
    const url = `/get-payment-by-id?code=${code}`;
    return axiosPayment.get(url);
  },
};
export default paymentApi;
