import { Form, Label, Input } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/contacts/filterSlice';
import { getFilter } from '../../redux/contacts/selectors';
import { Container } from '../../components/Filter/Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <h2>Find contacts by name</h2>
      <Input
        type="text"
        name="filter"
        value={useSelector(getFilter)}
        onChange={e => {
        dispatch(changeFilter(e.target.value));
        }}
       />
    </Container>
  );
};
