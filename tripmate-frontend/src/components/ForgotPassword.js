// src/components/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, Button, Typography, Container, Box, 
  Paper, Alert, CircularProgress 
} from '@mui/material';
import { authService } from '../services/api';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    
    try {
      await authService.resetPasswordRequest(values.email);
      setSuccess(true);
    } catch (error) {
      setError('Failed to process your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Reset Your Password
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        
        {success ? (
          <Box mt={3}>
            <Alert severity="success">
              We've sent you an email with instructions to reset your password.
            </Alert>
            <Box mt={2} textAlign="center">
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography color="primary" variant="body2">
                  Return to login
                </Typography>
              </Link>
            </Box>
          </Box>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Box mt={2}>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Enter your email address and we'll send you a link to reset your password.
                  </Typography>
                  
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                  </Button>
                  
                  <Box mt={2} textAlign="center">
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Typography color="primary" variant="body2">
                        Remember your password? Sign in
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;