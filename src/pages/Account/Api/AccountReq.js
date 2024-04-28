import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetUserLogsApi } from './AccountApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetUserLogsReq = async (data) => {
  try {
    const res = await axios.post(GetUserLogsApi(), data, {
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
