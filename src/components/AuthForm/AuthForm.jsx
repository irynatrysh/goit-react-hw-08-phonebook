import { useState } from "react";
import { useDispatch } from "react-redux";
import { ErrorText, Input, Text, Container } from './AuthForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { logIn, register } from '../../redux/auth/operations';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const initialValues = {
    name: '',
    email: '',
    password: '',
};

let userSchema = yup.object({
    name: yup.string(), // Add validation for name field
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

export const AuthForm = () => {
    const dispatch = useDispatch();
    const [activeForm, setActiveForm] = useState('login'); // 'login' or 'signup'

    const handleOnSubmit = (values, actions) => {
        const item = {
            name: values.name, // Include name field for both login and signup forms
            email: values.email,
            password: values.password,
        };

// Dispatch the appropriate action based on the active form
    const action = activeForm === 'login' ? logIn : register;

    dispatch(action(item))
      .then(() => {
        toast.success(`${activeForm === 'login' ? 'Logged in' : 'Signed up'} successfully`);
      })
      .catch(error => {
        toast.error(error.message);
      });

    actions.resetForm();
  };


  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <Button
          style={{ margin: '0 10px' }}
          variant={activeForm === 'login' ? 'contained' : 'outlined'}
          onClick={() => setActiveForm('login')}
        >
          Log in
        </Button>
        <Button
          style={{ margin: '0 10px' }}
          variant={activeForm === 'signup' ? 'contained' : 'outlined'}
          onClick={() => setActiveForm('signup')}
        >
          Sign up
        </Button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={handleOnSubmit}
      >
        <Container>
          {activeForm === 'signup' && (
            <>
              <Text>Name</Text>
              <Input type="name" name="name" title="name" />
              <ErrorMessage name="name">
                {() => <ErrorText>Wrong name</ErrorText>}
              </ErrorMessage>
            </>
          )}
          <Text>Email</Text>
          <Input type="email" name="email" title="email" />
          <ErrorMessage name="email">
            {() => <ErrorText>Wrong email</ErrorText>}
          </ErrorMessage>
          <Text>Password</Text>
          <Input type="password" name="password" title="password" />
          <ErrorMessage name="password">
            {() => <ErrorText>Wrong password</ErrorText>}
          </ErrorMessage>
          <Button
            style={{ margin: '0 auto' }}
            type="submit"
            variant="contained"
            endIcon={<ChevronRightIcon />}
          >
            {activeForm === 'login' ? 'Log in' : 'Sign up'}
          </Button>
        </Container>
      </Formik>
    </>
  );
};
