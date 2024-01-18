import { getMethod } from "../helpers/api";

const getCustomerHealthHistory = async (id: number) => {
  const response = await getMethod("/HealthHistory/user/" + id);
  return response;
};

export { getCustomerHealthHistory };
