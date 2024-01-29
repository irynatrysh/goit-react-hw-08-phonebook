import styled from 'styled-components';
import { Form, Field } from 'formik';

export const Container = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  
  padding: 20px;
  gap: 8px;
  width: 300px;
  margin: 0 auto;
  background: linear-gradient(to top right, #9533FF, #1976d2);
  border-radius: 10px;
`;

export const Text = styled.p`
  margin: 0;
  color: white;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: pink;
`;

export const Input = styled(Field)`
  width: 100%;
  height: 30px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid linear-gradient(to top right, #9533FF, #575BFF);;
  padding-left: 8px;
`;

export const Button = styled.button`
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  border-color: black;
  font-size: 20px;
  margin: 0 auto;
  color: #575bff;
`;