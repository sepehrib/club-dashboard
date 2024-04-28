/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import React, { useEffect, useState } from 'react';
import PaginationComponet from 'component/pagination/paginationComponent';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import { GetAllGatewayReq, GetAllIPGPaymnetReq } from './Api/IPGPaymentReq';
import { AutoCompleteUsernameReq } from 'pages/Payment/Api/paymentReq';
import { getDate } from 'component/DateFunctions/DateFunctions';
import { PayStatus } from './enum/paystatus';

function IPGPayment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();
  const [userId, setUserId] = useState();
  const [nationalId, setNationalId] = useState();
  const [GatWay, setGatWay] = useState();

  const [search, setSearch] = useState();

  //   const navigate = useNavigate();

  useEffect(() => {
    GetAllIPGPaymnet();
    setSearch();
  }, [userId, currentPage]);

  useEffect(() => {
    AutoCompleteUsername();
    setSearch();
  }, [nationalId]);

  useEffect(() => {
    GetAllGateway();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

  const GetAllIPGPaymnet = async () => {
    setSearch();
    setResponse();
    setIsloading(true);
    const res = await GetAllIPGPaymnetReq({
      userId,
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };

  const AutoCompleteUsername = async () => {
    const res = await AutoCompleteUsernameReq(nationalId);
    setSearch(res?.data);
  };
  const GetAllGateway = async () => {
    const res = await GetAllGatewayReq();

    setGatWay(res?.data);
  };

  console.log(GatWay);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className="bg-slate-100 rounded-lg  w-2/3 flex justify-center gap-x-5 p-3 items-end">
          <div className=" ">
            <Input
              label="جست و جو"
              placeholder="نام کاربری"
              setvalue={setNationalId}
              value={nationalId}
              id="element"
            />
            {search?.length > 0 && (
              <div className=" absolute w-2/12  z-10">
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
                          setSearch();
                          setCurrentPage(1);
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
              func={() => GetAllIPGPaymnet()}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto md:rounded-lg mt-8 p-2 ">
          <table className="table-auto bordered font-IRANYekanX w-full " id="element">
            <thead className="font-normal w-full text-base text-center text-dominant-500">
              <tr className="">
                <th className="  bg-secondary p-2">ردیف</th>
                <th className="  bg-secondary p-2">نام </th>
                <th className="  bg-secondary p-2">نام کاربری</th>
                <th className="  bg-secondary p-2">نوع کاربری</th>
                <th className="  bg-secondary p-2">تاریخ پرداخت</th>
                <th className="  bg-secondary p-2">مبلغ پرداخت</th>
                <th className="  bg-secondary p-2">وضعیت پرداخت</th>
                <th className="  bg-secondary p-2">درگاه پرداخت</th>
              </tr>
            </thead>
            <tbody className="p-10 w-full">
              {response &&
                response?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className=" border-t-2 text-center  border-2 border-accent rounded-md font-semibold text-caption items-end text-dominant-500  ">
                    <td className="p-2 ">{Skip + index + 1}</td>
                    <td className="p-2 ">{item?.user?.name}</td>
                    <td className="p-2 ">{item?.user?.username}</td>
                    <td className="p-2 ">
                      {item?.user?.type == 1 || item?.user?.type == 3 ? 'حقیقی' : 'حقوقی'}
                    </td>
                    <td className="p-2 ">{item?.createDate && getDate(item?.createDate)}</td>
                    <td className="p-2 ">
                      {item?.amount && Number(item?.amount)?.toLocaleString()} ریال
                    </td>
                    <td className="p-2">{PayStatus[item?.payStatus]}</td>
                    <td className="p-2">
                      {' '}
                      {GatWay?.filter((g) => g?.id == item?.gatewayId)[0]?.gatewayTypeName}
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
          {response?.data?.length == 0 && isloading === false && (
            <div className=" w-full flex-col flex items-center pt-5 text-caption font-medium text-dominant">
              <p className="text-gray-600">گزارشی یافت نشد </p>
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

export default IPGPayment;
