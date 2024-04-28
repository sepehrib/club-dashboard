import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetAllGatewayApi, GetAllIPGPaymnetApi } from './IPGPaymentApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetAllIPGPaymnetReq = async (body) => {
  try {
    const res = await axios.post(GetAllIPGPaymnetApi(), body, {
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

export const GetAllGatewayReq = async (body) => {
  try {
    const res = await axios.get(GetAllGatewayApi(), body, {
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
