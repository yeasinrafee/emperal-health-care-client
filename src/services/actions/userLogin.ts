import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { FieldValues } from 'react-hook-form';

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  const userInfo = await res.json();
  return userInfo;
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: 'http://localhost:5000/api/v1/auth/refresh-token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
