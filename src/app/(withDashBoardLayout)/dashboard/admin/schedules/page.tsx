'use client';
import { Box, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'sonner';
import { dateFormatter } from '@/utils/dateFormatter';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from '@/redux/api/schedule.Api';
import { TSchedule } from '@/types/schedule';
import ScheduleModal from './components/ScheduleModal';

const Schedules = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteSchedule] = useDeleteScheduleMutation();
  const { data, isLoading } = useGetAllSchedulesQuery({});

  const schedules = data?.schedules;
  const meta = data?.meta;

  useEffect(() => {
    const updateData = schedules?.map((schedule: TSchedule, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: dateFormatter(schedule.startDateTime),
        endDate: dateFormatter(schedule.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format('hh:mm a'),
        endTime: dayjs(schedule?.endDateTime).format('hh:mm a'),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success('Specialties deleted successfully!!');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'sl', headerName: 'SL' },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
    { field: 'startTime', headerName: 'Start Time', flex: 1 },
    { field: 'endTime', headerName: 'End Time', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label='delete'
            >
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
            <IconButton aria-label='edit'>
              <EditIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={allSchedule ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading....</h1>
      )}
    </Box>
  );
};

export default Schedules;
