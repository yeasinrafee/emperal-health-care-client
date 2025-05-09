'use client';

import { Box, Button, IconButton, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import SpecialtyModal from './component/SpecialtyModal';
import {
  useDeleteSpecialtyMutation,
  useGetAllSpecialtiesQuery,
} from '@/redux/api/specialties.Api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'sonner';

const SpecialtiesPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtiesQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();
      if (res?.id) {
        toast.success('Specialties deleted successfully!!');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'icon',
      headerName: 'Icon',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image src={row.icon} width={30} height={30} alt='icon' />
          </Box>
        );
      },
    },
    { field: 'title', headerName: 'Title', width: 400, flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)} aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button onClick={() => setIsOpen(true)}>Create Specialty</Button>
        <SpecialtyModal open={isOpen} setOpen={setIsOpen} />
        <TextField size='small' placeholder='Search Specialist' />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={data} columns={columns} hideFooter={true} />
        </Box>
      ) : (
        <h1>Loading....</h1>
      )}
    </Box>
  );
};

export default SpecialtiesPage;
