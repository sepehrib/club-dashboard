import { BaseUrl } from 'component/baseURL/BaseUrl';

export const ScheduledPaymentsManagementApi = () => BaseUrl + 'ScheduledPaymentsManagement/GetAll';

export const ConfirmDepositeScheduledPaymentApi = () =>
  BaseUrl + 'ScheduledPaymentsManagement/ConfirmDepositeScheduledPayment';
