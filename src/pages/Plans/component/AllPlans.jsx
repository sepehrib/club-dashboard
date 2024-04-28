/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import PaginationComponet from 'component/pagination/paginationComponent';
import Card from 'component/card/Card';
import { GetAllPlansReq } from '../Api/PlanReq';
import DataContext from 'comon/context/MainContext';

const AllPlans = () => {
  const { setAllPlanDetails } = useContext(DataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [isloading, setIsloading] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    GetAllPlans();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const Skip = currentPage === 1 ? 0 : 5 * (currentPage - 1);

  const GetAllPlans = async () => {
    setIsloading(true);
    const res = await GetAllPlansReq({
      pagination: {
        take: 5,
        skip: Skip
      }
    });

    setIsloading(false);
    setResponse(res);
    setAllPlanDetails(res?.data);
  };
  console.log(response?.data);
  return (
    <div className="flex flex-col w-full  ">
      <div className="flex flex-wrap w-full ">
        {response &&
          response?.data?.map((item, index) => (
            <Card
              key={index}
              coverimages={item?.coverImagePaths}
              annualRate={item?.annualRate}
              title={item?.title}
              unitAmount={item?.unitAmount}
              unitAvailable={item?.unitAvailable}
              state={item?.state}
              redirectRout={`/plans/plan_details/${item?.id}`}
              editRout={`/plans/plan_details_edit/${item?.id}`}
            />
          ))}
      </div>
      {isloading && (
        <div className=" w-full flex-col flex items-center">
          <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-accent mt-2"></div>
        </div>
      )}
      {response?.data?.length === 0 && isloading === false && response !== false && (
        <div className=" w-full flex-col flex items-center pt-5 text-caption font-medium text-dominant">
          <p>طرحی برای شما یافت نشد </p>
        </div>
      )}
      <div className="flex justify-center p-8">
        {' '}
        <PaginationComponet
          itemCount={response?.pagination?.total}
          pagesize={5}
          onPagechange={(page) => handlePageChange(page)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AllPlans;
