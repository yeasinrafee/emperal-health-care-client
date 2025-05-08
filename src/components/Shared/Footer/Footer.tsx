import { Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import facebookIcon from '@/assets/landing_page/facebook.png';
import instagramIcon from '@/assets/landing_page/instagram.png';
import twitterIcon from '@/assets/landing_page/twitter.png';
import linkedinIcon from '@/assets/landing_page/linkedin.png';

export default function Footer() {
  return (
    <Box bgcolor='rgb(17, 26, 34)' py={5}>
      <Container>
        <Stack direction={'row'} justifyContent={'center'} gap={4}>
          <Typography
            color='#fff'
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
            color='#fff'
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
            color='#fff'
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
            color='#fff'
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
            color='#fff'
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
        </Stack>

        <Stack direction={'row'} justifyContent={'center'} gap={2} py={3}>
          <Image src={facebookIcon} width={40} height={30} alt='facebook' />
          <Image src={instagramIcon} width={40} height={30} alt='facebook' />
          <Image src={twitterIcon} width={40} height={30} alt='facebook' />
          <Image src={linkedinIcon} width={40} height={30} alt='facebook' />
        </Stack>

        <Box
          sx={{
            border: '1px dashed lightgray',
          }}
        ></Box>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={2}
          py={3}
        >
          <Typography component='p' color='white'>
            &copy; 2025 Emperal Health Care. All Rights Reserved.
          </Typography>

          <Typography
            variant='h5'
            component={Link}
            href='/'
            fontWeight={600}
            color='white'
          >
            <Box component={'span'} color={'primary.main'}>
              Emperal
            </Box>{' '}
            Health Care
          </Typography>

          <Typography
            component='p'
            color='white'
            sx={{
              cursor: 'pointer',
              transition: 'color 0.3s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Privacy Policy | Terms and Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
