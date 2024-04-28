/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import React, { useEffect, useState } from 'react';
import PaginationComponet from 'component/pagination/paginationComponent';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import { getDate } from 'component/DateFunctions/DateFunctions';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  ConfirmDepositeScheduledPaymentReq,
  ScheduledPaymentsManagementReq
} from './Api/ScheduledPaymentsReq';
import DatePickerPersian from 'component/Datepicker/datepicker';

function ScheduledPaymentsManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();

  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 180))
  );
  const [EndDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 185)));

  const navigate = useNavigate();

  useEffect(() => {
    ScheduledPaymentsManagement();
  }, [currentPage]);
  useEffect(() => {
    ScheduledPaymentsManagement();
  }, [startDate, EndDate]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

  const ScheduledPaymentsManagement = async () => {
    const res = await ScheduledPaymentsManagementReq({
      periodFilter: {
        startDate: startDate,
        endDate: EndDate
      },
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };

  //   const HandleSearch = async () => {
  //     setIsloading(true);
  //     const res = await GetAllPaymentReq({
  //       userId,
  //       pagination: {
  //         take: 10,
  //         skip: Skip
  //       }
  //     });
  //     console.log(res);
  //     setNationalId();
  //     setIsloading(false);
  //     setResponse(res);
  //   };

  //   const AutoCompleteUsername = async () => {
  //     const res = await AutoCompleteUsernameReq(nationalId);
  //     setSearch(res?.data);
  //   };

  const HandelConfirmed = async (status, id) => {
    const res = await ConfirmDepositeScheduledPaymentReq({
      scheduledPaymentId: id,
      confirmed: status
    });
    ScheduledPaymentsManagement();
  };
  console.log(response);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className="bg-slate-100 rounded-lg  w-1/2 flex justify-around gap-x-3 p-3">
          <div className=" flex justify-center bg-slate-100  flex-col gap-y-2">
            <div className="flex justify-start">
              <p>بازه زمانی واریز سود :</p>
            </div>
            <div className="w-full flex gap-x-2 justify-center">
              <DatePickerPersian value={startDate} onchange={setStartDate} title="از تاریخ" />
              <DatePickerPersian value={EndDate} onchange={setEndDate} title="تا تاریخ" />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto md:rounded-lg mt-8 p-2 ">
          <table className="table-auto bordered font-IRANYekanX w-full " id="element">
            <thead className="font-normal w-full text-base text-right text-dominant-500">
              <tr className="">
                <th className="  bg-secondary p-2">ردیف</th>
                <th className="  bg-secondary p-2 text-center">نام طرح</th>
                <th className="  bg-secondary p-2">مبلغ سرمایه گذاری شده </th>
                <th className="  bg-secondary p-2 ">تاریخ واریز</th>
                <th className="  bg-secondary p-2 text-center ">درصد سود </th>
                <th className="  bg-secondary p-2 text-center ">مبلغ سود</th>
                <th className="  bg-secondary p-2 text-center "></th>
              </tr>
            </thead>
            <tbody className="p-10 w-full">
              {response &&
                response?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className=" border-t-2 text-center  border-2 border-accent rounded-md font-semibold text-caption  text-dominant-500  ">
                    <td className="p-3 ">{Skip + index + 1}</td>
                    <td className="p-3 ">{item?.investment?.title}</td>
                    <td className="p-3 ">
                      {Number(item?.investment?.amountRaised)?.toLocaleString()} ریال
                    </td>
                    <td className="p-3 ">{item?.date && getDate(item?.date)}</td>{' '}
                    <td className="p-3 ">{item?.percent} درصد</td>
                    <td className="p-3 ">
                      {' '}
                      {Number(
                        Number(item?.investment?.amountRaised) * Number(item?.percent)
                      ).toLocaleString()}{' '}
                      ریال
                    </td>
                    <td className="p-3 flex gap-x-5 justify-between ">
                      {' '}
                      <button
                        className="rounded px-3 py-2 bg-satisfication-85 text-base font-semibold text-white"
                        onClick={() => HandelConfirmed(true, item?.id)}>
                        تایید
                      </button>
                      <button
                        className="rounded px-3 py-2 bg-satisfication-60 text-base font-semibold text-white"
                        onClick={() => HandelConfirmed(false, item?.id)}>
                        رد{' '}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isloading && (
            <div className=" w-full flex-col flex items-center">
              <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-accent mt-2"></div>
            </div>
          )}
          {response?.length < 0 && isloading === false && (
            <div className=" w-full flex-col flex items-center pt-5 text-caption font-medium text-dominant">
              <p className="text-white">گزارشی یافت نشد </p>
            </div>
          )}
          <div className=" relative flex justify-center p-8">
            {' '}
            <PaginationComponet
              itemCount={response?.pagination?.total}
              pagesize={10}
              onPagechange={(page) => handlePageChange(page)}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledPaymentsManagement;
