// src/components/Dashboard.js
import React from 'react';
import { 
  Container, Typography, Box, Paper, Button, 
  Card, CardContent, Grid, Divider 
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Map as MapIcon, 
  AddCircle as AddCircleIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Welcome, {currentUser?.first_name || currentUser?.username}!
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<PersonIcon />}
            onClick={() => navigate('/profile')}
          >
            Profile
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Trip Plans Section */}
        <Box mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Your Trip Plans</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddCircleIcon />}
              onClick={() => navigate('/create-trip')}
            >
              Create New Trip
            </Button>
          </Box>

          {/* Mock Trip Plans - Will be replaced with actual data */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Weekend in Paris
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    May 25-27, 2025
                  </Typography>
                  <Typography variant="body2">
                    5 places to visit
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<MapIcon />}
                    >
                      View Plan
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tokyo Adventure
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    June 10-20, 2025
                  </Typography>
                  <Typography variant="body2">
                    12 places to visit
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button 
                      variant="outlined" 
                      size="small" 
                      startIcon={<MapIcon />}
                    >
                      View Plan
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Box textAlign="center">
                    <AddCircleIcon color="action" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="body1">
                      Create a new trip plan
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* User Actions Section */}
        <Box mt={4} textAlign="center">
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout}
            sx={{ mx: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;