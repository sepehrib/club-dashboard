import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetAllRefundRequestsApi, UpdateWalletStatusApi } from './walletApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetAllRefundRequestsReq = async (body) => {
  try {
    const res = await axios.post(GetAllRefundRequestsApi(), body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data;
  } catch (ex) {
    console.log(ex);
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

export const RefundRequestReq = async (api, body) => {
  try {
    await axios.post(api, body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (ex) {
    console.log(ex);
    if (ex.response.status == 400) {
      return ex.response?.data?.title;
    } else if (ex.response.status == 429) {
      return ex.response?.data?.title;
    } else if (ex.response.status == 401) {
      window.location = '/';
      return ex.response?.data?.title;
    } else {
      return ex.response?.data?.title;
    }
  }
};

export const UpdateWalletStatusReq = async (body) => {
  try {
    await axios.post(UpdateWalletStatusApi(), body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  } catch (ex) {
    console.log(ex);
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
