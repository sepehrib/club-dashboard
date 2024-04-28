import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetALLUsersOrderApi, GetUsersOrderDetailsApi } from './userOrderApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetALLUsersOrderReq = async (body) => {
  try {
    const res = await axios.post(GetALLUsersOrderApi(), body, {
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
export const GetUsersOrderDetailsReq = async (orderId) => {
  try {
    const res = await axios.get(GetUsersOrderDetailsApi(orderId), {
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
