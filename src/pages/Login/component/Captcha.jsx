/* eslint-disable no-unused-vars */
import Input from 'component/input/Input';
import { useEffect } from 'react';
import { GetCaptchaReq } from '../api/enteringRequest';
import reloder from 'asset/image/reloader/Ionic-Ionicons-Refresh.512.png';

const Captcha = ({ captcha, setCaptcha, captchavalue, setCaptchavalue, alert, setAlert }) => {
  useEffect(() => {
    GetCaptcha();
  }, [alert]);
  const GetCaptcha = async () => {
    const res = await GetCaptchaReq();
    if (res) {
      return setCaptcha(res);
    } else {
      setAlert('مشکلی در دریافت کد امنیتی رخ داده است !');
    }
  };
  return (
    <div className="flex flex-col  w-full">
      <Input
        placeholder="کد امنیتی را وارد کنید "
        label="کد امنیتی"
        setvalue={setCaptchavalue}
        value={captchavalue}
      />

      {/* <img src={reloder} className=" w-1/12 h-/12 scale-75" onClick={() => GetCaptcha()} /> */}
      <div className="w-full flex justify-end">
        {captcha?.file && (
          <img
            src={`data:image/jpeg;base64,${captcha?.file}`}
            className="w-fit cursor-pointer scale-75 relative bottom-12 right-5"
          />
        )}
      </div>

      <div>{alert && <p className="text-sm text-satisfication-60">{alert}</p>}</div>
    </div>
  );
};

export default Captcha;
