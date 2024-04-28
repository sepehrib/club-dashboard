import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';
import {
  GetUserByNationalIdApi,
  GetUserWalletBalanceApi,
  GetImpersonateTokenApi,
  GetRolesApi,
  GetUserRoleApi,
  RemoveFromRoleApi,
  AddToRolesApi
} from './UserApi';

const token = JSON.parse(getFromLocalStorage('token'));

export const GetAllUsersReq = async (Api, data) => {
  try {
    const res = await axios.post(Api, data, {
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

export const GetUserWalletBalanceReq = async (data) => {
  try {
    const res = await axios.post(GetUserWalletBalanceApi(), data, {
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

export const GetUserByNationalIdReq = async (nationalId) => {
  try {
    const res = await axios.get(GetUserByNationalIdApi(nationalId), {
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

export const GetRolesReq = async () => {
  try {
    const res = await axios.get(GetRolesApi(), {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data?.data;
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
export const GetUserRoleReq = async (userId) => {
  try {
    const res = await axios.get(GetUserRoleApi(userId), {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data?.data;
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
export const GetImpersonateTokenReq = async (body) => {
  try {
    const res = await axios.post(GetImpersonateTokenApi(), body, {
      headers: { Authorization: `Bearer  ${token}` }
    });
    return res?.data?.data;
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
export const RemoveFromRoleReq = async (nationalId, rolename) => {
  try {
    await axios.post(
      RemoveFromRoleApi(nationalId, rolename),
      {},
      {
        headers: { Authorization: `Bearer  ${token}` }
      }
    );
    return true;
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
export const AddToRolesReq = async (nationalId, rolename) => {
  try {
    await axios.post(
      AddToRolesApi(nationalId, rolename),
      {},
      {
        headers: { Authorization: `Bearer  ${token}` }
      }
    );
    return true;
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
