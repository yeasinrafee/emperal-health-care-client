'use client';

import { Box, Button, Container, Grid } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from '@/redux/api/myProfile';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import DoctorInformation from './components/DoctorInformations';
import AutoFileUploader from '@/components/Forms/AutoFileUploader';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data', JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid size={4}>
            <Box
              sx={{
                height: 300,
                width: '100%',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <Image
                height={300}
                width={400}
                src={data?.profilePhoto}
                alt='User Photo'
              />
            </Box>
            <Box my={3}>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name='file'
                  label='Choose Your Profile Photo'
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant='text'
                />
              )}
            </Box>

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid size={8}>
            <DoctorInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
