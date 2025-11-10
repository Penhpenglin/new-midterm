import React from 'react'
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Profile Header Card with Admin Style */}
        <Card 
          sx={{ 
            mb: 3,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Avatar 
                    alt="Student Avatar" 
                    sx={{ 
                      width: 120, 
                      height: 120,
                      background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {String(currentUser.name).charAt(0)}
                  </Avatar>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    textAlign="center"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {currentUser.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography 
                    variant="h6" 
                    component="p" 
                    textAlign="center"
                    sx={{
                      color: '#718096',
                      fontWeight: 500
                    }}
                  >
                    Student Roll No: {currentUser.rollNum}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography 
                    variant="h6" 
                    component="p" 
                    textAlign="center"
                    sx={{
                      color: '#718096',
                      fontWeight: 500
                    }}
                  >
                    Class: {sclassName.sclassName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <Typography 
                    variant="h6" 
                    component="p" 
                    textAlign="center"
                    sx={{
                      color: '#718096',
                      fontWeight: 500
                    }}
                  >
                    School: {studentSchool.schoolName}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Personal Information Card with Admin Style - Using Your User Data */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Card Header with Admin Gradient */}
            <Box 
              sx={{ 
                p: 3, 
                background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                color: 'white',
                borderRadius: '12px 12px 0 0'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Personal Information
              </Typography>
            </Box>
            
            {/* Card Content - Using Your Actual User Data */}
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoItem 
                    label="Full Name"
                    value={currentUser.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem 
                    label="Email"
                    value={currentUser.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem 
                    label="Roll Number"
                    value={currentUser.rollNum}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem 
                    label="Class"
                    value={sclassName.sclassName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem 
                    label="School"
                    value={studentSchool.schoolName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoItem 
                    label="Student ID"
                    value={currentUser._id}
                  />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

// Info Item Component with Admin Style
const InfoItem = ({ label, value }) => (
  <Box 
    sx={{ 
      p: 2, 
      borderRadius: 2,
      background: 'rgba(23, 158, 75, 0.05)',
      border: '1px solid rgba(23, 158, 75, 0.1)',
    }}
  >
    <Typography 
      variant="body2" 
      sx={{ 
        color: '#718096', 
        fontWeight: 500, 
        fontSize: '0.8rem',
        mb: 1
      }}
    >
      {label}
    </Typography>
    <Typography 
      variant="body1" 
      sx={{ 
        color: '#2d3748', 
        fontWeight: 600,
        fontSize: '1rem'
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default StudentProfile