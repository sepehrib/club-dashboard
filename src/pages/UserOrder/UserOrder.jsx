/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import React, { useEffect, useState } from 'react';
import { GetALLUsersOrderReq } from './Api/userOrderReq';
import PaginationComponet from 'component/pagination/paginationComponent';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import { GetUserByNationalIdReq } from 'pages/User/Api/UserReq';
import { getDate } from 'component/DateFunctions/DateFunctions';
import { useNavigate } from 'react-router';

function UserOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();
  const [nationalId, setNationalId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    GetALLUsersOrder();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const Skip = currentPage === 1 ? 0 : 5 * (currentPage - 1);

  const GetALLUsersOrder = async () => {
    setIsloading(true);
    const res = await GetALLUsersOrderReq({
      nationalId,
      pagination: {
        take: 5,
        skip: Skip
      }
    });

    setIsloading(false);
    setResponse(res);
  };

  const HandleSearch = async () => {
    const Userid = await GetUserByNationalIdReq(nationalId);
    if (Userid?.data?.id) {
      console.log(Userid?.data?.id);
      setIsloading(true);
      const res = await GetALLUsersOrderReq({
        investorId: Userid?.data?.id,
        pagination: {
          take: 5,
          skip: Skip
        }
      });
      console.log(res);
      setIsloading(false);
      setResponse(res);
    } else {
      console.log('false');

      setResponse(false);
    }
  };
  console.log(response);

  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className="bg-slate-100 rounded-lg  w-1/2 flex justify-center gap-x-3 p-3">
          <Input
            label="جست و جو"
            placeholder="...نام کاربری"
            setvalue={setNationalId}
            value={nationalId}
            id="element"
          />
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
            <thead className="font-normal  text-base text-right text-dominant-500">
              <tr className="">
                <th className="  bg-secondary p-4">ردیف</th>
                <th className="  bg-secondary p-4">تاریخ سفارش</th>
                <th className="  bg-secondary p-4">مبلغ سفارش</th>
                <th className="  bg-secondary p-4">تعداد واحد سفارش</th>
                <th className="  bg-secondary p-4 flex justify-center">عنوان طرح</th>
                <th className="  bg-secondary p-4 "></th>
              </tr>
            </thead>
            <tbody className="p-10">
              {response &&
                response?.data?.map((item, index) => (
                  <tr
                    key={index}
                    className=" border-t-2   border border-accent rounded-md font-semibold text-caption text-right text-dominant-500  ">
                    <td className="p-3 ">{Skip + index + 1}</td>
                    <td className="p-3 ">{getDate(item?.createDate)}</td>
                    <td className="p-3 ">{Number(item?.totalInvest).toLocaleString()} ریال</td>
                    <td className="p-3 flex justify-center ">
                      {Number(item?.totalUnit).toLocaleString()}{' '}
                    </td>
                    <td className="p-3  text-center ">{item?.investment?.title} </td>
                    <td
                      className="p-3 border-b-2 hover:text-accent cursor-pointer border-accent"
                      onClick={() => navigate(`/user_order/${item?.id}`)}>
                      مشاهده جزییات
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
          {!response && isloading === false && (
            <div className=" w-full flex-col flex items-center pt-5 text-caption font-medium text-dominant">
              <p className="text-white">کاربری یافت نشد </p>
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

export default UserOrder;
