import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import howItWorks from '@/assets/how-it-works-img.png';
import appointment from '@/assets/icons/appointment-icon.png';
import charity from '@/assets/icons/charity-icon.png';
import doctor from '@/assets/icons/doctor-icon.png';
import search from '@/assets/icons/search-icon.png';

export default function HowItWorks() {
  return (
    <Container>
      <Box
        my={20}
        sx={{
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'start',
          }}
        >
          <Typography
            color='primary'
            variant='h6'
            component='h1'
            fontWeight={600}
          >
            How It Works
          </Typography>
          <Typography variant='h4' fontWeight={600} my={2}>
            4 Easy Steps to Get Your Solution
          </Typography>
          <Typography
            component={'p'}
            fontWeight={300}
            fontSize={18}
            width={'50%'}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque in
            suscipit iste voluptatem voluptates libero.
          </Typography>
        </Box>

        <Stack
          mt={5}
          direction={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <Box width={'40%'}>
            <Image src={howItWorks} alt='doc-image' width={400} />
          </Box>

          <Box width={'50%'}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={6}>
                <Box
                  p={2}
                  sx={{
                    border: '1px solid rgba(0, 170, 0, 1)',
                    borderRadius: '10px',
                  }}
                >
                  <Image src={search} alt='search-doctor' width={30} />

                  <Box textAlign={'start'}>
                    <Typography
                      variant='h6'
                      component={'h1'}
                      fontWeight={600}
                      py={'5px'}
                    >
                      Search Doctor
                    </Typography>
                    <Typography component={'p'}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Blanditiis, quisquam.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={6}>
                <Box
                  p={2}
                  sx={{
                    border: '1px solid rgba(0, 170, 0, 1)',
                    borderRadius: '10px',
                  }}
                >
                  <Image src={doctor} alt='search-doctor' width={30} />

                  <Box textAlign={'start'}>
                    <Typography
                      variant='h6'
                      component={'h1'}
                      fontWeight={600}
                      py={'5px'}
                    >
                      Check Doctor Profile
                    </Typography>
                    <Typography component={'p'}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Blanditiis, quisquam.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={6}>
                <Box
                  p={2}
                  sx={{
                    border: '1px solid rgba(0, 170, 0, 1)',
                    borderRadius: '10px',
                  }}
                >
                  <Image src={appointment} alt='search-doctor' width={30} />

                  <Box textAlign={'start'}>
                    <Typography
                      variant='h6'
                      component={'h1'}
                      fontWeight={600}
                      py={'5px'}
                    >
                      Schedule Appointment
                    </Typography>
                    <Typography component={'p'}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Blanditiis, quisquam.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={6}>
                <Box
                  p={2}
                  sx={{
                    border: '1px solid rgba(0, 170, 0, 1)',
                    borderRadius: '10px',
                  }}
                >
                  <Image src={charity} alt='search-doctor' width={30} />

                  <Box textAlign={'start'}>
                    <Typography
                      variant='h6'
                      component={'h1'}
                      fontWeight={600}
                      py={'5px'}
                    >
                      Get Your Solution
                    </Typography>
                    <Typography component={'p'}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Blanditiis, quisquam.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack
          my={10}
          py={9}
          height={4}
          width={'100%'}
          sx={{
            background: `linear-gradient(to right, rgba(0, 100, 0, 0.9), rgba(144, 238, 144, 0.6))`,
          }}
          direction={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          borderRadius={'12px'}
        >
          <Box>
            <Typography color={'white'} variant='h3' component={'h1'}>
              180+
            </Typography>
            <Typography color={'white'} component={'p'}>
              Expert Doctors
            </Typography>
          </Box>

          <Box>
            <Typography color={'white'} variant='h3' component={'h1'}>
              26+
            </Typography>
            <Typography color={'white'} component={'p'}>
              Expert Service
            </Typography>
          </Box>

          <Box>
            <Typography color={'white'} variant='h3' component={'h1'}>
              10K+
            </Typography>
            <Typography color={'white'} component={'p'}>
              Happy Patients
            </Typography>
          </Box>

          <Box>
            <Typography color={'white'} variant='h3' component={'h1'}>
              150+
            </Typography>
            <Typography color={'white'} component={'p'}>
              Best Award Winners
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
