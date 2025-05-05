import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';

export default function HeroSection() {
  return (
    <Container
      sx={{
        display: 'flex',
        direction: 'row',
        my: 16,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '700px',
            top: '-90px',
            left: '-120px',
          }}
        >
          <Image src={assets.svgs.grid} alt='grid' />
        </Box>
        <Typography variant='h3' component={'h1'} fontWeight={600}>
          Best
          <Typography
            variant='h3'
            component={'span'}
            color='primary.main'
            fontWeight={600}
          >
            {' '}
            Human and AI
          </Typography>
        </Typography>
        <Typography variant='h3' component={'h1'} fontWeight={600}>
          Based Health Care
        </Typography>

        <Typography
          variant='h6'
          component={'p'}
          fontWeight={400}
          sx={{
            width: '50%',
            my: 4,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aut a
          dicta vero obcaecati cupiditate totam eveniet temporibus tempore,
          excepturi nesciunt omnis.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button>Appointment</Button>
          <Button variant='outlined'>Contact Us</Button>
        </Box>
      </Box>
      <Box>Right</Box>
    </Container>
  );
}
