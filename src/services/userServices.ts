import { getMethod, postMethod } from "../helpers/api";

const getlistCustomer = async () => {
  const response = await getMethod("/User/customer");
  return response;
};

const updateStatus = async (data: { customerId: number; newStatus: number }) => {
  const response = await postMethod("/User/update-status", data);
  return response;
};

const getUserByEmail = async (email: any) => {
  try {
    const res = await getMethod(`/User/get-user?email=${email}`);
    return res;
  } catch (error) {
    return error;
  }
};

export { getlistCustomer, updateStatus, getUserByEmail };
