'use client';
import useUserInfo from '@/hooks/useUserInfo';
import { logoutUser } from '@/services/actions/logoutUser';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { email } = useUserInfo();

  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };

  const AuthButton = dynamic(
    () => import('@/components/UI/AuthButton/AuthButton'),
    { ssr: false }
  );
  return (
    <Container>
      <Stack
        py={2}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant='h5' component={Link} href='/' fontWeight={600}>
          <Box component={'span'} color={'primary.main'}>
            Emperal
          </Box>{' '}
          Health Care
        </Typography>

        <Stack direction={'row'} justifyContent={'space-between'} gap={4}>
          <Typography
            component={Link}
            href='/consultation'
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Consultation
          </Typography>
          <Typography
            component={Link}
            href='/health-plans'
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Health Plans
          </Typography>
          <Typography
            component={Link}
            href='/medicine'
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Medicine
          </Typography>
          <Typography
            component={Link}
            href='/diagnostics'
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Diagnostics
          </Typography>
          <Typography
            component={Link}
            href='/ngos'
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            NGOs
          </Typography>
          {email && (
            <Typography
              component={Link}
              href={`/dashboard/${''}`}
              sx={{
                transition: 'color 0.3s',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Dashboard
            </Typography>
          )}
        </Stack>
        {email ? (
          <Button color='error' onClick={handleLogOut}>
            Logout
          </Button>
        ) : (
          <Button component={Link} href='/login'>
            Login
          </Button>
        )}
      </Stack>
    </Container>
  );
}
