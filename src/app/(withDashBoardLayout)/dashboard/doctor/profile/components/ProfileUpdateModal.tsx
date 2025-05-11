/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { Gender } from '@/types';
import MultipleSelectChip from './MultipleSelectChip';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import HCFullScreenModal from '@/components/Shared/HCModal/HCFullScreenModal';
import HCForm from '@/components/Forms/HCForm';
import HCInput from '@/components/Forms/HCInput';
import HCSelectField from '@/components/Forms/HCSelectField';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialties.Api';
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from '@/redux/api/doctor.Api';

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  appointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: doctorData, refetch, isSuccess } = useGetDoctorQuery(id);
  const { data: allSpecialties } = useGetAllSpecialtiesQuery(undefined);
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

  console.log(doctorData);

  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

  useEffect(() => {
    if (!isSuccess) return;

    setSelectedSpecialtiesIds(
      doctorData?.doctorSpecialties.map((sp: any) => {
        return sp.specialtiesId;
      })
    );
  }, [isSuccess]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    console.log({ id });
    // return;

    const excludedFields: Array<keyof typeof values> = [
      'email',
      'id',
      'role',
      'needPasswordChange',
      'status',
      'createdAt',
      'updatedAt',
      'isDeleted',
      'averageRating',
      'review',
      'profilePhoto',
      'registrationNumber',
      'schedules',
      'doctorSpecialties',
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    updatedValues.specialties = specialties;

    try {
      updateDoctor({ body: updatedValues, id });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HCFullScreenModal open={open} setOpen={setOpen} title='Update Profile'>
      <HCForm
        onSubmit={submitHandler}
        defaultValues={doctorData}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid size={4}>
            <HCInput name='name' label='Name' sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='email'
              type='email'
              label='Email'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='contactNumber'
              label='Contract Number'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCInput name='address' label='Address' sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='registrationNumber'
              label='Registration Number'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='experience'
              type='number'
              label='Experience'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCSelectField
              items={Gender}
              name='gender'
              label='Gender'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='appointmentFee'
              type='number'
              label='AppointmentFee'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='qualification'
              label='Qualification'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>

          <Grid size={4}>
            <HCInput
              name='currentWorkingPlace'
              label='Current Working Place'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <HCInput
              name='designation'
              label='Designation'
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
          <Grid size={4}>
            <MultipleSelectChip
              allSpecialties={allSpecialties}
              selectedIds={selectedSpecialtiesIds}
              setSelectedIds={setSelectedSpecialtiesIds}
            />
          </Grid>
        </Grid>

        <Button type='submit' disabled={updating}>
          Save
        </Button>
      </HCForm>
    </HCFullScreenModal>
  );
};

export default ProfileUpdateModal;
