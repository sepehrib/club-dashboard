/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router';
import { GetUsersOrderDetailsReq } from '../Api/userOrderReq';
import { useEffect, useState } from 'react';
import Sidebar from 'component/layout/sidebar/SideBar';
import { getDate } from 'component/DateFunctions/DateFunctions';

const UserOrderDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    GetUsersOrderDetails();
  }, []);

  const GetUsersOrderDetails = async () => {
    const res = await GetUsersOrderDetailsReq(id);
    setDetails(res);
  };
  console.log(details);

  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col gap-y-5 items-center align-middle p-10">
        <div className="w-full flex justify-end ">
          <p
            className="border-b-2 border-accent   text-gray-600 font-bold text-sm cursor-pointer"
            onClick={() => navigate(-1)}>
            بازگشت
          </p>
        </div>
        <div className=" w-full  border-2 border-accent rounded-md text-black  p-5 flex  flex-col  flex-wrap items-center  gap-y-5">
          <div className="flex  gap-x-2 items-center shadow-2xl ">
            <p className="font-bold text-lg text-accent">نام طرح:</p>
            <p>{details?.data?.investment?.title} </p>
          </div>
          <div className="border-b border-2 border-dashed border-accent w-2/3 " />
          <div className="flex  flex-wrap gap-x-6">
            <div className="flex  gap-x-2 items-center shadow-2xl ">
              <p className="font-bold text-lg text-accent">تاریخ شروع طرح:</p>
              <p>
                {details?.data?.investment?.createDate &&
                  getDate(details?.data?.investment?.createDate)}{' '}
              </p>
            </div>
            <div className="flex  gap-x-2 items-center shadow-2xl ">
              <p className="font-bold text-lg text-accent">نرخ سالانه سود:</p>
              <p>{details?.data?.investment?.annualRate} درصد </p>
            </div>
            <div className="flex  gap-x-2 items-center shadow-2xl ">
              <p className="font-bold text-lg text-accent">تعداد دوره پرداخت سود:</p>
              <p>{details?.data?.investment?.installmentCount} </p>
            </div>
            <div className="flex  gap-x-2 items-center shadow-2xl ">
              <p className="font-bold text-lg text-accent"> فاصله بین اقساط:</p>
              <p>{details?.data?.investment?.installmentPeriod}ماه </p>
            </div>
            <div className="flex  gap-x-2 items-center shadow-2xl ">
              <p className="font-bold text-lg text-accent">زمان کل دروه:</p>
              <p>{details?.data?.investment?.investmentPeriod} ماه </p>
            </div>
          </div>
          <div className="border-b border-2 border-dashed border-accent w-2/3 " />
          <p className="w-full font-bold text-accent text-lg ">برنامه پرداخت سود طرح :</p>
          <div className=" flex flex-wrap gap-4">
            {details?.data?.investment?.scheduledPayments &&
              details?.data?.investment?.scheduledPayments?.map((item, index) => (
                <div className=" w-[200px] flex flex-wrap " key={index}>
                  <div className="border-2 gap-y-3 text-sm border-accent rounded-lg shadow-2xl p-3">
                    <div className="flex  gap-x-2 items-center justify-between ">
                      <p className="font-normal text-sm text-dominant-500"> تاریخ پرداخت:</p>
                      <p>{item?.date && getDate(item?.date)} </p>
                    </div>
                    <div className="flex  gap-x-2 items-center justify-between">
                      <p className="font-normal text-sm text-dominant-500"> مبلغ پرداختی:</p>
                      <p>{item?.amount && Number(item?.amount)?.toLocaleString()} ریال </p>
                    </div>
                    <div className="flex  gap-x-2 items-center justify-between">
                      <p className="font-normal text-sm text-dominant-500"> درصد سود دوره:</p>
                      <p>{item?.percent} درصد </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="border-b border-2 border-dashed border-accent w-2/3 " />

          <div className="flex w-full flex-col p-2 gap-y-2 ">
            <p className="font-bold text-lg text-accent">توضیحات طرح:</p>
            <p className="px-5 text-justify">{details?.data?.investment?.description} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetails;
