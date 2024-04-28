/* eslint-disable no-unused-vars */
import Button from 'component/button/Button';
import Sidebar from 'component/layout/sidebar/SideBar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { planstate } from '../enum/PlanState';
import DropDownButton from 'component/button/DropDownButton';
import {
  GetPlanDetailsReq,
  UpdateInvestmentFileReq,
  UpdateInvestmentStateReq
} from '../Api/PlanReq';
import FileUploadPage from 'component/input/uploadInput';
import { Link } from 'react-router-dom';
import InlineSVG from 'react-inlinesvg';
import trash from 'asset/image/Trash/1486504830-delete-dustbin-empty-recycle-recycling-remove-trash_81361.svg';

const PlanDetailsEdit = () => {
  const [status, setStatus] = useState();
  const [disableStatus, setDisableStatus] = useState(false);
  const [disableFile, setDisableFile] = useState(false);
  const [statusAlert, setStatusAlert] = useState();
  const [uploadAlert, setUploadAlert] = useState();
  const [warrantyImagePath, setWarrantyImagePath] = useState();
  const [contractFilePath, setContractFilePath] = useState();
  const [projectDocumentationFilePath, setProjectDocumentationFilePath] = useState();
  const [evaluationResultsFilePath, setEvaluationResultsFilePath] = useState();
  const [institutionalApprovalFilePath, setInstitutionalApprovalFilePath] = useState();
  const [details, setDetails] = useState();

  useEffect(() => {
    GetPlanDetails();
  }, []);

  useEffect(() => {
    setStatus(planstate[details?.state]);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const statusHandler = (e) => {
    setDisableStatus(true);
    setStatus(e);
  };
  const UploadFileHandler = (setField, e) => {
    setDisableFile(true);
    setField(e);
  };

  const GetPlanDetails = async () => {
    const res = await GetPlanDetailsReq(id);
    setWarrantyImagePath(res?.warrantyImagePath);
    setContractFilePath(res?.contractFilePath);
    setProjectDocumentationFilePath(res?.projectDocumentationFilePath);
    setEvaluationResultsFilePath(res?.evaluationResultsFilePath);
    setInstitutionalApprovalFilePath(res?.institutionalApprovalFilePath);
    setDetails(res);
  };

  const UpdateInvestmentState = async () => {
    const res = await UpdateInvestmentStateReq({
      investmentId: Number(id),
      state: planstate.indexOf(status)
    });
    console.log(res);
    if (res) {
      setStatusAlert({ des: 'ثبت شد ', color: 'text-satisfication-85' });
    } else {
      setStatusAlert({ des: 'ثبت ناموفق !!', color: 'text-satisfication-60 ' });
    }
  };

  const UpdateInvestmentFile = async () => {
    setDisableFile(true);
    const res = await UpdateInvestmentFileReq({
      investmentId: Number(id),
      warrantyImagePath,
      contractFilePath,
      projectDocumentationFilePath,
      evaluationResultsFilePath,
      institutionalApprovalFilePath
    });
    if (res) {
      setUploadAlert({ des: 'ثبت شد ', color: 'text-satisfication-85' });
    } else {
      setUploadAlert({ des: 'ثبت ناموفق !!', color: 'text-satisfication-60 ' });
    }
  };

  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex text-satisfication-85 ">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 gap-y-5 ">
        <div className=" w-full flex justify-end ">
          {' '}
          <div
            className="w-fit
              h-1/3 flex flex-col justify-end">
            <a className="flex cursor-pointer" onClick={() => navigate(-1)}>
              {/* <img src={arrow} className="w-fit h-fit scale-75   rotate-180" /> */}
              <p className="text-gray-600 border-b border-accent text-sm  font-semibold ">بازگشت</p>
            </a>
          </div>
        </div>
        <div className="w-full border-2 border-accent rounded-md p-2 shadow-2xl flex justify-between  ">
          <div className="w-1/2 p-5 flex justify-start gap-x-5">
            <DropDownButton
              label="وضعیت طرح"
              items={planstate}
              selected={!status ? planstate[details?.state] : status}
              setSelected={statusHandler}
              title=""
              width={'w-auto'}
            />
            {statusAlert && (
              <p
                className={`${statusAlert?.color} font-semibold flex  text-base  text-center items-end `}>
                {statusAlert?.des}
              </p>
            )}
          </div>
          <div className=" w-1/2 flex justify-end p-5">
            <Button
              disable={disableStatus}
              name="ثبت "
              width="w-1/3"
              func={UpdateInvestmentState}
            />
          </div>
        </div>
        <div className=" flex flex-col border-2 border-accent rounded-md rounded-lg p-3 gap-4">
          <span className=" text-accent-300"> محل بارگذاری فایل ها :</span>
          <div className="flex flex-wrap  gap-7 justify-start ">
            <div className="flex  items-center gap-x-2">
              <p className=" text-dominant-500  flex items-center"> گارانتی : </p>
              {warrantyImagePath ? (
                <Link
                  className=" border-b-2 border-accent text-accent"
                  to={`http://192.168.0.29:7181/${warrantyImagePath}`}
                  target="_blank">
                  مشاهده فایل
                </Link>
              ) : (
                <FileUploadPage
                  setFileAddres={(address) => UploadFileHandler(setWarrantyImagePath, address)}
                  setid={0}
                  id={0}
                />
              )}
              <p
                src={trash}
                className="text-satisfication-60 cursor-pointer text-2xl  px-2 font-bold text-center"
                onClick={() => {
                  setWarrantyImagePath('');
                  setDisableFile(true);
                }}>
                {' '}
                X
              </p>
            </div>
            <div className="flex  items-center gap-x-2">
              <p className=" text-dominant-500  flex items-center"> نتایج ارزیابی: </p>
              {evaluationResultsFilePath ? (
                <Link
                  className=" border-b-2 border-accent text-accent"
                  to={`http://192.168.0.29:7181/${evaluationResultsFilePath}`}
                  target="_blank">
                  مشاهده فایل
                </Link>
              ) : (
                <FileUploadPage
                  setFileAddres={(address) =>
                    UploadFileHandler(setEvaluationResultsFilePath, address)
                  }
                  setid={0}
                  id={0}
                />
              )}
              <p
                src={trash}
                className="text-satisfication-60 cursor-pointer text-2xl  px-2 font-bold text-center"
                onClick={() => {
                  setEvaluationResultsFilePath('');
                  setDisableFile(true);
                }}>
                {' '}
                X
              </p>
            </div>
            <div className="flex  items-center gap-x-2">
              <p className=" text-dominant-500 text-sm flex items-center">قرداد: </p>
              {contractFilePath ? (
                <Link
                  className=" border-b-2 border-accent text-accent"
                  to={`http://192.168.0.29:7181/${contractFilePath}`}
                  target="_blank">
                  مشاهده فایل
                </Link>
              ) : (
                <FileUploadPage
                  setFileAddres={(address) => UploadFileHandler(setContractFilePath, address)}
                  setid={0}
                  id={0}
                />
              )}
              <p
                src={trash}
                className="text-satisfication-60 cursor-pointer text-2xl  px-2 font-bold text-center"
                onClick={() => {
                  setContractFilePath('');
                  setDisableFile(true);
                }}>
                {' '}
                X
              </p>
            </div>
            <div className="flex  items-center gap-x-2">
              <p className=" text-dominant-800 text-sm flex items-center">تاییدیه نهادی: </p>

              {institutionalApprovalFilePath ? (
                <Link
                  className=" border-b-2 border-accent text-accent"
                  to={`http://192.168.0.29:7181/${institutionalApprovalFilePath}`}
                  target="_blank">
                  مشاهده فایل
                </Link>
              ) : (
                <FileUploadPage
                  setFileAddres={(address) =>
                    UploadFileHandler(setInstitutionalApprovalFilePath, address)
                  }
                  setid={0}
                  id={0}
                />
              )}
              <p
                src={trash}
                className="text-satisfication-60 cursor-pointer text-2xl  px-2 font-bold text-center"
                onClick={() => {
                  setInstitutionalApprovalFilePath('');
                  setDisableFile(true);
                }}>
                {' '}
                X
              </p>
            </div>
            <div className="flex  items-center gap-x-2">
              <p className=" text-dominant-500 text-sm flex items-center">مستندات پروژه: </p>
              {projectDocumentationFilePath ? (
                <Link
                  className=" border-b-2 border-accent text-accent"
                  to={`http://192.168.0.29:7181/${projectDocumentationFilePath}`}
                  target="_blank">
                  مشاهده فایل
                </Link>
              ) : (
                <FileUploadPage
                  setFileAddres={(address) =>
                    UploadFileHandler(setProjectDocumentationFilePath, address)
                  }
                  setid={0}
                  id={0}
                />
              )}
              <p
                src={trash}
                className="text-satisfication-60 cursor-pointer text-2xl  px-2 font-bold text-center"
                onClick={() => {
                  setProjectDocumentationFilePath('');
                  setDisableFile(true);
                }}>
                {' '}
                X
              </p>
            </div>
            <Button disable={disableFile} func={UpdateInvestmentFile} name="ثبت" width="w-full" />
            {uploadAlert && (
              <div className="w-full p-2 flex justify-end">
                <p
                  className={`${uploadAlert?.color} font-semibold flex  text-base  text-center items-end `}>
                  {uploadAlert?.des}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsEdit;
