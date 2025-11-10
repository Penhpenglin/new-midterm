import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { School, Login, Person } from '@mui/icons-material';
import Setec from "../assets/setec logo.png";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
  return (
    <StyledContainer>
      {/* Animated Background Elements */}
      <FloatingShapes>
        <Shape1 />
        <Shape2 />
        <Shape3 />
      </FloatingShapes>

      <Grid container spacing={0} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <ImageContainer>
            <AnimatedImage src={Setec} alt="SETEC Institute" />
            <ImageGlow />
          </ImageContainer>
        </Grid>

        {/* Text + Buttons Section */}
        <Grid item xs={12} md={6}>
          <ContentPaper>
            <LogoSection>
              <School className="logo-icon" />
              <StyledTitle>
                Welcome To
                <br />
                <HighlightText>SETEC INSTITUTE</HighlightText>
                <br />
                <Subtitle>Excellent Tertiary Education</Subtitle>
              </StyledTitle>
            </LogoSection>

            <StyledText>
              Transform your educational experience with our comprehensive management system. 
              Streamline school operations, track academic progress, and foster seamless 
              communication between students, teachers, and administrators.
            </StyledText>

            <FeaturesGrid>
              <FeatureItem>
                <FeatureDot />
                <span>Smart Attendance Tracking</span>
              </FeatureItem>
              <FeatureItem>
                <FeatureDot />
                <span>Performance Analytics</span>
              </FeatureItem>
              <FeatureItem>
                <FeatureDot />
                <span>Real-time Communication</span>
              </FeatureItem>
            </FeaturesGrid>

            <StyledBox>
              <StyledLink to="/choose">
                <AnimatedButton 
                  as={LightPurpleButton} 
                  variant="contained" 
                  fullWidth
                  startIcon={<Login />}
                >
                  Sign In to Account
                </AnimatedButton>
              </StyledLink>

              <StyledLink to="/chooseasguest">
                <AnimatedOutlineButton
                  variant="outlined"
                  fullWidth
                  startIcon={<Person />}
                >
                  Continue as Guest
                </AnimatedOutlineButton>
              </StyledLink>

              <SignupSection>
                <StyledText>
                  New to SETEC?{' '}
                  <AnimatedLink to="/Adminregister">
                    Create Administrator Account
                  </AnimatedLink>
                </StyledText>
              </SignupSection>
            </StyledBox>
          </ContentPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

// 🎨 Enhanced Animations
const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(40px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(0, 255, 136, 0.6);
    transform: scale(1.02);
  }
`;

const slideInRight = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-50px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const shapeFloat = keyframes`
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg); 
    opacity: 0.1;
  }
  25% { 
    transform: translate(10px, -15px) rotate(90deg); 
    opacity: 0.2;
  }
  50% { 
    transform: translate(-5px, -25px) rotate(180deg); 
    opacity: 0.15;
  }
  75% { 
    transform: translate(15px, -10px) rotate(270deg); 
    opacity: 0.2;
  }
`;

// 🏗️ Styled Components
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0c2c1d 0%, #1a4d2e 50%, #2d6a4f 100%);
  background-size: 400% 400%;
  animation: ${gradientFlow} 8s ease infinite;
  position: relative;
  overflow: hidden;
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Shape1 = styled.div`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 100px;
  height: 100px;
  background: rgba(0, 255, 136, 0.1);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: ${shapeFloat} 20s infinite linear;
`;

const Shape2 = styled.div`
  position: absolute;
  top: 70%;
  right: 15%;
  width: 150px;
  height: 150px;
  background: rgba(23, 158, 75, 0.08);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: ${shapeFloat} 25s infinite linear reverse;
`;

const Shape3 = styled.div`
  position: absolute;
  top: 30%;
  right: 20%;
  width: 80px;
  height: 80px;
  background: rgba(0, 255, 136, 0.05);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: ${shapeFloat} 18s infinite linear;
`;

const ContentPaper = styled.div`
  padding: 50px 40px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
  animation: ${slideInRight} 1.2s ease-out;
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  .logo-icon {
    font-size: 3rem !important;
    color: #00ff88ff;
    margin-bottom: 15px;
    animation: ${floatAnimation} 3s ease-in-out infinite;
  }
`;

const StyledTitle = styled(Typography).attrs({ variant: 'h2' })`
  font-weight: 700 !important;
  font-size: 2.8rem !important;
  letter-spacing: 0.5px;
  text-align: center;
  margin-bottom: 10px !important;
  animation: ${fadeInUp} 1s ease-out;
  line-height: 1.2 !important;
`;

const HighlightText = styled.span`
  background: linear-gradient(135deg, #00ff88ff, #00e676, #00ff88ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: ${gradientFlow} 3s ease infinite;
  font-weight: 800;
`;

const Subtitle = styled.span`
  font-size: 1.4rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-top: 10px;
`;

const StyledText = styled(Typography).attrs({ variant: 'body1' })`
  margin: 25px 0;
  letter-spacing: 0.3px;
  line-height: 1.7 !important;
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  animation: ${fadeInUp} 1.4s ease-out;
  font-weight: 300 !important;
`;

const FeaturesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 25px 0;
  animation: ${fadeInUp} 1.6s ease-out;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
`;

const FeatureDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88ff;
  animation: ${pulseGlow} 2s infinite;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px 0;
  animation: ${fadeInUp} 1.8s ease-out;
`;

const ImageContainer = styled.div`
  position: relative;
  padding: 20px;
  animation: ${fadeInUp} 1s ease-out;
`;

const AnimatedImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 30px 80px rgba(0, 255, 136, 0.2);
  }
`;

const ImageGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
  filter: blur(20px);
  animation: ${pulseGlow} 3s ease-in-out infinite;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  max-width: 300px;
`;

const AnimatedButton = styled(Button)`
  background: linear-gradient(135deg, #00ff88ff, #00e676) !important;
  padding: 14px 28px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  font-size: 1.1rem !important;
  text-transform: none !important;
  animation: ${fadeInUp} 2s ease-out, ${pulseGlow} 3s infinite ease-in-out;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 15px 40px rgba(0, 255, 136, 0.4) !important;
  }
`;

const AnimatedOutlineButton = styled(Button)`
  border: 2px solid #00ff88ff !important;
  color: #00ff88ff !important;
  padding: 12px 28px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  text-transform: none !important;
  animation: ${fadeInUp} 2.2s ease-out;
  transition: all 0.3s ease !important;

  &:hover {
    background: rgba(0, 255, 136, 0.1) !important;
    border-color: #00ff88ff !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2) !important;
  }
`;

const SignupSection = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const AnimatedLink = styled(Link)`
  color: #00ff88ff;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #00ff88ff, #00e676);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #00e676;

    &::after {
      width: 100%;
    }
  }
`;