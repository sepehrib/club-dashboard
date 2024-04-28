/* eslint-disable no-unused-vars */
import Button from 'component/button/Button';
import Input from 'component/input/Input';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetCaptchaReq, LoginReq } from './api/enteringRequest';
import openeye from 'asset/image/icon/securityEye/open.png';
import closeeye from 'asset/image/icon/securityEye/closed.png';
import Captcha from './component/Captcha';
import logo from 'asset/image/companyLogo/logoNav/Logo.png';
import background from 'asset/image/background/spiral.webp';
import { addToLocalStorage, getFromLocalStorage } from 'component/storage/localStorage';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [securityEye, setSecurityEye] = useState(false);
  const [captcha, setCaptcha] = useState();
  const [captchavalue, setCaptchavalue] = useState();
  const [alert, setAlert] = useState();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await LoginReq({
      username: username,
      password: password,
      captcha: {
        id: captcha?.id,
        value: captchavalue
      }
    });
    if (res) {
      let Role = jwtDecode(res)?.role;
      if (Role == 'Admin') {
        toast.success('خوش آمدید');
        addToLocalStorage('token', res);
        window.location = '/account';
      } else {
        console.log('role', Role);
        toast.error('برای شما دسترسی ادمینی تعریف نشده است ');
      }
    } else {
      const res = await GetCaptchaReq();
      if (res) {
        return setCaptcha(res);
      } else {
        setAlert('مشکلی در دریافت کد امنیتی رخ داده است !');
      }
    }
    // const mystate = location?.state;
    // window.location = mystate ? mystate?.from?.pathname : '/dashboard';
  };
  console.log(getFromLocalStorage('token'));

  const disable = Boolean(username) && Boolean(password) && Boolean(captchavalue);
  return (
    <div className="flex justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center w-1/2 ">
        <form
          id="element"
          className="flex flex-col w-1/2 relative  shadow-2xl rounded-lg p-5 bg-slate-50 "
          onSubmit={(e) => handleLogin(e)}>
          <div className="flex justify-center">
            <img src={logo} className="filter brightness-0 invert " />
          </div>
          <div className="flex flex-col w-full ">
            <Input value={username} setvalue={setUsername} label="نام کاربری" />
            <Input
              value={password}
              setvalue={setPassword}
              label="کلمه عبور"
              type={securityEye ? 'text' : 'password'}
            />{' '}
            <div className="w-full" style={{ direction: 'ltr' }}>
              <img
                src={securityEye ? openeye : closeeye}
                onClick={() => setSecurityEye(!securityEye)}
                className="w-fit h-fit relative bottom-9 left-2 "
              />
            </div>
          </div>

          <Captcha
            captcha={captcha}
            setCaptcha={setCaptcha}
            captchavalue={captchavalue}
            setCaptchavalue={setCaptchavalue}
            alert={alert}
            setAlert={setAlert}
          />
          <div className="w-full flex justify-around pt-5">
            <Button type="submit" name="ورود " disable={disable} width="w-2/3" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
