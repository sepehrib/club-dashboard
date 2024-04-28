/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import DataContext from 'comon/context/MainContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import arrowSVG from 'asset/image/icon/arrow.svg';
import ProfileSVG from 'asset/image/icon/Profile.svg';
import Orders from 'asset/image/icon/order/draft-orders-major.svg';
import wallet from 'asset/image/icon/walletIcon/empty-wallet.svg';
import BankSVG from 'asset/image/icon/bank.svg';
import ProfileOutlineSVG from 'asset/image/icon/profile-outline.svg';
import message from 'asset/image/icon/message-question.svg';
import plan from 'asset/image/icon/plan/presentionchart.svg';
import company from 'asset/image/icon/company/building.svg';
import './sidebarcss.css';
import user from 'asset/image/icon/user/user-settings-fill-1.svg';
import documnet from 'asset/image/icon/document.svg';
import { getFromLocalStorage, removeFromLocalStorage } from 'component/storage/localStorage';
import { GetUserInfoRequest } from './Api/sidebarRequest';

function Sidebar() {
  const { userInfo, setUserInfo, walletBalance, setWalletBalance } = useContext(DataContext);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    getuserinfo();
  }, []);
  const getuserinfo = async () => {
    const res = await GetUserInfoRequest();
    setUserInfo(res?.data?.data);
  };
  console.log(userInfo);

  const LogOutHandler = (e) => {
    e.preventDefault();
    console.log('remove');
    removeFromLocalStorage('token');
    navigate('/');
  };

  console.log(getFromLocalStorage('token'));
  const menu = [
    {
      name: 'حساب کاربری',
      icon: plan,
      link: '/account'
    },
    {
      name: 'کاربران',
      icon: plan,
      link: '/users'
    },
    {
      name: 'مدیریت طرح ها',
      icon: plan,
      link: '/plans'
    },

    // {
    //   name: 'مدیریت   برداشت از کیف پول کاربران',
    //   icon: wallet,
    //   link: '/Wallet'
    // },
    {
      name: 'سفارشات',
      icon: plan,
      link: '/user_order'
    },
    {
      name: 'پرداختی ها',
      icon: plan,
      link: '/payment'
    },
    {
      name: 'مدیریت واریز سود',
      icon: plan,
      link: '/Scheduled_Payments_Management'
    },
    {
      name: 'مدیریت صورتهای مالی',
      icon: plan,
      link: '/Financial_Statements_Management'
    },
    {
      name: 'تراکنش ها',
      icon: plan,
      link: '/transactions'
    },
    {
      name: 'پرداختی های درگاه',
      icon: plan,
      link: '/IPG_Payment'
    }
  ];

  return (
    <div className="flex flex-col lg:h-screen overflow-y-scroll w-full  rounded-md py-11 items-center">
      {/* Show User Profile and Portfo */}
      <div className="flex flex-col items-start gap-x-6  w-2/3 ">
        <div className=" p-3 rounded  bg-gray-500  text-white  items-center  justify-center flex w-full ">
          <InlineSVG
            src={ProfileSVG}
            className="filter brightness-0 invert w-1/5 justify-end"
            fill=""
          />
          <p className="w-4/5 justify-start">
            {' '}
            {userInfo?.realPerson?.firstName}
            {userInfo?.realPerson?.lastName}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full border border-dashed border-dominant-200 my-11"></div>

      {menu.map((item, i) => (
        <div className="flex flex-col w-full" key={i}>
          {/* Show Menu item  */}
          <div
            className={` flex justify-between  ${
              pathname === item?.link ? 'bg-gray-500 rounded  ' : ''
            } flex flex-row items-center py-[5px]  justify-between mb-6 pr-2 mr-10 ml-[42px]`}>
            <Link
              to={item?.link}
              className={` ${
                pathname === item?.link ? 'text-white' : ''
              } flex flex-row items-center justify-start`}>
              <InlineSVG
                src={item.icon}
                className={` ${
                  pathname === item?.link ? 'fill-white filter brightness-0 invert' : ''
                } ml-1 cursor-pointer`}
              />

              <div className="text-6 cursor-pointer mr-4">{item?.name} </div>
            </Link>
          </div>
          {/* Show Submenu */}
          {/* <div className="submenu1 ">
            {item.subMenu &&
              item.subMenu.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.link}
                  className={`flex flex-row items-center justify-between text-dominant-500 text-6 cursor-pointer  px-4 mb-3 mr-10 ml-[42px] ${
                    sub.link == pathname ? 'bg-accent-0 rounded text-white ' : null
                  } `}>
                  <div>
                    <span className="font-bold text-4 ml-2">.</span> {sub?.name}
                  </div>
                  {pathname === sub?.link && (
                    <InlineSVG src={arrowSVG} fill="white" className="cursor-pointer rotate-90" />
                  )}
                </Link>
              ))}
          </div> */}
        </div>
      ))}

      {/* Divider  */}
      <div className="h-px w-full border border-dashed border-dominant-200 my-11"></div>

      {/* Log out */}
      <button
        className="px-4 py-2 font-medium text-caption text-gray-500  border w-max border-gray-500 rounded mx-auto"
        onClick={(e) => LogOutHandler(e)}>
        خروج از حساب کاربری
      </button>
    </div>
  );
}

export default Sidebar;
