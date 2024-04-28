/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { GetAllPlanOrdersReq, GetPlanDetailsReq } from '../Api/PlanReq';
import { Link } from 'react-router-dom';
import { BaseUrl } from 'component/baseURL/BaseUrl';
import { planstate } from '../enum/PlanState';
import PaginationComponet from 'component/pagination/paginationComponent';
import { getDate, getTime } from 'component/DateFunctions/DateFunctions';
import { GetALLUsersOrderReq } from 'pages/UserOrder/Api/userOrderReq';
import { orderState } from '../enum/OrderState';

const PlanDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    GetPlanDetails();
  }, []);

  useEffect(() => {
    GetALLPlanOrders();
  }, [currentPage]);

  const GetPlanDetails = async () => {
    const res = await GetPlanDetailsReq(id);
    setDetails(res);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

  const GetALLPlanOrders = async () => {
    setIsloading(true);
    const res = await GetAllPlanOrdersReq({
      investmentId: id,
      pagination: {
        take: 10,
        skip: Skip
      }
    });
    setIsloading(false);
    setResponse(res);
  };

  console.log('details', response);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-3/4 max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-9 gap-y-5 ">
        <div className=" w-full  gap-x-5 flex justify-between">
          <div className="w-1/2">
            {' '}
            <div className="w-full  h-1/3 flex flex-col justify-end">
              <a
                className="flex cursor-pointer"
                onClick={() => navigate(`/plans/plan_details_edit/${details?.id}`)}>
                {/* <img src={arrow} className="w-fit h-fit scale-75   rotate-180" /> */}
                <p className="text-gray-700  text-sm ">ویرایش طرح</p>
              </a>
            </div>
          </div>
          <div className=" w-1/2 flex justify-end ">
            {' '}
            <div
              className="w-fit
              h-1/3 flex flex-col justify-end">
              <a className="flex cursor-pointer" onClick={() => navigate(-1)}>
                {/* <img src={arrow} className="w-fit h-fit scale-75   rotate-180" /> */}
                <p className="text-gray-600  text-sm ">بازگشت</p>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full gap-y-7 flex flex-col " id="element">
          <p className="w-fit text-base font-bold text-dominant-500 ">تصویر بارگذاری شده پروژه :</p>
          <div className="w-full flex flex-wrap gap-x-5 justify-center">
            {details?.coverImagePaths.length > 0 ? (
              details?.coverImagePaths?.map((url, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={BaseUrl + url}
                      className="flex flex-col gap-y-5 items-center"
                      target="_blank">
                      <img src={BaseUrl + url} className=" cursor-pointer object-fill h-40 w-90 " />
                      <p className="text-dominant-500 border-b border-white text-sm">
                        مشاهده تصویر
                      </p>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>تصویر برای این طرح بارگذاری نشده است </p>
            )}
          </div>
        </div>
        <div className="w-full border-b border-white border-dashed" />
        <div className="w-full gap-10 flex flex-wrap rounded-lg " id="element">
          <div className=" flex flex-wrap gap-x-5 justify-start">
            <p className="text-base font-bold"> نام طرح:</p>
            <p className="text-base text-accent font-bold">{details?.title} </p>
          </div>
          <div className=" flex flex-wrap gap-x-5 justify-start">
            <p className="text-sm font-bold"> وضعیت طرح:</p>
            <p className="text-base font-normal text-red-400">{planstate[details?.state]} </p>
          </div>
          <div className=" flex flex-wrap gap-x-5 justify-start">
            <p className="text-sm font-bold"> مبلغ هرواحد:</p>
            <p className="text-sm font-normal">{details?.unitAmount?.toLocaleString()} ریال</p>
          </div>
          <div className=" flex flex-wrap gap-x-5 justify-start">
            <p className="text-sm font-bold"> تعداد واحد باقی مانده:</p>
            <p className="text-sm font-normal">{details?.unitAvailable?.toLocaleString()} واحد</p>
          </div>
          <div className=" flex flex-wrap gap-x-5 justify-start">
            <p className="text-sm font-bold"> حداکثر واحد قابل خرید :</p>
            <p className="text-sm font-normal">{details?.unitCount?.toLocaleString()} واحد</p>
          </div>
          <div className=" flex flex-wrap gap-x-5 justify-start">
            <p className="text-sm font-bold">تعداد واحد خریداری شده:</p>
            <p className="text-sm font-normal">{details?.unitRaised?.toLocaleString()} واحد</p>
          </div>
        </div>
        <div className="w-full border-b border-white border-dashed" />
        <div className="w-full flex flex-wrap gap-x-5 justify-start rounded-lg" id="element">
          <p className="text-sm font-bold"> توضیحات:</p>
          <p className="text-sm font-normal">{details?.description} </p>
        </div>
        <div className="w-full border-b border-white border-dashed" />
        <div className="w-full gap-10 flex flex-wrap rounded-lg " id="element">
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold"> مبلغ افزایشی :</p>
            <p className="text-sm font-normal">{details?.amountRaised} ریال</p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold"> نرخ سالانه:</p>
            <p className="text-sm font-normal">{details?.annualRate} %</p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold"> تاریخ ایجاد طرح:</p>
            <p className="text-sm font-normal">
              {new Date(details?.createDate).toLocaleDateString('fa-IR')}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold">تاریخ پایان طرح:</p>
            <p className="text-sm font-normal">
              {new Date(details?.endDate).toLocaleDateString('fa-IR')}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold">ارزش نهایی:</p>
            <p className="text-sm font-normal">{details?.goal.toLocaleString()} ریال</p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold">تعداد اقساط : </p>
            <p className="text-sm font-normal">{details?.installmentCount} </p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold">بازه زمانی اقساط :</p>
            <p className="text-sm font-normal">{details?.installmentPeriod} ماهه</p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold">طول دوره سرمایه گذاری :</p>
            <p className="text-sm font-normal">{details?.investmentPeriod} ماهه</p>
          </div>
          <div className="flex flex-wrap gap-x-5 justify-center">
            <p className="text-sm font-bold">حداکثر واحد برای هر سرمایه گذار:</p>
            <p className="text-sm font-normal">{details?.maxUnitPerInvestor} واحد</p>
          </div>
        </div>
        <div className="w-full border-b border-white border-dashed" />
        <div
          className="w-full flex flex-wrap gap-x-5 justify-start items-center rounded-lg"
          id="element">
          <p className="text-sm font-bold">حداکثر واحد برای هر سرمایه گذار:</p>
          {details?.scheduledPayments?.map((item, index) => (
            <div className="flex flex-col shadow-2xl border border-accent rounded  bg-slate-100  p-2 justify-center items-center gap-y-2">
              <div className="flex justify-center gap-x-2 items-center">
                <p className="text-sm font-bold">تاریخ پرداخت : </p>
                <p className="text-sm font-normal">
                  {new Date(item?.date).toLocaleDateString('fa-IR')}{' '}
                </p>
              </div>
              <div className="w-1/2 border-b border-white  " />

              <div className="  flex  justify-center gap-x-2 items-center">
                <p className="text-sm font-bold">درصد سود : </p>
                <p className="text-sm font-normal">{item?.percent} % </p>
              </div>
            </div>
          ))}{' '}
        </div>
        <div className="w-full border-b border-accent border-dashed" />
        <div className="w-full flex flex-col items-start gap-y-8 rounded-lg" id="element">
          <div className="w-fit flex flex-wrap gap-x-5 justify-start border-b border-accent">
            <p className="text-base text-dominant-500 font-bold"> فایل های بارگذاری شده:</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className=" flex flex-wrap gap-x-2 justify-start">
              <p className="text-sm font-bold "> قرار داد:</p>
              <p className="text-sm font-normal">
                {' '}
                {details?.contractFilePath ? (
                  <Link
                    to={BaseUrl + details?.contractFilePath}
                    className="flex flex-col gap-y-5 items-center"
                    target="_blank">
                    <p className="text-accent border-b border-accent text-sm">مشاهده فایل</p>
                  </Link>
                ) : (
                  ' ندارد '
                )}
              </p>
            </div>
            <div className=" flex flex-wrap gap-x-2 justify-start">
              <p className="text-sm font-bold ">گارانتی طرح:</p>
              <p className="text-sm font-normal">
                {' '}
                {details?.warrantyImagePath ? (
                  <Link
                    to={BaseUrl + details?.warrantyImagePath}
                    className="flex flex-col gap-y-5 items-center"
                    target="_blank">
                    <p className="text-accent border-b border-accent text-sm">مشاهده فایل</p>
                  </Link>
                ) : (
                  'ندارد'
                )}
              </p>
            </div>
            <div className=" flex flex-wrap gap-x-2 justify-start">
              <p className="text-sm font-bold "> نتیجه ارزیابی:</p>
              <p className="text-sm font-normal">
                {' '}
                {details?.evaluationResultsFilePath ? (
                  <Link
                    to={BaseUrl + details?.evaluationResultsFilePath}
                    className="flex flex-col gap-y-5 items-center"
                    target="_blank">
                    <p className="text-accent border-b border-accent text-sm">مشاهده فایل</p>
                  </Link>
                ) : (
                  'ندارد '
                )}
              </p>
            </div>
            <div className=" flex flex-wrap gap-x-2 justify-start">
              <p className="text-sm font-bold "> تایید نهایی:</p>
              <p className="text-sm font-normal">
                {' '}
                {details?.evaluationResultsFilePath ? (
                  <Link
                    to={BaseUrl + details?.institutionalApprovalFilePath}
                    className="flex flex-col gap-y-5 items-center"
                    target="_blank">
                    <p className="text-accent border-b border-accent text-sm">مشاهده فایل</p>
                  </Link>
                ) : (
                  'ندارد '
                )}
              </p>
            </div>
            <div className=" flex flex-wrap gap-x-2 justify-start">
              <p className="text-sm font-bold "> مستندات پروژه:</p>
              <p className="text-sm font-normal">
                {' '}
                {details?.projectDocumentationFilePath ? (
                  <Link
                    to={BaseUrl + details?.projectDocumentationFilePath}
                    className="flex flex-col gap-y-5 items-center"
                    target="_blank">
                    <p className="text-accent border-b border-accent text-sm">مشاهده فایل</p>
                  </Link>
                ) : (
                  'ندارد'
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg mt-8">
          <table className="table-auto bordered font-IRANYekanX w-full border-2 border-accent rounded-md">
            <thead className=" text-dominant-400 font-semibold text-caption text-right">
              <tr className="">
                <th className="  bg-secondary p-4"></th>
                <th className="  bg-secondary p-4">سرمایه گذار </th>
                <th className=" bg-secondary p-4">نام کاربری سرمایه گذار </th>
                <th className=" bg-secondary p-4">تاریخ سرمایه گذاری </th>
                <th className=" bg-secondary p-4">تعداد واحد خریداری شده </th>
                <th className=" bg-secondary p-4">وضعیت خرید </th>
              </tr>
            </thead>
            <tbody>
              {response &&
                response?.data?.map((data, index) => (
                  <tr
                    key={index}
                    className="border-2 border-accent rounded-md border-t-2 p-10 text-dominant-400 font-semibold text-caption text-right">
                    <td className="p-3 ">{Skip + index + 1}</td>
                    <td className="p-3">{data?.user.name}</td>
                    <td className="p-3">{data?.user.username}</td>
                    <td className="p-3 text-center ">
                      {data?.createDate && getDate(data?.createDate)}
                    </td>
                    <td className="p-3 text-center ">{data?.totalUnit} واحد</td>
                    <td className="p-3 text-center ">{orderState[data?.orderState]} </td>
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
              <p>درخواستی برای این طرح یافت نشد</p>
            </div>
          )}
          <div className="flex justify-center p-8">
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
};

export default PlanDetails;
