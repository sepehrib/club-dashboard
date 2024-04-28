import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetAllGetwayApi, GetAllPaymentApi, AutoCompleteUsernameApi } from './paymentApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetAllPaymentReq = async (body) => {
  try {
    const res = await axios.post(GetAllPaymentApi(), body, {
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
export const GetAllGetwayReq = async () => {
  try {
    const res = await axios.get(GetAllGetwayApi());
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
export const AutoCompleteUsernameReq = async (username) => {
  try {
    const res = await axios.get(AutoCompleteUsernameApi(username), {
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
