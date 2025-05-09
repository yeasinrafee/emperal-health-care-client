'use client';
import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import DoctorModal from './components/DoctorModal';
import { useState } from 'react';
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from '@/redux/api/doctor.Api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDebounced } from '@/redux/hooks';
import { toast } from 'sonner';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';

const DoctorsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteDoctor] = useDeleteDoctorMutation();

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query['searchTerm'] = searchTerm;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });

  const doctors = data?.doctors;
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success('Doctor deleted successfully!!');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'qualification', headerName: 'Qualification', flex: 1 },
    { field: 'registrationNumber', headerName: 'Registration Number', flex: 1 },
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
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label='edit'>
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button onClick={() => setIsOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={isOpen} setOpen={setIsOpen} />
        <TextField
          size='small'
          placeholder='search doctors'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={doctors} columns={columns} />
        </Box>
      ) : (
        <h1>Loading....</h1>
      )}
    </Box>
  );
};

export default DoctorsPage;
