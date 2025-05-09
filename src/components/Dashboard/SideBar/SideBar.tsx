import { Box, List, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import assets from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { TUserRole } from '@/types';
import SidebarItem from './SidebarItem';
import { getUserInfo } from '@/services/auth.services';
import { drawerItems } from '@/utils/drawerItems';

const SideBar = () => {
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);
  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction='row'
        justifyContent='center'
        alignItems='center'
        component={Link}
        href='/'
      >
        <Image src={assets.svgs.logo} width={40} height={40} alt='logo' />
        <Typography variant='h6' component='h1' sx={{ cursor: 'pointer' }}>
          Emperal Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems(userRole as TUserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
