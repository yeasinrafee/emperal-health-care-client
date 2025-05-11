'use client';

import assets from '@/assets';
import HCForm from '@/components/Forms/HCForm';
import HCInput from '@/components/Forms/HCInput';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const validationSchema = z.object({
  email: z.string().email('Please enter a valid email!!'),
  password: z.string().min(6, 'Must be at least 6 characters!'),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (values: FieldValues) => {
    const toastId = toast.loading('User logging....!!');
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message, { id: toastId });
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push('/dashboard');
      } else {
        setError(res.message);
        toast.error(error, { id: toastId });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt='logo' width={50} height={50} />
            </Box>
            <Box>
              <Typography variant='h6' fontWeight={600}>
                Login Emperal Health Care
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: 'red',
                  padding: '1px',
                  borderRadius: '2px',
                  color: 'white',
                  marginTop: '5px',
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <HCForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{ email: '', password: '' }}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={6}>
                  <HCInput
                    name='email'
                    label='Email'
                    type='email'
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={6}>
                  <HCInput
                    name='password'
                    label='Password'
                    type='password'
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Link href={'/forgot-password'}>
                <Typography
                  mb={1}
                  component='p'
                  fontWeight={300}
                  textAlign='end'
                  sx={{
                    textDecoration: 'underline',
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>

              <Button
                fullWidth={true}
                sx={{
                  margin: '10px 0px',
                }}
                type='submit'
              >
                Login
              </Button>
              <Typography component='p' fontWeight={300}>
                Don&apos;t have an account?{' '}
                <Link href='/register'>Create an account</Link>
              </Typography>
            </HCForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
