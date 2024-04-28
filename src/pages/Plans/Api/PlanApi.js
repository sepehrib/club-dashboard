import { BaseUrl } from 'component/baseURL/BaseUrl';

export const GetAllPlansApi = () => BaseUrl + 'InvestmentsManagement/GetAll';

export const GetPlanDetailsApi = (id) => BaseUrl + `InvestmentsManagement/GetById/${id}`;

export const UpdateInvestmentStateApi = () =>
  BaseUrl + 'InvestmentsManagement/UpdateInvestmentState';

export const UpdateInvestmentFileApi = () => BaseUrl + 'InvestmentsManagement/UpdateInvestment';

export const GetAllPlanOrdersApi = () => BaseUrl + 'OrdersManagement/GetAllByInvestmentId';
