import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import {
  ConfirmDepositeScheduledPaymentApi,
  ScheduledPaymentsManagementApi
} from './ScheduledPaymentsApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const ScheduledPaymentsManagementReq = async (data) => {
  try {
    const res = await axios.post(ScheduledPaymentsManagementApi(), data, {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data;
  } catch (ex) {
    console.log(ex.response.status);
    if (ex.response.status == 400) {
      return false;
    } else if (ex.response.status == 429) {
      return false;
    } else if (ex.response.status == 401) {
      window.location = '/';
      return false;
    } else {
      return false;
    }
  }
};

export const ConfirmDepositeScheduledPaymentReq = async (data) => {
  try {
    const res = await axios.post(ConfirmDepositeScheduledPaymentApi(), data, {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data;
  } catch (ex) {
    console.log(ex.response.status);
    if (ex.response.status == 400) {
      return false;
    } else if (ex.response.status == 429) {
      return false;
    } else if (ex.response.status == 401) {
      window.location = '/';
      return false;
    } else {
      return false;
    }
  }
};
