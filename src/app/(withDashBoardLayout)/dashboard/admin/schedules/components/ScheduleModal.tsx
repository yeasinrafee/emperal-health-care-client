import HCDatePicker from '@/components/Forms/HCDatePicker';
import HCForm from '@/components/Forms/HCForm';
import HCTimePicker from '@/components/Forms/HCTimePicker';
import HCModal from '@/components/Shared/HCModal/HCModal';
import { useCreateScheduleMutation } from '@/redux/api/schedule.Api';
import { dateFormatter } from '@/utils/dateFormatter';
import { timeFormatter } from '@/utils/timeFormatter';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);

    try {
      const res = await createSchedule(values);
      if (res?.data?.length) {
        toast.success('Schedules Created successfully!!');
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <HCModal open={open} setOpen={setOpen} title='Create Schedule'>
      <HCForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width: '400px' }}>
          <Grid size={12}>
            <HCDatePicker name='startDate' label='Start Date' />
          </Grid>
          <Grid size={12}>
            <HCDatePicker name='endDate' label='End Date' />
          </Grid>
          <Grid size={6}>
            <HCTimePicker name='startTime' label='Start Time' />
          </Grid>
          <Grid size={6}>
            <HCTimePicker name='endTime' label='End Time' />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type='submit'>
          Create
        </Button>
      </HCForm>
    </HCModal>
  );
};

export default ScheduleModal;
