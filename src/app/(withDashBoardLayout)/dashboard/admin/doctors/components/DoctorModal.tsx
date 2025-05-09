import HCForm from '@/components/Forms/HCForm';
import HCInput from '@/components/Forms/HCInput';
import HCSelectField from '@/components/Forms/HCSelectField';
import HCFullScreenModal from '@/components/Shared/HCModal/HCFullScreenModal';
import { useCreateDoctorMutation } from '@/redux/api/doctor.Api';
import { Gender } from '@/types';
import { modifyPayload } from '@/utils/modifyPayload';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor] = useCreateDoctorMutation();

  const onSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
    const data = modifyPayload(values);
    try {
      const res = await createDoctor(data).unwrap();
      if (res?.id) {
        toast.success('Doctor Created Successfully!!');
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const defaultValues = {
    doctor: {
      email: '',
      name: '',
      contactNumber: '',
      address: '',
      registrationNumber: '',
      gender: '',
      experience: 0,
      appointmentFee: 0,
      qualification: '',
      currentWorkingPlace: '',
      designation: '',
      profilePhoto: '',
    },
    password: '',
  };

  return (
    <HCFullScreenModal open={open} setOpen={setOpen} title='Create New Doctor'>
      <HCForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid size={4}>
            <HCInput
              name='doctor.name'
              label='Name'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='doctor.email'
              label='Email'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='password'
              type='password'
              label='Password'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={4}>
            <HCInput
              name='doctor.contactNumber'
              label='Contact Number'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='doctor.address'
              label='Address'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='doctor.registrationNumber'
              label='Registration Number'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={4}>
            <HCInput
              name='doctor.experience'
              type='number'
              label='Experience'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCSelectField
              items={Gender}
              name='doctor.gender'
              label='Gender'
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='doctor.appointmentFee'
              type='number'
              label='Appointment Fee'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={4}>
            <HCInput
              name='doctor.qualification'
              label='Qualification'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='doctor.currentWorkingPlace'
              label='Current Working Place'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='doctor.designation'
              label='Designation'
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Button type='submit'>Create</Button>
      </HCForm>
    </HCFullScreenModal>
  );
};

export default DoctorModal;
