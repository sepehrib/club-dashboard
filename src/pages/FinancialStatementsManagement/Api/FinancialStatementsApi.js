import { BaseUrl } from 'component/baseURL/BaseUrl';

export const GetAllFinancialStatementsApi = () => BaseUrl + 'FinancialStatementsManagement/GetAll';

export const DepositeReceiptApi = () => BaseUrl + 'WalletManagement/DepositeReceipt';

export const FinancialStatementsUpdateStateApi = () =>
  BaseUrl + 'FinancialStatementsManagement/UpdateState';
