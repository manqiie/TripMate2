// Modified Register.js with improved error handling
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, Button, Typography, Container, Box, 
  Paper, Alert, CircularProgress, Grid, Collapse 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSubmit = async (values) => {
    setLoading(true);
    setFormError('');
    setDebugInfo(null);
    
    try {
      console.log('Registration values:', values);
      const success = await register(values);
      
      if (success) {
        navigate('/dashboard');
      } else {
        // If register() returned false but didn't throw
        setFormError('Registration failed. Please check the form and try again.');
        setDebugInfo({
          error,
          context: 'Register function returned false'
        });
      }
    } catch (error) {
      console.error('Registration error caught:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      let debugData = { error };
      
      // Parse error response if available
      if (error.response && error.response.data) {
        debugData.responseData = error.response.data;
        
        // Format Django REST Framework validation errors
        if (typeof error.response.data === 'object') {
          const errorData = error.response.data;
          const formattedErrors = Object.keys(errorData)
            .map(key => `${key}: ${errorData[key].join(' ')}`)
            .join(', ');
          
          errorMessage = formattedErrors || errorMessage;
        }
      }
      
      setFormError(errorMessage);
      setDebugInfo(debugData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Join TripMate Today
        </Typography>
        
        {formError && (
          <Alert 
            severity="error" 
            sx={{ mt: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small"
                onClick={() => setShowDebug(!showDebug)}
              >
                {showDebug ? 'Hide Details' : 'Show Details'}
              </Button>
            }
          >
            {formError}
            
            <Collapse in={showDebug}>
              <Box sx={{ mt: 2, p: 1, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem' }}>
                  {debugInfo && JSON.stringify(debugInfo, null, 2)}
                </pre>
              </Box>
            </Collapse>
          </Alert>
        )}
        
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      error={touched.first_name && Boolean(errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      error={touched.last_name && Boolean(errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="password2"
                      name="password2"
                      label="Confirm Password"
                      type="password"
                      error={touched.password2 && Boolean(errors.password2)}
                      helperText={touched.password2 && errors.password2}
                    />
                  </Grid>
                </Grid>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
                
                <Box mt={2} textAlign="center">
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Typography color="primary" variant="body2">
                      Already have an account? Sign in
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;