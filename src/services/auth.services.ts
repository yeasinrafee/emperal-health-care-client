import { authKey } from '@/constants/authkey';
import { decodeToken } from '@/utils/jwt';

import {
  getFormLocalStorage,
  removeFormLocalStorage,
  setToLocalStorage,
} from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFormLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodeToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFormLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFormLocalStorage(authKey);
};

