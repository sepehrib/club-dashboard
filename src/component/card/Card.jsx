/* eslint-disable no-unused-vars */
import Button from 'component/button/Button';
import { planstate } from 'pages/Plans/enum/PlanState';
import { useNavigate, useParams } from 'react-router-dom';
import arrow from 'asset/image/icon/arrowIcon/arrow-left.png';

const Card = ({
  coverimages,
  annualRate,
  title,
  unitAmount,
  unitAvailable,
  redirectRout,
  state,
  editRout
}) => {
  const navigate = useNavigate();
  const param = useParams();

  console.log('cover', coverimages);

  console.log(state);
  return (
    <div className="p-3 w-1/2">
      <div
        className="w-full flex border font-IRANYekanX border-dominant-200  justify-between items-center p-2 gap-x-3 rounded-lg shadow-2xl border-2 border-accent rounded-md h-full "
        id="element">
        <div className="w-1/2 h-full flex justify-between items-end  flex-col gap-y-6 ">
          {coverimages && coverimages.length > 0 ? (
            <div className="h-2/3 flex flex-col justify-start">
              <img src={`http://192.168.0.29:7181/${coverimages[0]}`} />
            </div>
          ) : (
            <div className="h-2/3 flex flex-col justify-end">
              <p className="text-center font-normal text-base text-accent-400">
                تصویری برای طرح شما بارگذاری نشده است
              </p>
            </div>
          )}
          <div className="w-full  h-1/3 flex flex-col justify-end">
            <a className="flex cursor-pointer" onClick={() => navigate(editRout)}>
              <img src={arrow} className="w-fit h-fit scale-75   rotate-180" />
              <p className="text-dominant-500 border-b border-accent text-xs ">ویرایش طرح</p>
            </a>
          </div>
        </div>
        <div className=" h-full border-l border-dashed border-white py-2" />

        <div className=" flex flex-col justify-center align-baseline items-center gap-y-3 w-1/2">
          <div className="text-base font-normal text-dominant-500 text-center ">
            <p className="text-base">{title}</p>{' '}
          </div>
          <div className="  w-3/4 border-b border-dashed border-white py-2" />
          <div className="flex gap-x-3">
            <p className="font-bold text-sm"> سودهی سالانه :</p>
            <p className="text-sm"> {annualRate} %</p>{' '}
          </div>
          <div className=" flex gap-x-3 ">
            <p className="font-bold text-sm">قیمت هر واحد :</p>
            <p className="text-sm "> {Number(unitAmount).toLocaleString()} ریال</p>
          </div>
          <div className=" flex gap-x-3">
            <p className="font-bold text-sm">تعداد واحد موجود : </p>
            <p className="text-sm">{unitAvailable} واحد</p>
          </div>
          <div className="text-sm  flex align-baseline items-center gap-x-3 ">
            <p className="font-IRANYekanX font-bold text-sm">وضعیت طرح : </p>
            <p className="font-normal text-sm ">{planstate[state]}</p>
          </div>
          <div className="w-full flex  align-baseline justify-end  font-normal pt-5 ">
            <a className="flex cursor-pointer" onClick={() => navigate(redirectRout)}>
              <p className="text-dominant-500 border-b border-accent text-xs ">
                {' '}
                مشاهده جزییات طرح
              </p>
              <img src={arrow} className="w-fit h-fit scale-75 " />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
