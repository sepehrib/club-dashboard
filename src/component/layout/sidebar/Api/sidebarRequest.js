/* eslint-disable no-unused-vars */
import { getFromLocalStorage } from 'component/storage/localStorage';
import { getUserInfoApi, getWalletBalanceApi } from './sidebarApi';
import axios from 'axios';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetUserInfoRequest = async () => {
  try {
    const res = await axios.get(getUserInfoApi(), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res;
  } catch (ex) {
    if (ex.response.status && 400 === ex.response.status) {
      return false;
    } else if (ex.response.status === 401) {
      // window.location = '/login';
    } else if (ex.response.status === 404) {
      window.location = '/login';
    } else {
      return false;
    }
  }
};

export const getWalletBalanceReq = async () => {
  try {
    const res = await axios.post(
      getWalletBalanceApi(),
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res;
  } catch (ex) {
    if (ex.response.status && 400 === ex.response.status) {
      return false;
    } else if (ex.response.status === 401) {
      window.location = '/login';
    } else if (ex.response.status === 404) {
      window.location = '/login';
    } else {
      return false;
    }
  }
};
