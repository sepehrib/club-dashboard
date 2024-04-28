import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetWalletFlowsApi, UpdateWalletFlowStatusApi } from './transactionsApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetWalletFlowsReq = async (data) => {
  try {
    const res = await axios.post(GetWalletFlowsApi(), data, {
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
export const UpdateWalletFlowStatusReq = async (data) => {
  try {
    const res = await axios.post(UpdateWalletFlowStatusApi(), data, {
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
