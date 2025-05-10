import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteCookies } from './deleteCookies';
import { authKey } from '@/constants/authkey';

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  deleteCookies([authKey, 'refreshToken']);
  router.push('/');
  router.refresh();
};
