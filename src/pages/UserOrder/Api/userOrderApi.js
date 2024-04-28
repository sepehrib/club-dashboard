import { BaseUrl } from 'component/baseURL/BaseUrl';

export const GetALLUsersOrderApi = () => BaseUrl + 'OrdersManagement/GetAllByNationalId';
export const GetUsersOrderDetailsApi = (orderId) => BaseUrl + `OrdersManagement/GetById/${orderId}`;
