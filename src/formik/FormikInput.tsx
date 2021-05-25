import React from 'react';
import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

interface FormikInputProps {
  name: string;
}

export default function FormikInput(props: FormikInputProps & TextFieldProps) {
  const [field, meta] = useField({ name: props.name });
  const hasError = meta.touched && !!meta.error;

  return (
    <TextField
      error={hasError}
      helperText={hasError ? meta.error || '' : ''}
      InputProps={props.InputProps}
      id={field.name}
      {...field}
      {...props}
    />
  );
}