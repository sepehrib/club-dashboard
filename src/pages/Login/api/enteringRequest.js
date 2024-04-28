import axios from 'axios';
import {
  GetCaptchaApi,
  SendForgetpasswordDataApi,
  SendforgetpasswordOtpApi,
  checkIsSejamiApi,
  createSejamiotp,
  loginApi,
  sendRegisterDataApi
} from './enteringApi';
import { toast } from 'react-toastify';

export const SendOtpCodeReq = async (nationalCode) => {
  try {
    const res = await axios.post(createSejamiotp(), nationalCode);
    return res.data.meta.code;
  } catch (ex) {
    if (ex && 399 < ex.response.status && ex.response.status < 429) {
      console.log('400');
      return 400;
    } else if (ex.response.status == 429) {
      console.log(429);
      return 429;
    } else {
      console.log(500);
      return 500;
    }
  }
};

export const checkIsSejamiReq = async (nationalId) => {
  try {
    const res = await axios.post(checkIsSejamiApi(nationalId));
    console.log('res', res?.data?.data?.isSejami);
    return res?.data?.data?.isSejami;
  } catch (ex) {
    console.log(ex.response.status);
    if (ex && 399 < ex.response.status && ex.response.status < 429) {
      return 400;
    } else if (ex.response.status == 429) {
      return 429;
    } else {
      return 500;
    }
  }
};

export const sendregisterDataReq = async (data) => {
  try {
    const res = await axios.post(sendRegisterDataApi(), data);
    console.log(res?.data);
    return { title: res?.data?.title, status: true, code: 200 };
  } catch (ex) {
    console.log(ex.response.status);
    if (ex && 399 < ex.response.status && ex.response.status < 429) {
      return { title: ex.response.data.title, status: false, code: ex.response.status };
    } else if (ex.response.status == 429) {
      return { title: ex.response.data.title, status: false, code: 429 };
    } else {
      return { title: ex.response.data.title, status: false, code: 500 };
    }
  }
};

export const LoginReq = async (data) => {
  try {
    const res = await axios.post(loginApi(), data);
    // addToLocalStorage('token', res?.data?.data?.token);
    console.log(res.data.data.token);
    return res?.data?.data?.token;
  } catch (ex) {
    if (ex && 399 < ex < 500) {
      toast.error(ex?.response?.data?.title);
      return false;
    } else {
      toast.error('مشکلی در ارتباط با سرور پیش آمده لطفا زمانی دیگر  تلاش کنید ');
      return false;
    }
  }
};

export const SendforgetpasswordOrpReq = async (data) => {
  try {
    const res = await axios.post(SendforgetpasswordOtpApi(), data);
    if (res?.status === 200) return true;
  } catch (ex) {
    if (ex && 399 < ex?.response?.status < 500) {
      console.log(ex?.response?.status);
      toast.error('شما در سامانه ثبت نام نشده اید ');
    } else {
      toast.error('مشکلی در ارتباط با سرور پیش آمده لطفا زمانی دیگر  تلاش کنید ');
      console.log('dd', ex);
    }
  }
};
export const sendForgetpasswordDataReq = async (data) => {
  try {
    const res = await axios.post(SendForgetpasswordDataApi(), data);
    console.log(res);
    if (res?.status === 200) return true;
  } catch (ex) {
    if (ex && 399 < ex?.response?.status < 500) {
      console.log(ex?.response?.status);
      toast.error('کد سجامی وارد شده صحیح نمی باشد');
    } else {
      toast.error('مشکلی در ارتباط با سرور پیش آمده لطفا زمانی دیگر  تلاش کنید ');
      console.log('dd', ex);
    }
  }
};
export const GetCaptchaReq = async () => {
  try {
    const res = await axios.post(GetCaptchaApi());
    console.log(res?.data);
    return res?.data?.data;
  } catch (ex) {
    if (ex && 399 < ex?.response?.status < 500) {
      return false;
    } else {
      return false;
    }
  }
};
