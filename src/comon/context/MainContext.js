import { createContext, useState } from 'react';

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
  const [timer, setTimer] = useState(2 * 60 * 1000);
  const [userInfo, setUserInfo] = useState();
  const [allPlanDetails, setAllPlanDetails] = useState();
  return (
    <DataContext.Provider
      value={{ timer, setTimer, userInfo, setUserInfo, allPlanDetails, setAllPlanDetails }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
