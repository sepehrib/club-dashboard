/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
  GetAllPlanOrdersApi,
  GetAllPlansApi,
  GetPlanDetailsApi,
  UpdateInvestmentFileApi,
  UpdateInvestmentStateApi
} from './PlanApi';
import { getFromLocalStorage } from 'component/storage/localStorage';
import { GetUserStatisticsApi } from 'pages/User/Api/UserApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetAllPlansReq = async (body) => {
  try {
    const res = await axios.post(GetAllPlansApi(), body, {
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
export const GetPlanDetailsReq = async (id) => {
  try {
    const res = await axios.get(GetPlanDetailsApi(id), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data?.data;
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
export const UpdateInvestmentStateReq = async (body) => {
  try {
    const res = await axios.post(UpdateInvestmentStateApi(), body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res;
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

export const UpdateInvestmentFileReq = async (body) => {
  try {
    const res = await axios.post(UpdateInvestmentFileApi(), body, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res;
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

export const GetAllPlanOrdersReq = async (body) => {
  try {
    const res = await axios.post(GetAllPlanOrdersApi(), body, {
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

export const GetUserStatisticsReq = async (nationalId) => {
  try {
    const res = await axios.get(GetUserStatisticsApi(nationalId), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res?.data?.data;
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
