/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import React, { useEffect, useState } from 'react';
import PaginationComponet from 'component/pagination/paginationComponent';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import { getDate } from 'component/DateFunctions/DateFunctions';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AutoCompleteUsernameReq, GetAllGetwayReq, GetAllPaymentReq } from './Api/paymentReq';
import { PayStatus } from './enum/payment';
import { Pagination } from 'flowbite-react';

function Payment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();
  const [nationalId, setNationalId] = useState();
  const [gatway, setGatway] = useState([]);
  const [search, setSearch] = useState();
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    GetAllPayment();
    GetAllGetway();
  }, [currentPage]);

  useEffect(() => {
    AutoCompleteUsername();
  }, [nationalId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

  const GetAllPayment = async () => {
    setIsloading(true);
    const res = await GetAllPaymentReq({
      nationalId,
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };
  const GetAllGetway = async () => {
    const res = await GetAllGetwayReq();
    setGatway(res?.data);
  };

  const HandleSearch = async () => {
    setIsloading(true);
    const res = await GetAllPaymentReq({
      userId,
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    console.log(res);
    setNationalId();
    setIsloading(false);
    setResponse(res);
  };

  const AutoCompleteUsername = async () => {
    const res = await AutoCompleteUsernameReq(nationalId);
    setSearch(res?.data);
  };
  const pageNumber = Math.ceil(response?.pagination?.total / 10);

  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className="bg-slate-100 rounded-lg  w-1/2 flex justify-center gap-x-3 p-3">
          <div className="">
            <Input
              label="جست و جو"
              placeholder="نام کاربری"
              setvalue={setNationalId}
              value={nationalId}
              id="element"
            />
            {nationalId && (
              <div className="py-1 absolute w-2/12  z-10">
                <ul
                  className=" opacity-90 border-2 border-accent rounded-md text-dominant-600   "
                  id="element">
                  {search?.length > 0 ? (
                    search?.map((item, index) => (
                      <li
                        key={index}
                        className="border-b-2 p-1 flex justify-between cursor-pointer hover:bg-accent-100 hover:shadow-2xl "
                        onClick={() => {
                          setNationalId(item?.username);
                          setUserId(item?.id);
                        }}>
                        <p className=" text-sm ">{item?.name}</p>
                        <p className=" text-sm  ">{item?.username}</p>
                      </li>
                    ))
                  ) : (
                    <li className="border-b-2 p-1  text-center">کاربری یافت نشد </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-end ">
            <Button
              disable={nationalId?.length === 10 || nationalId?.length === 11}
              name="جست و جو "
              func={() => HandleSearch()}
            />
          </div>
        </div>
        <div className="relative overflow-x-auto md:rounded-lg mt-8 p-2">
          <table className="table-auto bordered font-IRANYekanX w-full " id="element">
            <thead className="font-normal w-full text-base text-right text-dominant-500">
              <tr className="">
                <th className="  bg-secondary p-2">ردیف</th>
                <th className="  bg-secondary p-2 text-center">نام کاربر</th>
                <th className="  bg-secondary p-2"> نوع کاربری</th>
                <th className="  bg-secondary p-2"> نام کاربری</th>
                <th className="  bg-secondary p-2 flex justify-center"> درگاه </th>
                <th className="  bg-secondary p-2 ">تاریخ پرداخت</th>
                <th className="  bg-secondary p-2 text-center ">مبلغ پرداخت</th>
                <th className="  bg-secondary p-2 ">وضعیت پرداخت</th>
                <th className="  bg-secondary p-2 text-center "></th>
              </tr>
            </thead>
            <tbody className="p-10 w-full">
              {response &&
                response?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className=" border-t-2 text-center  border-2 border-accent rounded-md font-semibold text-caption  text-dominant-500  ">
                    <td className="p-4 ">{Skip + index + 1}</td>
                    <td className="p-4 ">{item?.user?.name}</td>
                    <td className="p-4 ">
                      {item?.user?.type == 1 || item?.user?.type == 3 ? 'حقیقی' : 'حقوقی'}
                    </td>
                    <td className="p-4 ">{item?.user?.username}</td>
                    <td className="p-4 ">
                      {gatway?.filter((c) => c?.id == item?.gatewayId)[0]?.gatewayTypeName}
                    </td>
                    <td className="p-4 ">{item?.payDate ? getDate(item?.payDate) : '----'}</td>
                    <td className="p-4 ">{Number(item?.amount).toLocaleString()} ریال</td>
                    <td className="p-4 ">{PayStatus[item?.payStatus]} </td>
                    <></>
                  </tr>
                ))}
            </tbody>
          </table>
          {isloading && (
            <div className=" w-full flex-col flex items-center">
              <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-accent mt-2"></div>
            </div>
          )}
          {!response && isloading === false && (
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
            {/* <div className=" w-full  flex  flex-col items-center justify-center gap-y-2 ">
              <div className=" w-full flex justify-center gap-x-10">
                {' '}
                <button
                  disabled={currentPage == 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`text-base p-2 rounded-md  ${
                    currentPage == 1 ? 'text-dominant-500' : 'text-accent  border border-accent'
                  }`}>
                  صفحه قبلی{''}
                </button>
                <button
                  disabled={currentPage == pageNumber}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`text-base p-2  rounded-md ${
                    currentPage == pageNumber
                      ? 'text-dominant-500'
                      : 'text-accent  border border-accent'
                  }`}>
                  {' '}
                  صفحه بعدی{' '}
                </button>
              </div>
              <div className=" w-full flex justify-center gap-x-2 text-sm">
                <p>
                  {' '}
                  صفحه <span>{currentPage}</span> از {Math.ceil(response?.pagination?.total / 10)}
                </p>
              </div>
            </div> */}
            {/* <PaginationComponet
              currentPage={currentPage}
              totalPages={pageNumber}
              onPageChange={handlePageChange}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
