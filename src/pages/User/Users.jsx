/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { GetAllUsersReq, GetImpersonateTokenReq, GetUserByNationalIdReq } from './Api/UserReq';
import { GetAllLegalUsersApi, GetAllRealUsersApi } from './Api/UserApi';
import PaginationComponet from 'component/pagination/paginationComponent';
import { getDate } from 'component/DateFunctions/DateFunctions';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import Modal from 'component/modal/ImpersonateModal';
import { getFromLocalStorage } from 'component/storage/localStorage';
import ImpersonateModal from 'component/modal/ImpersonateModal';
import getBaseUrl from 'getBaseUrl';

function Users() {
  const navigate = useNavigate();
  //user type => real : false , legal : true
  const [usertype, setUsertype] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();
  const [search, setSearch] = useState();
  const [searchActive, setsearchActive] = useState(false);

  useEffect(() => {
    GetUserLogs();
  }, [currentPage, usertype]);

  useEffect(() => {
    console.log('log');
    setResponse();
    setSearch('');
  }, [usertype]);

  // useEffect(() => {
  //   if (search == undefined) {
  //     GetUserLogs();
  //     setsearchActive(false);
  //   }
  // }, [search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const ApiHandler = usertype ? GetAllLegalUsersApi() : GetAllRealUsersApi();

  const GetUserLogs = async () => {
    setsearchActive(false);
    setSearch();
    setIsloading(true);
    const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);
    const res = await GetAllUsersReq(ApiHandler, {
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };

  const SearchHandler = async () => {
    setsearchActive(true);
    const res = await GetUserByNationalIdReq(search);
    if (res?.data?.type == 1 || res?.data?.type == 3) {
      setUsertype(false);
    } else if (res?.data?.type == 4 || res?.data?.type == 2) {
      setUsertype(true);
    } else {
      setResponse(res);
    }
    setResponse(res);
  };
  const baseUrl = getBaseUrl();

  const GetImpersonateToken = async (username) => {
    const res = await GetImpersonateTokenReq({ username });
    if (res?.token) {
      window.open(baseUrl + `impersonate/?token=${res?.token}`);
    }
    console.log(res?.token);
  };

  console.log('users', search?.length, search?.length == 10 || search?.length == 12);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className=" w-full  bg-gray-500 rounded-md p-5  shadow-2xl flex justify-around items-center">
          <div className="w-3/5 flex gap-x-2">
            {/* <Input
              label="جست و جو"
              placeholder="...نام کاربری"
              setvalue={setSearch}
              value={search}
            />
            <div className=" flex items-end ">
              <Button
                bg="bg-gray-500 "
                disable={search?.length === 10 || search?.length === 11}
                name="جست و جو "
                func={() => SearchHandler()}
              />
            </div> */}
            <div className=" flex flex-col gap-y-1 w-2/5">
              <label htmlFor="search" className=" text-white text-xs ">
                جست و جو{' '}
              </label>
              <input
                className=" rounded py-2  text-center "
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <div className="flex flex-col w-1/5 justify-end">
              {' '}
              <button
                title={
                  !(search?.length > 9 && search?.length < 12) &&
                  'کدملی یا شناسه ملی را درست وارد کنید '
                }
                disabled={!(search?.length > 9 && search?.length < 12)}
                className=" text-white items-center border-2 rounded w-full py-1  "
                onClick={() => SearchHandler()}>
                جست و جو{' '}
              </button>
            </div>
          </div>
          <div className="flex gap-x-5 items-end ">
            <div className="flex gap-x-3 items-center ">
              <p>کاربر حقیقی:</p>

              <input
                type="checkbox"
                className="w-5 h-5 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent dark:focus:ring-accent focus:outline-none dark:ring-offset-gray-800 focus:ring-2 dark:bg-accent dark:border-accent"
                checked={usertype == false && true}
                onClick={() => setUsertype(!usertype)}
              />
            </div>
            <div className="flex gap-x-3 items-center">
              <p>کاربر حقوقی:</p>
              <input
                type="checkbox"
                className="w-5 h-5 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent dark:focus:ring-accent focus:outline-none dark:ring-offset-gray-800 focus:ring-2 dark:bg-accent dark:border-accent"
                checked={usertype == true && true}
                onClick={() => setUsertype(!usertype)}
              />
            </div>
          </div>
          <div className="flex gap-x-5">
            <ImpersonateModal />
          </div>
        </div>

        <div className="relative overflow-x-auto md:rounded-lg mt-8 p-2">
          {usertype ? (
            <table className="table-auto bordered font-IRANYekanX w-full" id="element">
              <thead className="font-normal  text-base text-right text-dominant-500">
                <tr className="">
                  <th className="  bg-secondary p-4">ردیف</th>
                  <th className="  bg-secondary p-4">تاریخ ایجاد</th>
                  <th className="  bg-secondary p-4">نام شرکت </th>
                  <th className="  bg-secondary p-4"> تاریخ تاسیس</th>
                  <th className="  bg-secondary p-4">شناسه اقتصادی</th>
                  <th className="  bg-secondary p-4">شماره ثبت </th>
                  <th className="  bg-secondary p-4">محل ثبت </th>
                  <th className="  bg-secondary p-4">نام کاربری </th>
                  <th className="  bg-secondary p-4"></th>
                  <th className="  bg-secondary p-4"></th>
                </tr>
              </thead>
              {searchActive ? (
                <tbody>
                  {response && (
                    <tr
                      key={1}
                      className=" border-t-2 p-10  border-2 border-accent rounded-md font-semibold text-caption text-right text-dominant-500">
                      <td className="p-3 ">1</td>
                      <td className="p-3 ">
                        {response?.data?.createDate && getDate(response?.data?.createDate)}
                      </td>
                      <td className="p-3 ">{response?.data?.legalPerson?.companyName}</td>
                      <td className="p-3 ">
                        {response?.data?.legalPerson
                          ? getDate(response?.data?.legalPerson?.registerDate)
                          : '----'}
                      </td>
                      <td className="p-3 ">{response?.data?.legalPerson?.economicCode}</td>
                      <td className="p-3 ">{response?.data?.legalPerson?.registerNumber}</td>
                      <td className="p-3 ">{response?.data?.legalPerson?.registerPlace}</td>
                      <td className="p-3 ">{response?.data?.username}</td>
                      <td
                        className="p-3 hover:text-accent cursor-pointer border-b-2 border-accent"
                        onClick={() =>
                          navigate(`/users/details/${response?.data?.username}/${usertype}`)
                        }>
                        جزییات
                      </td>
                      <td
                        className="p-3 text-accent cursor-pointer "
                        onClick={() => GetImpersonateToken(response?.data?.username)}>
                        ورود به پنل کاربر{' '}
                      </td>
                    </tr>
                  )}
                </tbody>
              ) : (
                <tbody>
                  {response &&
                    response?.data?.map((data, index) => (
                      <tr
                        key={index}
                        className=" border-t-2 p-10  border-2 border-accent rounded-md font-semibold text-caption text-right text-dominant-500">
                        <td className="p-3 ">{index + 1}</td>
                        <td className="p-3 ">{data?.createDate && getDate(data?.createDate)}</td>
                        <td className="p-3 ">{data?.legalPerson?.companyName}</td>
                        <td className="p-3 ">
                          {data?.legalPerson ? getDate(data?.legalPerson?.registerDate) : '----'}
                        </td>
                        <td className="p-3 ">{data?.legalPerson?.economicCode}</td>
                        <td className="p-3 ">{data?.legalPerson?.registerNumber}</td>
                        <td className="p-3 ">{data?.legalPerson?.registerPlace}</td>
                        <td className="p-3 ">{data?.username}</td>
                        <td
                          className="p-3 hover:text-accent cursor-pointer border-b-2 border-accent "
                          onClick={() => navigate(`/users/details/${data?.username}/${usertype}`)}>
                          جزییات
                        </td>
                        <td
                          className="p-3 text-accent cursor-pointer "
                          onClick={() => GetImpersonateToken(data?.username)}>
                          ورود به پنل کاربر{' '}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          ) : (
            <table className="table-auto bordered font-IRANYekanX w-full " id="element">
              <thead className="font-normal  text-base text-right text-dominant-500">
                <tr className="">
                  <th className="  bg-secondary p-4">ردیف</th>
                  <th className="  bg-secondary p-4">تاریخ ایجاد</th>
                  <th className="  bg-secondary p-4">نام خانوادگی</th>
                  <th className="  bg-secondary p-4"> تاریخ تولد</th>
                  <th className="  bg-secondary p-4"> محل تولد</th>
                  <th className="  bg-secondary p-4">کدملی</th>
                  <th className="  bg-secondary p-4">نام کاربری</th>
                  <th className="  bg-secondary p-4"></th>
                </tr>
              </thead>
              {searchActive ? (
                <tbody>
                  {response && (
                    <tr
                      key={1}
                      className=" border-t-2 p-10  border-2 border-accent rounded-md font-semibold text-caption text-right text-dominant-500">
                      <td className="p-3 ">1</td>
                      <td className="p-3 ">
                        {response?.data?.createDate && getDate(response?.data?.createDate)}
                      </td>
                      <td className="p-3 ">
                        {response?.data?.realPerson?.firstName +
                          response?.data?.realPerson?.lastName}
                      </td>
                      <td className="p-3 ">
                        {response?.data?.realPerson
                          ? getDate(response?.data?.realPerson?.birthDate)
                          : '----'}
                      </td>
                      <td className="p-3 ">{response?.data?.realPerson?.placeOfBirth}</td>
                      <td className="p-3 ">{response?.data?.realPerson?.shNumber}</td>
                      <td className="p-3 ">{response?.data?.username}</td>
                      <td
                        className="p-3 hover:text-accent cursor-pointer border-b-2 border-accent "
                        onClick={() =>
                          navigate(`/users/details/${response?.data?.username}/${usertype}`)
                        }>
                        جزییات
                      </td>
                      <td
                        className="p-3 text-accent cursor-pointer "
                        onClick={() => GetImpersonateToken(response?.data?.username)}>
                        ورود به پنل کاربر{' '}
                      </td>{' '}
                    </tr>
                  )}
                </tbody>
              ) : (
                <tbody>
                  {response &&
                    response?.data?.map((data, index) => (
                      <tr
                        key={index}
                        className=" border-t-2 p-10  border-2 border-accent rounded-md font-semibold text-caption text-right text-dominant-500">
                        <td className="p-3 ">{index + 1}</td>
                        <td className="p-3 ">{getDate(data?.createDate)}</td>
                        <td className="p-3 ">
                          {data?.realPerson?.firstName + data?.realPerson?.lastName}
                        </td>
                        <td className="p-3 ">
                          {data?.realPerson ? getDate(data?.realPerson?.birthDate) : '----'}
                        </td>
                        <td className="p-3 ">{data?.realPerson?.placeOfBirth}</td>
                        <td className="p-3 ">{data?.realPerson?.shNumber}</td>
                        <td className="p-3 ">{data?.username}</td>
                        <td
                          className="p-3 hover:text-accent cursor-pointer border-b-2 border-accent "
                          onClick={() => navigate(`/users/details/${data?.username}/${usertype}`)}>
                          جزییات
                        </td>
                        <td
                          className="p-3 text-accent cursor-pointer "
                          onClick={() => GetImpersonateToken(data?.username)}>
                          ورود به پنل کاربر{' '}
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          )}
          {isloading && (
            <div className=" w-full flex-col flex items-center">
              <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-accent mt-2"></div>
            </div>
          )}
          {!response && isloading === false && (
            <div className=" w-full flex-col flex items-center pt-5 text-caption font-medium text-dominant">
              <p className="text-white">کاربری یافت نشد </p>
            </div>
          )}
          {!search && (
            <div className=" relative flex justify-center p-8">
              {' '}
              <PaginationComponet
                itemCount={response?.pagination?.total}
                pagesize={10}
                onPagechange={(page) => handlePageChange(page)}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
