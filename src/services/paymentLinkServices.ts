import { postMethod } from "../helpers/api";

const createPaymentLink = async (id: string, data: any) => {
  const response = await postMethod("/PaymentLink/" + id, data);
  return response;
};

export { createPaymentLink };
