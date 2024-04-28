import { Route, Routes } from 'react-router-dom';
import PrivateRouts from './setting/privateRoute';
import NotFound from 'component/notfound/NotFound';
import Login from 'pages/Login/login';
import Account from 'pages/Account/Account';
import Plans from 'pages/Plans/Plans';
import PlanDetails from 'pages/Plans/component/PlanDetails';
import PlanDetailsEdit from 'pages/Plans/component/PlanDetailsEdit';
import Users from 'pages/User/Users';
import UsersDetails from 'pages/User/component/UsersDetails';
import UserOrder from 'pages/UserOrder/UserOrder';
import UserOrderDetails from 'pages/UserOrder/component/UserOrderDetails';
// import Wallet from 'pages/Wallet/Wallet';
import Payment from 'pages/Payment/Payment';
import ScheduledPaymentsManagement from 'pages/ScheduledPaymentsManagement/ScheduledPaymentsManagement';
import FinancialStatementsManagement from './../../pages/FinancialStatementsManagement/FinancialStatementsManagement';
import Transactions from 'pages/transactions/Transactions';
import IPGPayment from 'pages/IPGPayments/IPGPayment';

const RoutsComponent = () => {
  // const token = getFromLocalStorage('token');
  return (
    <>
      <Routes>
        {/* need to logged in */}
        <Route element={<PrivateRouts />}>
          <Route path="/account" element={<Account />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/plan_details/:id" element={<PlanDetails />} />
          <Route path="/plans/plan_details_edit/:id" element={<PlanDetailsEdit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/details/:code/:type" element={<UsersDetails />} />
          <Route path="/user_order" element={<UserOrder />} />
          <Route path="/user_order/:id" element={<UserOrderDetails />} />
          {/* <Route path="/Wallet" element={<Wallet />} /> */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/Scheduled_Payments_Management" element={<ScheduledPaymentsManagement />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/IPG_Payment" element={<IPGPayment />} />
          <Route
            path="/Financial_Statements_Management"
            element={<FinancialStatementsManagement />}
          />
        </Route>
        {/* finish needed to login rout */}

        {/* login rout */}

        {/* end of loged in */}
        {/* global  */}
        {/* main root */}
        <Route path="/" exact element={<Login />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/home" exact element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RoutsComponent;

// check "/" rout when token is false
