/* eslint-disable no-unused-vars */
import PaginationComponet from 'component/pagination/paginationComponent';
import React, { useEffect, useState } from 'react';
import { GetWalletFlowsReq, UpdateWalletFlowStatusReq } from './Api/transactionReq';
import { AutoCompleteUsernameReq } from 'pages/Payment/Api/paymentReq';
import Sidebar from 'component/layout/sidebar/SideBar';
import Input from 'component/input/Input';
import Button from 'component/button/Button';
import { getDate } from 'component/DateFunctions/DateFunctions';
import { OperationType, walletflowstatus } from './enum/transaction';
import TransactionModal from 'component/modal/TransactionModal';
import Dropdown from 'component/button/DropDown';
import { toast } from 'react-toastify';

function Transactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();
  const [userId, setUserId] = useState();
  const [nationalId, setNationalId] = useState();
  const [search, setSearch] = useState();
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState();
  const [operationType, setOperationType] = useState();
  let [isOpen, setIsOpen] = useState(false);

  //   const navigate = useNavigate();

  useEffect(() => {
    !isOpen && GetWalletFlows();
    setSearch();
  }, [userId, currentPage, alert, status, operationType, isOpen]);

  useEffect(() => {
    AutoCompleteUsername();
    setSearch();
  }, [nationalId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const Skip = currentPage === 1 ? 0 : 10 * (currentPage - 1);

  const GetWalletFlows = async () => {
    setSearch();
    setResponse();
    setIsloading(true);
    const res = await GetWalletFlowsReq({
      userId,
      operationTypes: operationType && [operationType],
      pagination: {
        take: 10,
        Skip
      },
      status
    });
    setIsloading(false);
    setResponse(res);
  };

  const AutoCompleteUsername = async () => {
    const res = await AutoCompleteUsernameReq(nationalId);
    setSearch(res?.data);
  };

  const UpdateWallFlowetStatus = async (walletFlowId, status) => {
    const res = await UpdateWalletFlowStatusReq({
      walletFlowId,
      status
    });
    if (res) {
      setAlert(true);
    } else {
      toast.warning('عملیات انجام نشد ');
    }
  };
  console.log(response);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        <div className="bg-slate-100 rounded-lg  w-2/3 flex justify-center gap-x-5 p-3 items-center">
          <div className="w-3/5 flex justify-center gap-x-4">
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
            <div className="flex items-end  justify-start">
              <Button
                disable={nationalId?.length === 10 || nationalId?.length === 11}
                name="جست و جو "
                func={() => GetWalletFlows()}
              />
            </div>
          </div>

          <div className="flex w-auto gap-x-2 items-end">
            {' '}
            <Dropdown arrey={OperationType} state={operationType} setstate={setOperationType} />
            <Dropdown arrey={walletflowstatus} state={status} setstate={setStatus} />
          </div>
        </div>

        <div className="relative overflow-x-auto md:rounded-lg mt-8 p-2 ">
          <table className="table-auto bordered font-IRANYekanX w-full " id="element">
            <thead className="font-normal w-full text-base text-center text-dominant-500">
              <tr className="">
                <th className="  bg-secondary p-2">ردیف</th>
                <th className="  bg-secondary p-2">نام </th>
                <th className="  bg-secondary p-2">نام کاربری</th>
                <th className="  bg-secondary p-2">تاریخ تراکنش</th>
                <th className="  bg-secondary p-2">توضیح تراکنش</th>
                <th className="  bg-secondary p-2">مبلغ ترانکش</th>
                <th className="  bg-secondary p-2">نوع تراکنش</th>
                <th className="  bg-secondary p-2">وضعیت ترانکش</th>
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
                    <td className="p-2 ">
                      {item?.flowDescription ? item?.flowDescription : '-----'}
                    </td>
                    <td className="p-2 ">{Number(item?.moneyAmount)?.toLocaleString()} ریال</td>
                    <td className="p-2 ">{OperationType[item?.operationType]}</td>
                    <td className="p-2 ">{walletflowstatus[item?.status]}</td>
                    <td className="p-2 gap-x-2 flex justify-center  ">
                      {item?.status == 1 && (
                        <>
                          <TransactionModal
                            id={item?.id}
                            Alert={alert}
                            setAlert={setAlert}
                            type="confirm"
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                          />
                          <TransactionModal
                            id={item?.id}
                            Alert={alert}
                            setAlert={setAlert}
                            type="cancel"
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                          />
                        </>
                      )}
                      {item?.operationType == 5 && item?.status == 2 && (
                        <button
                          className="rounded-lg  bg-accent-500 text-white  px-4 py-2"
                          onClick={() => {
                            UpdateWallFlowetStatus(item?.id, 4);
                          }}>
                          پرداخت
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

export default Transactions;
