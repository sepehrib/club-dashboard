export const createSejamiotp = () => 'http://192.168.0.29:7181/Accounts/CreateSejamOtp';

export const checkIsSejamiApi = (nationalId) =>
  `http://192.168.0.29:7181/Accounts/IsSejami?nationalId=${nationalId} `;

export const sendRegisterDataApi = () => 'http://192.168.0.29:7181/Accounts/Register';

export const loginApi = () => 'http://192.168.0.29:7181/Accounts/Login';

export const SendforgetpasswordOtpApi = () => 'http://192.168.0.29:7181/Accounts/CreateSepehrOTP';

export const SendForgetpasswordDataApi = () => 'http://192.168.0.29:7181/Accounts/ForgotPassword';

export const GetCaptchaApi = () => 'http://192.168.0.29:7181/Captcha/Create';
