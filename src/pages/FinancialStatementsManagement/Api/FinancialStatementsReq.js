import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import {
  DepositeReceiptApi,
  FinancialStatementsUpdateStateApi,
  GetAllFinancialStatementsApi
} from './FinancialStatementsApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetAllFinancialStatementsReq = async (data) => {
  try {
    const res = await axios.post(GetAllFinancialStatementsApi(), data, {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data;
  } catch (ex) {
    console.log(ex.response.status);
    if (ex && 399 < ex.response.status && ex.response.status < 429) {
      return false;
    } else if (ex.response.status == 429) {
      return false;
    } else {
      return false;
    }
  }
};
export const FinancialStatementsUpdateStateReq = async (data) => {
  try {
    const res = await axios.post(FinancialStatementsUpdateStateApi(), data, {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data;
  } catch (ex) {
    console.log(ex.response.status);
    if (ex && 399 < ex.response.status && ex.response.status < 429) {
      return false;
    } else if (ex.response.status == 429) {
      return false;
    } else {
      return false;
    }
  }
};

export const DepositeReceiptReq = async (data) => {
  try {
    const res = await axios.post(DepositeReceiptApi(), data, {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data;
  } catch (ex) {
    console.log(ex.response.status);
    if (ex && 399 < ex.response.status && ex.response.status < 429) {
      return false;
    } else if (ex.response.status == 429) {
      return false;
    } else {
      return false;
    }
  }
};
