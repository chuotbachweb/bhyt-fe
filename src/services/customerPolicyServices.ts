import { deleteMethod, getMethod, postMethod } from "../helpers/api";

const getCustomerPolicy = async (id: string) => {
  const response = await getMethod("/CustomerPolicy/" + id);
  return response;
};

const rejectCustomerPolicy = async (policyId: number) => {
  const response = await deleteMethod("/CustomerPolicy/reject?policyId=" + policyId);
  return response;
};

interface issueCustomerPolicyBody {
  paymentOption: boolean | undefined; // loại thanh toán true: Tháng, false : năm
  insuranceId: number | undefined;
  description: string | null;
  status: boolean | undefined;
  sex: string | undefined;
  birthday: string | undefined;
}
const issueCustomerPolicy = async (body: issueCustomerPolicyBody) => {
  return await postMethod("/CustomerPolicy/Issue", body);
};

// /CustomerPolicy/list-policy?id=2
const getListCustomerPolicy = async (customerId: number) => {
  const response = await getMethod("/CustomerPolicy/list-policy?id=" + customerId);
  return response;
};
export { getCustomerPolicy, rejectCustomerPolicy, issueCustomerPolicy, getListCustomerPolicy };
