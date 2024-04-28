/* eslint-disable no-unused-vars */
import Sidebar from 'component/layout/sidebar/SideBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GetUserByNationalIdReq } from '../Api/UserReq';
import LegalUserData from './LegalUserData';
import RealUserData from './RealUserData';
import { GetUserStatisticsReq } from 'pages/Plans/Api/PlanReq';

const UsersDetails = () => {
  //user type => real : false , legal : true
  const [usertype, setUsertype] = useState(false);
  const { code, type } = useParams();
  const [details, setDetails] = useState();
  const [statistics, setStatistics] = useState();

  console.log(type);
  useEffect(() => {
    setUsertype(type);
    GetUserData();
    GetUserStatistics();
  }, []);

  const GetUserData = async () => {
    const res = await GetUserByNationalIdReq(code);
    setDetails(res);
  };

  const GetUserStatistics = async () => {
    const res = await GetUserStatisticsReq(code);
    setStatistics(res);
  };
  console.log(code);
  return (
    <div className="flex flex-row items-start h-auto">
      <div className="w-1/4 h-full bg-secondary fixed right-0 hidden lg:flex">
        <Sidebar />
      </div>
      <div className="w-full lg:w-full max-w-[1355px] lg:mr-[calc(25%_+_40px)] flex flex-col items-center align-middle p-10 ">
        {usertype == 'true' ? (
          <LegalUserData details={details} statistics={statistics} />
        ) : (
          <RealUserData details={details} statistics={statistics} />
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
