/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  GetRolesReq,
  GetUserRoleReq,
  GetUserWalletBalanceReq,
  RemoveFromRoleReq
} from '../Api/UserReq';
import { getDate, getTime } from 'component/DateFunctions/DateFunctions';
import { useNavigate } from 'react-router';
import { ShareHolderPosition } from '../enum/shareHolder';
import { PositionType, StackHolder } from '../enum/stackHolder';
import { UpdateWalletStatusReq } from 'pages/Wallet/Api/walletReq';
import { toast } from 'react-toastify';
import { WalletStatus } from 'pages/Wallet/enum/request';
import DepositModal from './depositModal';
import Button from 'component/button/Button';
import AddRoleModal from 'component/modal/AddRoleModal';

const LegalUserData = ({ details, statistics }) => {
  const data = details?.data;
  const [walletBalance, setWalletBalance] = useState();
  const [Userrole, setUserRole] = useState();
  let [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    GetUserWalletBalance();
  }, [data]);

  useEffect(() => {
    GetUserRole();
  }, [isOpen, details]);

  const GetUserWalletBalance = async () => {
    const res = await GetUserWalletBalanceReq({ userId: data?.id });
    setWalletBalance(res?.data);
  };

  const UpdateWalletStatus = async (nationalId, status) => {
    const res = await UpdateWalletStatusReq({ nationalId, status });
    if (res) {
      GetUserWalletBalance();
      toast.success(' ثبت شد !');
    } else {
      toast.error(' عملیات ناموفق !');
    }
  };

  const GetUserRole = async () => {
    console.log(data?.id);
    const res = data && (await GetUserRoleReq(data?.id));
    setUserRole(res);
  };
  const RemoveFromRole = async (rolename) => {
    const res = await RemoveFromRoleReq(data?.username, rolename);
    if (res) {
      GetUserRole();
    } else {
      toast.error('مشکلی در اجرای درخواست شما رخ داده استت');
    }
  };

  const RoleName = (name) => {
    switch (name) {
      case 'Admin':
        return 'ادمین';
    }
  };

  console.log(Userrole);
  return (
    <div className="w-full flex flex-col gap-y-5 ">
      <div className=" w-full flex justify-end ">
        {' '}
        <div
          className="w-fit
              h-1/3 flex flex-col justify-end">
          <a className="flex cursor-pointer" onClick={() => navigate(-1)}>
            {/* <img src={arrow} className="w-fit h-fit scale-75   rotate-180" /> */}
            <p className="text-gray-600 border-b border-accent text-sm  font-bold ">بازگشت</p>
          </a>
        </div>
      </div>
      {/* company account data  */}
      <div className=" rounded-md  p-5 flex justify-between border-2 border-accent">
        <div className="flex gap-x-2">
          <p className="font-bold text-accent ">نام کاربری:</p>
          <p className="font-normal ">{data?.username}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent ">آخرین ورود :</p>
          <p className="font-normal  ">
            در تاریخ {''}
            {statistics?.lastSuccessfullLoginAttempDate &&
              getDate(statistics?.lastSuccessfullLoginAttempDate)}
          </p>
          <p className="font-normal  ">
            و درساعت {''}
            {statistics?.lastSuccessfullLoginAttempDate &&
              getTime(statistics?.lastSuccessfullLoginAttempDate)}
          </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent ">IP آدرس:</p>
          <p className="font-normal ">{statistics?.lastSuccessfullLoginAttempIp}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent ">تاریخ ایجاد حساب کاربری:</p>
          <p className="font-normal ">{data?.createDate && getDate(data?.createDate)}</p>
        </div>
      </div>
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex justify-between border-4 border-accent">
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">موجودی کیف پول:</p>
          <p className="font-normal   ">
            {walletBalance?.amount && Number(walletBalance?.amount).toLocaleString()}
            ریال
          </p>
        </div>
        <div className="flex gap-x-2 items-center">
          <p className="font-bold text-accent">وضعیت کیف پول :</p>
          <p className="font-normal   ">{WalletStatus[walletBalance?.state]}</p>
        </div>
        {walletBalance?.state && walletBalance?.state != 0 ? (
          <div className="flex gap-x-2 items-center">
            <p className="font-bold text-accent">تغییر وضعیت کیف پول :</p>
            <div className="flex gap-x-2">
              {' '}
              {walletBalance?.state == 2 && (
                <button
                  className="text-white px-3 py-2  rounded-lg bg-satisfication-85"
                  onClick={() => UpdateWalletStatus(data?.username, 1)}>
                  فعال کردن{' '}
                </button>
              )}
              {walletBalance?.state == 1 && (
                <button
                  className="text-white px-3 py-2 rounded-lg bg-satisfication-60"
                  onClick={() => UpdateWalletStatus(data?.username, 2)}>
                  غیر فعال کردن{' '}
                </button>
              )}
            </div>
          </div>
        ) : null}
        <div>
          <DepositModal
            username={data?.username}
            setWalletBalance={setWalletBalance}
            id={data?.id}
          />
        </div>
      </div>
      {/* role  info and managing   */}
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex flex-wrap justify-around gap-3 align-baseline items-center">
        <div className="flex w-full justify-between">
          <p className="font-bold pb-3 ">سطح دسترسی کاربر</p>
          <AddRoleModal data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {Userrole?.length > 0 ? (
          <div className="flex gap-x-2 items-center">
            <p className="font-bold text-accent ">نقش کاربر : </p>
            <div className="flex align-baseline items-center gap-x-2">
              {Userrole?.map((rol, index) => (
                <p key={index} className="text-base gap-x-2 items-center align-middle">
                  {RoleName(rol)} {''}
                  <button
                    className="font-bold text-satisfication-60 cursor-pointer"
                    onClick={() => RemoveFromRole(rol)}>
                    X
                  </button>
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p> سطح دسترسی برای این کاربر تعریف نشده است </p>
        )}
      </div>
      {/* company info  */}
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex flex-wrap justify-around gap-3">
        <div className="flex w-full justify-start">
          <p className="font-bold pb-3 ">اطلاعات شرکت</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent ">نام شرکت:</p>
          <p className="font-normal ">{data?.legalPerson?.companyName}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">کد اقتصادی :</p>
          <p className="font-normal   ">{data?.legalPerson?.economicCode}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">تاریخ تاسیس شرکت:</p>
          <p className="font-normal   ">
            {data?.legalPerson?.registerDate && getDate(data?.legalPerson?.registerDate)}{' '}
          </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">محل تاسیس شرکت:</p>
          <p className="font-normal   ">{data?.legalPerson?.registerPlace} </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">شماره ثبت:</p>
          <p className="font-normal   ">{data?.legalPerson?.registerNumber} </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">وب سایت شرکت:</p>
          <p className="font-normal">
            {data?.legalPerson?.website ? data?.legalPerson?.website : 'ندارد '}
          </p>
        </div>
      </div>
      {/* company bank account  info  */}
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex flex-wrap justify-between gap-3">
        <div className="flex w-full justify-start">
          <p className="font-bold pb-3">اطلاعات حساب بانکی </p>
        </div>
        <div className="flex gap-x-1">
          <p className="font-bold text-accent ">نام بانک : </p>
          <p className="font-normal space-x-2 ">{data?.accounts[0]?.bank?.name}</p>
        </div>
        <div className="flex gap-x-1">
          <p className="font-bold text-accent ">شماره حساب : </p>
          <p className="font-normal space-x-2 ">{data?.accounts[0]?.accountNumber}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent"> شهر :</p>
          <p className="font-normal   ">{data?.accounts[0]?.branchCity?.name}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">نام شعبه :</p>
          <p className="font-normal   ">{data?.accounts[0]?.branchName} </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">کد شعبه :</p>
          <p className="font-normal   ">{data?.accounts[0]?.branchCode} </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">شماره شبا :</p>
          <p className="font-normal   ">{data?.accounts[0]?.sheba} </p>
        </div>
      </div>
      {/* company palce info  */}
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex flex-wrap justify-between gap-3">
        <div className="flex w-full justify-start">
          <p className="font-bold pb-3"> اطلاعات محل شرکت</p>
        </div>
        <div className="flex gap-x-1">
          <p className="font-bold text-accent ">آدرس محل شرکت: </p>
          <p className="font-normal space-x-2 ">{data?.addresses[0]?.country?.name}</p>
          <p className="font-normal space-x-2 ">{data?.addresses[0]?.city?.name}</p>
          <p className="font-normal space-x-2 ">{data?.addresses[0]?.section?.name}</p>
          <p className="font-normal space-x-2 ">{data?.addresses[0]?.remnantAddress}</p>
          <p className="font-normal space-x-2 ">{data?.addresses[0]?.alley}</p>
          <p className="font-normal space-x-2 ">{data?.addresses[0]?.plaque}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent"> کدپستی :</p>
          <p className="font-normal   ">{data?.addresses[0]?.postalCode}</p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">تلفن:</p>
          <p className="font-normal   ">{data?.addresses[0]?.tel} </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">تلفن همراه :</p>
          <p className="font-normal   ">
            {' '}
            {data?.addresses[0]?.countryPrefix}
            {data?.addresses[0]?.mobile}{' '}
          </p>
        </div>
        <div className="flex gap-x-2">
          <p className="font-bold text-accent">پست الکترونیکی:</p>
          <p className="font-normal   ">
            {data?.addresses[0]?.email ? data?.addresses[0]?.email : 'ندارد '}{' '}
          </p>
        </div>
      </div>

      {/* share holder info  */}
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex flex-wrap justify-between gap-3">
        <div className="flex w-full justify-start">
          <p className="font-bold pb-3">اطلاعات سهامداران </p>
        </div>
        {data?.shareHolders &&
          data?.shareHolders?.map((item, index) => (
            <div className="rounded-lg bg-slate-200 shadow-2xl p-5 " key={index}>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">نام سهامدار :</p>
                <p className="font-normal gap-x-1 flex ">
                  {item?.firstName}
                  {''}
                  <p> {item?.lastName}</p>
                </p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">کدملی :</p>
                <p className="font-normal gap-x-1 flex ">{item?.uniqueIdentifier}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">سمت :</p>
                <p className="font-normal gap-x-1 flex ">
                  {' '}
                  {ShareHolderPosition[item?.positionType]}
                </p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">کد پستی:</p>
                <p className="font-normal gap-x-1 flex ">{item?.postalCode}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">آدرس:</p>
                <p className="font-normal gap-x-1 flex ">{item?.address}</p>
              </div>
            </div>
          ))}
      </div>
      {/* stake holder info  */}
      <div className="border-2 border-accent rounded-md rounded-lg p-5 flex flex-wrap  gap-3">
        <div className="flex w-full justify-start">
          <p className="font-bold pb-3">اطلاعات ذینفعان </p>
        </div>
        {data?.stakeholders &&
          data?.stakeholders?.map((item, index) => (
            <div className="rounded-lg bg-slate-200 shadow-2xl p-5" key={index}>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">نام و نام خانوادگی :</p>
                <p className="font-normal gap-x-1 flex ">
                  {item?.firstName}
                  {''}
                  <p> {item?.lastName}</p>
                </p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">کدملی :</p>
                <p className="font-normal gap-x-1 flex ">{item?.uniqueIdentifier}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">نوع ذینفع :</p>
                <p className="font-normal gap-x-1 flex ">{StackHolder[item?.type]}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="font-bold  text-accent ">سمت:</p>
                <p className="font-normal gap-x-1 flex ">{PositionType[item?.positionType]}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LegalUserData;
