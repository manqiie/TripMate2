// src/components/Home.js
import React from 'react';
import { 
  Container, Typography, Box, Button, Grid, 
  Card, CardContent, CardMedia, Paper
} from '@mui/material';
import { 
  Map as MapIcon, 
  Photo as PhotoIcon,
  Share as ShareIcon,
  Route as RouteIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Image paths would be replaced with actual images in a production app
const heroImage = '/path/to/hero-image.jpg'; 
const featureImage1 = '/path/to/feature1.jpg';
const featureImage2 = '/path/to/feature2.jpg';
const featureImage3 = '/path/to/feature3.jpg';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{
          position: 'relative',
          height: '500px',
          color: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroImage || 'https://source.unsplash.com/random/1600x900/?travel'})`,
          display: 'flex',
          alignItems: 'center',
          mb: 6
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            component="h1" 
            variant="h2" 
            color="inherit" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Plan Your Perfect Trip with TripMate
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Create optimized travel routes, save memories, and share your adventures
          </Typography>
          <Box mt={4}>
            {currentUser ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/dashboard"
                sx={{ px: 4, py: 1.5 }}
              >
                My Dashboard
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/register"
                sx={{ px: 4, py: 1.5 }}
              >
                Get Started
              </Button>
            )}
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          color="text.primary"
          align="center"
          gutterBottom
        >
          Why Choose TripMate?
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
          The all-in-one solution for planning, organizing, and sharing your travel experiences.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={featureImage1 || 'https://source.unsplash.com/random/400x200/?map'}
                alt="Optimized Routes"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <RouteIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    Optimized Routes
                  </Typography>
                </Box>
                <Typography>
                  Plan your journey with our intelligent route optimizer. Enter your destinations and get the most efficient path to see everything on your list.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={featureImage2 || 'https://source.unsplash.com/random/400x200/?photo'}
                alt="Memory Timeline"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <PhotoIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    Memory Timeline
                  </Typography>
                </Box>
                <Typography>
                  Upload photos and videos to create a beautiful timeline of your trips. Relive your favorite moments and keep them organized by location.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={featureImage3 || 'https://source.unsplash.com/random/400x200/?share'}
                alt="Easy Sharing"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <ShareIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    Easy Sharing
                  </Typography>
                </Box>
                <Typography>
                  Share your travel plans and memories with friends and family. Let them experience your adventures or help them plan their own trips.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography component="h2" variant="h4" gutterBottom>
            Ready to start your next adventure?
          </Typography>
          <Typography variant="h6" paragraph>
            Join TripMate today and transform the way you travel.
          </Typography>
          {!currentUser && (
            <Box mt={3}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/register"
                sx={{ mx: 1, mb: { xs: 2, sm: 0 } }}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                component={Link}
                to="/login"
                sx={{ mx: 1 }}
              >
                Login
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;