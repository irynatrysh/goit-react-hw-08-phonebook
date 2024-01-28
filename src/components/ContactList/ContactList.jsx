import {
  selectFilteredContacts,
  getIsLoading,
  getError,
} from '../../redux/contacts/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/contacts/operations';
import { useEffect } from 'react';
import { Container } from './ContactList.styled';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    color: '#1976d2',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, name, phone) {
  return { id, name, phone };
}

export function ContactList() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts())
      .then(unwrapResult)
      .catch(rejectedValueOrSerializedError => {
        toast.error(rejectedValueOrSerializedError);
      });
  }, [dispatch]);

  return (
    <Container>
      {isLoading && !error && <b>Request in progress...</b>}
      {error && <b>Error: {error}</b>}
      {filteredContacts?.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Phone</StyledTableCell>
                <StyledTableCell align="right">Delete contacts</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts?.length > 0 &&
                filteredContacts
                  .map(item => {
                    return createData(item.id, item.name, item.number);
                  })
                  .map(row => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {
                          <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={() => dispatch(deleteContact(row.id))}
                          >
                            DELETE
                          </Button>
                        }
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
