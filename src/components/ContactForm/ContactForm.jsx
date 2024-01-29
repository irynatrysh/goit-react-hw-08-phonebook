import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Input, ErrorText } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { getContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';  // Виправлено помилку тут
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import AddBoxIcon from '@mui/icons-material/AddBox';  // Видалено дубльований імпорт Button
import Button from '@mui/material/Button';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name format')
    .max(30, 'Name must be at most 15 characters')
    .required('This field is required'),
  number: yup
    .string()
    .trim()
    .matches(
      /^[^a-zA-Z]*\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}[^a-zA-Z]*$/,
      'Invalid phone number format'
    )
    .max(15, 'Phone number must be at most 12 characters')
    .required('This field is required'),
});

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleOnSubmit = async (values, actions) => {  // Додано ключове слово async
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      ) === undefined
    ) {
      const item = { name: values.name, number: values.number };
      try {
        await dispatch(addContact(item));  // Замінено .then на async/await
        actions.resetForm();
      } catch (error) {
        toast.error(error.message || 'An error occurred');
      }
    } else {
      toast.error(`${values.name} is already in contacts.`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={schema}
    >
      {(formikProps) => (
        <Container>
          <Text>Name</Text>
          <Input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash, and spaces."
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.name}
          />
          <ErrorMessage name="name">
            {() => (
              <ErrorText>
                Wrong name: Name may contain only letters, apostrophe, dash, and
                spaces, and must be at most 15 characters.
              </ErrorText>
            )}
          </ErrorMessage>
          <Text>Number</Text>
          <Input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            value={formikProps.values.number}
          />
          <ErrorMessage name="number">
            {() => (
              <ErrorText>
                Phone number must be digits and can contain spaces, dashes,
                parentheses, and can start with +, and must be at most 12
                characters.
              </ErrorText>
            )}
          </ErrorMessage>
          <Button
            style={{ margin: '0 auto' }}
            type="submit"
            variant="contained"
            endIcon={<AddBoxIcon />}
          >
            Add contact
          </Button>
        </Container>
      )}
    </Formik>
  );
}