/* eslint-disable no-unused-vars */
import { getDate } from 'component/DateFunctions/DateFunctions';
import Sidebar from 'component/layout/sidebar/SideBar';
import PaginationComponet from 'component/pagination/paginationComponent';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FinancialStatementsUpdateStateReq,
  GetAllFinancialStatementsReq
} from './Api/FinancialStatementsReq';
import { Link } from 'react-router-dom';
import { FinancialStatementsStatus, FinancialStatementsType } from './enum/FinancialEnum';
import { toast } from 'react-toastify';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import { AutoCompleteUsernameReq } from 'pages/Payment/Api/paymentReq';
import DropDownButton from 'component/button/DropDownButton';
import FinancialStatementsModal from 'component/modal/FinancialStatementsModal';

function FinancialStatementsManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();
  const [userId, setUserId] = useState();
  const [nationalId, setNationalId] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [search, setSearch] = useState();
  const [Alert, setAlert] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    GetAllFinancialStatements();
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      GetAllFinancialStatements();
    }, 1500);
    GetAllFinancialStatements();
  }, [Alert]);

  useEffect(() => {
    GetAllFinancialStatements();
    setSearch();
  }, [userId, type, status]);

  useEffect(() => {
    AutoCompleteUsername();
    setSearch();
  }, [nationalId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

  const GetAllFinancialStatements = async () => {
    setSearch();
    setResponse();
    setIsloading(true);
    const res = await GetAllFinancialStatementsReq({
      userId,
      status,
      type: type && FinancialStatementsType.indexOf(type),
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };

  const FinancialStatementsUpdateState = async (id, status) => {
    const res = await FinancialStatementsUpdateStateReq({
      financialStatementId: id,
      status
    });
    if (res) {
      GetAllFinancialStatements();
      toast.success('ثبت شد');
    } else {
      toast.error('ثبت ناموفق');
    }
  };

  const AutoCompleteUsername = async () => {
    const res = await AutoCompleteUsernameReq(nationalId);
    setSearch(res?.data);
  };

  console.log('data :', response);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className="bg-slate-100 rounded-lg  w-full flex justify-start gap-x-5 p-3 items-end">
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
              func={() => GetAllFinancialStatements()}
            />
          </div>

          <div className=" flex justify-center bg-slate-100  flex-col gap-y-8  items-center border-r-2  border-accent  border-dashed pr-3">
            <p className="w-full">فیلتر براساس وضعیت : </p>
            <div className="flex justify-start gap-x-2 w-full  ">
              <div className="flex gap-x-1 ">
                {' '}
                <p className="flex   text-sm text-accent">همه</p>
                <input type="radio" onClick={() => setStatus()} checked={!status && true} />
              </div>
              <div className="flex gap-x-1  ">
                {' '}
                <p className="flex   text-sm text-accent">بارگذاری شده </p>
                <input type="radio" onClick={() => setStatus(1)} checked={status == 1} />
              </div>
              <div className="flex gap-x-1 ">
                {' '}
                <p className="flex   text-sm text-accent">تایید شده </p>
                <input type="radio" onClick={() => setStatus(2)} checked={status == 2} />
              </div>
              <div className="flex gap-x-1 ">
                {' '}
                <p className="flex   text-sm text-accent">رد شده</p>
                <input type="radio" onClick={() => setStatus(3)} checked={status == 3} />
              </div>
            </div>
          </div>
          <div className=" flex justify-center bg-slate-100  items-start border-r-2 flex-col w-1/3 border-accent  border-dashed pr-3 gap-y-2">
            <p className="w-full">فیلتر براساس وضعیت : </p>
            <div className="flex justify-start gap-x-5 w-full  ">
              {' '}
              <DropDownButton
                items={FinancialStatementsType}
                selected={type}
                setSelected={setType}
                title=""
                width="w-full"
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto md:rounded-lg mt-8 p-2 ">
          <table className="table-auto bordered font-IRANYekanX w-full " id="element">
            <thead className="font-normal w-full text-base text-right text-dominant-500">
              <tr className="">
                <th className="  bg-secondary p-2">ردیف</th>
                <th className="  bg-secondary p-2">نام </th>
                <th className="  bg-secondary p-2">نام کاربری</th>
                <th className="  bg-secondary p-2">تاریخ بارگذاری</th>
                <th className="  bg-secondary p-2">توضیحات</th>
                <th className="  bg-secondary p-2">وضعیت صورت مالی </th>
                <th className="  bg-secondary p-2">نوع صورت مالی </th>
                <th className="  bg-secondary p-2"></th>
                <th className="  bg-secondary p-2"></th>
                <th className="  bg-secondary p-2"></th>
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
                    <td className="p-2 ">{item?.createDate && getDate(item?.createDate)}</td>
                    <td className="p-2 ">{item?.description}</td>
                    <td className="p-2 ">{FinancialStatementsStatus[item?.status]}</td>
                    <td className="p-2 ">{FinancialStatementsType[item?.type]}</td>
                    <td className="p-3 border-b-2 border-accent text-accent">
                      <Link to={`http://192.168.0.29:7181/${item?.path}`} target="_blank">
                        مشاهده
                      </Link>
                    </td>
                    <td className="p-2 gap-x-2 flex justify-center  ">
                      {item?.status == 1 && (
                        <button
                          className="rounded-lg bg-satisfication-85 text-white px-2 py-2"
                          onClick={() => {
                            FinancialStatementsUpdateState(item?.id, 2);
                            GetAllFinancialStatements();
                          }}>
                          تایید{' '}
                        </button>
                      )}
                      {item?.status == 1 && (
                        <button
                          className="rounded-lg  bg-satisfication-60 text-white  px-4 py-2"
                          onClick={() => {
                            FinancialStatementsUpdateState(item?.id, 3);
                            GetAllFinancialStatements();
                          }}>
                          رد
                        </button>
                      )}
                    </td>
                    {/* {item?.status == 2 && item?.type == 6 && item?.walletFlow == null && (
                      <td className="p-2 mb-3">
                        <FinancialStatementsModal
                          id={item?.id}
                          username={item?.user?.username}
                          Alert={Alert}
                          setAlert={setAlert}
                          amount={item?.amount}
                        />
                      </td>
                    )} */}
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

export default FinancialStatementsManagement;
