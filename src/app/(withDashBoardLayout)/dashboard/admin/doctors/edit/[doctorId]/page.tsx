'use client';

import HCForm from '@/components/Forms/HCForm';
import HCInput from '@/components/Forms/HCInput';
import HCSelectField from '@/components/Forms/HCSelectField';
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from '@/redux/api/doctor.Api';
import { Gender } from '@/types';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();
  const id = params?.doctorId;
  const { data, isLoading } = useGetDoctorQuery(id);
  const [updateDoctor] = useUpdateDoctorMutation();
  const onSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.appointmentFee = Number(values.appointmentFee);
    values.id = id;
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success('Doctor updated Successfully!');
        router.push('/dashboard/admin/doctors');
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  const defaultValues = {
    email: data?.email || '',
    name: data?.name || '',
    contactNumber: data?.contactNumber || '',
    address: data?.address || '',
    registrationNumber: data?.registrationNumber || '',
    gender: data?.gender || '',
    experience: data?.experience || 0,
    appointmentFee: data?.appointmentFee || 0,
    qualification: data?.qualification || '',
    currentWorkingPlace: data?.currentWorkingPlace || '',
    designation: data?.designation || '',
  };
  return (
    <Box>
      <Typography component='h5' variant='h5'>
        Doctor update
      </Typography>
      {isLoading ? (
        'Loading...!!!'
      ) : (
        <HCForm onSubmit={onSubmit} defaultValues={data && defaultValues}>
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid size={4}>
              <HCInput
                name='name'
                label='Name'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCInput
                name='email'
                label='Email'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={4}>
              <HCInput
                name='contactNumber'
                label='Contact Number'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCInput
                name='address'
                label='Address'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCInput
                name='registrationNumber'
                label='Registration Number'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={4}>
              <HCInput
                name='experience'
                type='number'
                label='Experience'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCSelectField
                items={Gender}
                name='gender'
                label='Gender'
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCInput
                name='appointmentFee'
                type='number'
                label='Appointment Fee'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={4}>
              <HCInput
                name='qualification'
                label='Qualification'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCInput
                name='currentWorkingPlace'
                label='Current Working Place'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={4}>
              <HCInput
                name='designation'
                label='Designation'
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Button type='submit'>Update</Button>
        </HCForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;
