'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import KeyIcon from '@mui/icons-material/Key';
import { useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteCookies } from '@/services/actions/deleteCookies';
import { authKey } from '@/constants/authkey';
import HCForm from '@/components/Forms/HCForm';
import HCInput from '@/components/Forms/HCInput';

const validationSchema = z.object({
  newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('userId');
  const token = searchParams.get('token');
  console.log({ id, token });
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(authKey, token);
  }, [token]);

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    const updatedData = { ...values, id };

    try {
      const res = await resetPassword(updatedData);

      if ('data' in res && res.data.status === 200) {
        toast.success('Password Reset Successful');
        localStorage.removeItem(authKey);
        deleteCookies([authKey, 'refreshToken']);
        router.push('/login');
      } else {
        throw new Error('Something Went Wrong, Try Again');
      }
    } catch (error) {
      toast.success('Something Went Wrong, Try Again');
    }
  };
  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: '100%',
        boxShadow: 1,
        borderRadius: 1,
        mx: 'auto',
        mt: { xs: 2, md: 10 },
      }}
    >
      <Stack alignItems='center' justifyContent='center'>
        <Box
          sx={{
            '& svg': {
              width: 100,
              height: 100,
            },
          }}
        >
          <KeyIcon sx={{ color: 'primary.main' }} />
        </Box>
        <Typography variant='h5' fontWeight={600} sx={{ mb: 2 }}>
          Reset password
        </Typography>
      </Stack>
      <HCForm
        onSubmit={onSubmit}
        defaultValues={{ newPassword: '' }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid>
          <Grid size={6}>
            <HCInput
              name='newPassword'
              type='password'
              label='New Password'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type='submit' sx={{ width: '100%', my: 2 }}>
          Reset Password
        </Button>
      </HCForm>
    </Box>
  );
};

export default ResetPassword;
