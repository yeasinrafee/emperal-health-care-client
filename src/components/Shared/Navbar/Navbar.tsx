import { Box, Container, Stack, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <Container>
      <Stack py={2} direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h5' component='h1' fontWeight={600}>
          <Box component={'span'} color={'primary.main'}>
            Emperal
          </Box>{' '}
          Health Care
        </Typography>
      </Stack>
    </Container>
  );
}
