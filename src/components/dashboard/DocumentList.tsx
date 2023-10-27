import { ActionIcon, Box, Button, Table } from '@mantine/core';
import { useGetDocuments } from './hooks/useGetDocuments';
import { DocumentType } from '../../types/document.type';
import { IconLink, IconTrash } from '@tabler/icons-react';
import useDeleteDoc from './hooks/useDeleteDoc';
import { axiosPrivate } from '../../services/axios';

const DocumentList = () => {
  const { data, isLoading } = useGetDocuments();
  const { mutate } = useDeleteDoc();

  async function downloadDocument(uuid: string) {
    try {
      const response = await axiosPrivate.get(
        `/document/download_document/${uuid}`,
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf'; // you can use a dynamic name if you prefer
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const rows = data.map((item: DocumentType) => (
    <Table.Tr key={item.uuid}>
      <Table.Td>{item.firstName}</Table.Td>
      <Table.Td>{item.lastName}</Table.Td>
      <Table.Td>{item.email}</Table.Td>
      <Table.Td>
        <Button
          leftSection={<IconLink size={'1.2rem'} />}
          variant='subtle'
          color='green'
          onClick={() => downloadDocument(item?.uuid ?? '')}
        >
          Download Document
        </Button>
      </Table.Td>
      <Table.Td>
        <ActionIcon color='red' onClick={() => mutate(item?.uuid ?? '')}>
          <IconTrash size={'1.2rem'} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>First Name</Table.Th>
      <Table.Th>Last Name</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Signed Document Link</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );
  return (
    <Box>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};

export default DocumentList;
