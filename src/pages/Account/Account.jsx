/* eslint-disable no-unused-vars */
import DataContext from 'comon/context/MainContext';
import { getDate, getTime } from 'component/DateFunctions/DateFunctions';
import Sidebar from 'component/layout/sidebar/SideBar';
import PaginationComponet from 'component/pagination/paginationComponent';
import React, { useContext, useEffect, useState } from 'react';
import { GetUserLogsReq } from './Api/AccountReq';
import background from 'asset/image/background/spiral.webp';
import { Pagination } from 'flowbite-react';

function Account() {
  const { userInfo } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    GetUserLogs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const GetUserLogs = async () => {
    setIsloading(true);

    const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

    const res = await GetUserLogsReq({
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };
  const pageNumber = Math.ceil(response?.pagination?.total / 10);

  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-3/4 max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex- flex-col items-center align-middle p-9 ">
        {userInfo ? (
          <div className="flex flex-wrap justify-between gap-x-8 items-center gap-y-5 bg-gray-500 text-white rounded-lg p-5  font-normal">
            <p className=" ">
              نام و نام خانوادگی: {userInfo?.realPerson?.firstName} {userInfo?.realPerson?.lastName}
            </p>
            <p className=" ">محل تولد: {userInfo?.realPerson?.placeOfBirth}</p>
            <p className=" ">
              تاریخ تولد:{' '}
              {userInfo?.realPerson?.birthDate && getDate(userInfo?.realPerson?.birthDate)}
            </p>
            <p className=" ">کدملی: {userInfo?.realPerson?.shNumber}</p>
          </div>
        ) : (
          <p className="border-2 border-accent rounded-md text-dominant-500">
            {' '}
            اطلاعاتی درمورد شما یافت نشده است
          </p>
        )}
        <div className="flex w-full justify-center">
          <div className="border-b-2 border-gray-500  border-dashed w-2/3 pt-10 px-5" />
        </div>
        {/* user logs table  */}
        <div className="relative overflow-x-auto md:rounded-lg mt-8">
          <table className="table-auto  font-IRANYekanX w-full  rounded-md">
            <thead className="font-bold  shadow-xl bg-white text-base text-right text-dominant-500  ">
              <tr className=" ">
                <th className="  border-gray-600  bg-secondary p-3"></th>
                <th className="  border-gray-600  bg-secondary p-3">IP آدرس</th>
                <th className="  border-gray-600  bg-secondary p-3">تاریخ</th>
                <th className="  border-gray-600  bg-secondary p-3">ساعت </th>
              </tr>
            </thead>
            <tbody>
              {response &&
                response?.data?.map((data, index) => (
                  <tr key={index} className="  p-10  text-caption text-right text-dominant-500">
                    <td className="p-3 font-semibold border-b border-dashed border-gray-500 ">
                      {index + 1}
                    </td>
                    <td className="p-3 border-b border-dashed border-gray-500">
                      {data?.ipAddress}
                    </td>
                    <td className="p-3 border-b border-dashed border-gray-500 ">
                      {getDate(data?.time)}
                    </td>
                    <td className="p-3 border-b border-dashed border-gray-500 ">
                      {getTime(data?.time)}
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
          {response?.data?.length === 0 && isloading === false && (
            <div className=" w-full flex-col flex items-center pt-5 text-caption font-medium text-dominant">
              <p>تراکنشی برای شما یافت نشد </p>
            </div>
          )}
          <div className=" relative flex justify-center p-8">
            {' '}
            <PaginationComponet
              itemCount={response?.pagination?.total}
              pagesize={10}
              onPagechange={(page) => handlePageChange(page)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {/* Pagination component */}
          </div>
          {/* <div className=" w-full  flex  flex-col items-center justify-center mt-10 gap-y-2">
            <div className=" w-full flex justify-center gap-x-10">
              {' '}
              <button
                disabled={currentPage == 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`text-base rounded-md p-2  ${
                  currentPage == 1 ? 'text-dominant-500 ' : 'text-accent border border-accent'
                }`}>
                صفحه قبلی{''}
              </button>
              <button
                disabled={currentPage == pageNumber}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`text-base rounded-md p-2  ${
                  currentPage == pageNumber
                    ? 'text-dominant-500'
                    : 'text-accent border border-accent'
                }`}>
                {' '}
                صفحه بعدی{' '}
              </button>
            </div>
            <div className=" w-full flex justify-center gap-x-2 text-sm">
              <p>
                {' '}
                صفحه <span>{currentPage && currentPage}</span> از{' '}
                {Math.ceil(response?.pagination?.total / 10)}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Account;
