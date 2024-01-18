import { Route, Routes as ReactRouterDomRoutes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import InsuranceInformation from "./components/InsuranceInfor";
import PaymentRequests from "./pages/PaymentRequests";
import InsuranceApproval from "./pages/employee/InsuranceApproval";
import ApprovedInsurancePolicies from "./pages/employee/ApprovedInsurancePolicies";
import AllPaymentRequests from "./pages/employee/AllPaymentRequests";
import CustomerList from "./pages/employee/customer";

function Routes() {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password/otp" element={<OTP />} />
      <Route path="/register-insurance/infor" element={<InsuranceInformation />} />
      <Route path="/payment-requests" element={<PaymentRequests />} />
      <Route path="/employee/list-requirement" element={<InsuranceApproval />} />
      <Route path="/employee/list-approved-policy" element={<ApprovedInsurancePolicies />} />
      <Route path="/employee/list-payment-request" element={<AllPaymentRequests />} />
      <Route path="/employee/list-customer" element={<CustomerList />} />
    </ReactRouterDomRoutes>
  );
}

export default Routes;
