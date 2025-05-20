// src/components/Profile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, Button, Typography, Container, Box, 
  Paper, Alert, CircularProgress, Grid, Avatar,
  Divider, Tabs, Tab
} from '@mui/material';
import { 
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const profileValidationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const passwordValidationSchema = Yup.object({
  old_password: Yup.string().required('Current password is required'),
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSuccess('');
    setError('');
  };

  const handleProfileUpdate = async (values) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const success = await updateProfile(values);
      if (success) {
        setSuccess('Profile updated successfully!');
      }
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await authService.changePassword(values);
      setSuccess('Password changed successfully!');
    } catch (error) {
      if (error.response && error.response.data) {
        // Format Django REST Framework validation errors
        const errorData = error.response.data;
        const formattedErrors = Object.keys(errorData)
          .map(key => `${key}: ${errorData[key].join(' ')}`)
          .join(', ');
        setError(formattedErrors);
      } else {
        setError('Failed to change password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography component="h1" variant="h5">
            Your Profile
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Profile Information" />
          <Tab label="Change Password" />
        </Tabs>
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {activeTab === 0 && (
          <Box>
            <Grid container spacing={3} alignItems="flex-start">
              <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                <Avatar 
                  src={currentUser.profile?.profile_picture || ""} 
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Profile Picture
                </Typography>
                {/* Photo upload will be implemented in a future phase */}
              </Grid>
              
              <Grid item xs={12} md={9}>
                <Formik
                  initialValues={{
                    username: currentUser.username || '',
                    first_name: currentUser.first_name || '',
                    last_name: currentUser.last_name || '',
                    email: currentUser.email || '',
                    bio: currentUser.profile?.bio || '',
                    phone_number: currentUser.profile?.phone_number || '',
                  }}
                  validationSchema={profileValidationSchema}
                  onSubmit={handleProfileUpdate}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            disabled
                          />
                        </Grid>
                        
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
                            id="email"
                            name="email"
                            label="Email Address"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            id="phone_number"
                            name="phone_number"
                            label="Phone Number"
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            id="bio"
                            name="bio"
                            label="Bio"
                            multiline
                            rows={4}
                          />
                        </Grid>
                      </Grid>
                      
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        disabled={loading}
                        sx={{ mt: 3 }}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {activeTab === 1 && (
          <Box>
            <Formik
              initialValues={{
                old_password: '',
                new_password: '',
                confirm_password: '',
              }}
              validationSchema={passwordValidationSchema}
              onSubmit={handlePasswordChange}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    id="old_password"
                    name="old_password"
                    label="Current Password"
                    type="password"
                    margin="normal"
                    error={touched.old_password && Boolean(errors.old_password)}
                    helperText={touched.old_password && errors.old_password}
                  />
                  
                  <Field
                    as={TextField}
                    fullWidth
                    id="new_password"
                    name="new_password"
                    label="New Password"
                    type="password"
                    margin="normal"
                    error={touched.new_password && Boolean(errors.new_password)}
                    helperText={touched.new_password && errors.new_password}
                  />
                  
                  <Field
                    as={TextField}
                    fullWidth
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm New Password"
                    type="password"
                    margin="normal"
                    error={touched.confirm_password && Boolean(errors.confirm_password)}
                    helperText={touched.confirm_password && errors.confirm_password}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ mt: 3 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Change Password'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;