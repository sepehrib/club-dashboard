import { BaseUrl } from 'component/baseURL/BaseUrl';

export const GetAllRealUsersApi = () => BaseUrl + 'AccountsManagement/GetAllRealUsers';

export const GetAllLegalUsersApi = () => BaseUrl + 'AccountsManagement/GetAllLegalUsers';

export const GetUserByNationalIdApi = (nationalId) =>
  BaseUrl + `AccountsManagement/GetUserByNationalId/${nationalId}`;

export const GetUserWalletBalanceApi = () => BaseUrl + 'WalletManagement/Balance';

export const GetImpersonateTokenApi = () => BaseUrl + 'AccountsManagement/Impersonate';

export const GetUserStatisticsApi = (nationalId) =>
  BaseUrl + `AccountsManagement/GetUserStatistics/${nationalId}`;

export const GetRolesApi = () => BaseUrl + 'AccountsManagement/GetRoles';

export const GetUserRoleApi = (userId) => BaseUrl + `AccountsManagement/GetUserRoles/${userId}`;

export const RemoveFromRoleApi = (nationalId, rolename) =>
  BaseUrl + `AccountsManagement/RemoveFromRole?nationalId=${nationalId}&roleName=${rolename}`;
export const AddToRolesApi = (nationalId, rolename) =>
  BaseUrl + `AccountsManagement/AddToRole?nationalId=${nationalId}&roleName=${rolename}`;
