import { BaseUrl } from 'component/baseURL/BaseUrl';

export const GetAllPaymentApi = () => BaseUrl + 'PaymentManagement/GetAll';
export const GetAllGetwayApi = () => BaseUrl + 'Gateway/GetAll';
export const AutoCompleteUsernameApi = (username) =>
  BaseUrl + `AccountsManagement/AutoCompleteUsername/${username}`;
