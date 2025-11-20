import React from 'react';        
import { Link } from 'react-router-dom';        
import { Container, Grid, Box, Button, Typography } from '@mui/material';       
import styled, { keyframes } from 'styled-components';        
import { School, Login, Person } from '@mui/icons-material';        
import Setec from "../assets/setec logo.png";       
import { LightPurpleButton } from '../components/buttonStyles';       
        
const Homepage = () => {        
  return (        
    <FullPageContainer>       
      {/* Animated Background Layers */}        
      <BackgroundGradient />        
      <AnimatedParticles />        
      <FloatingOrbs />        
      <LightBeams />        
          
      {/* Main Content */}        
      <ContentWrapper>        
        <Grid container spacing={0} alignItems="center" justifyContent="center">        
          {/* Image Section */}       
          <Grid item xs={12} md={6}>        
            <ImageSection>        
              <ImageContainer>        
                <AnimatedImage src={Setec} alt="SETEC Institute" />       
                <ImageGlow />       
                <ImageReflection />       
              </ImageContainer>       
            </ImageSection>       
          </Grid>       
              
          {/* Text + Buttons Section */}        
          <Grid item xs={12} md={6}>        
            <ContentSection>        
              <LogoSection>       
                <AnimatedIcon>        
                  <School className="logo-icon" />        
                </AnimatedIcon>        
                <TitleContainer>        
                  <MainTitle>       
                    Welcome To        
                    <br />        
                    <GradientText>SETEC INSTITUTE</GradientText>        
                    <br />        
                    <SubTitle>Excellent Tertiary Education</SubTitle>       
                  </MainTitle>        
                </TitleContainer>        
              </LogoSection>        
          
              <DescriptionText>        
                Transform your educational experience with our comprehensive management system.         
                Streamline school operations, track academic progress, and foster seamless        
                communication between students, teachers, and administrators.       
              </DescriptionText>       
          
              <FeaturesContainer>        
                <FeatureItem>       
                  <AnimatedDot />        
                  <FeatureText>Smart Attendance Tracking</FeatureText>        
                </FeatureItem>        
                <FeatureItem>       
                  <AnimatedDot />        
                  <FeatureText>Performance Analytics</FeatureText>        
                </FeatureItem>        
                <FeatureItem>       
                  <AnimatedDot />        
                  <FeatureText>Real-time Communication</FeatureText>        
                </FeatureItem>        
              </FeaturesContainer>       
          
              <ActionButtons>       
                <ButtonLink to="/choose">       
                  <PrimaryButton         
                    variant="contained"         
                    fullWidth       
                    startIcon={<Login />}       
                  >       
                    Sign In to Account        
                  </PrimaryButton>       
                </ButtonLink>       
          
                <ButtonLink to="/chooseasguest">        
                  <SecondaryButton        
                    variant="outlined"        
                    fullWidth       
                    startIcon={<Person />}        
                  >       
                    Continue as Guest       
                  </SecondaryButton>        
                </ButtonLink>       
          
                <SignupPrompt>       
                  <PromptText>        
                    New to SETEC?{' '}        
                    <SignupLink to="/Adminregister">        
                      Create Administrator Account        
                    </SignupLink>       
                  </PromptText>       
                </SignupPrompt>        
              </ActionButtons>        
            </ContentSection>       
          </Grid>       
        </Grid>       
      </ContentWrapper>        
    </FullPageContainer>        
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
        
const float = keyframes`       
  0%, 100% { transform: translateY(0px) rotate(0deg); }       
  50% { transform: translateY(-20px) rotate(5deg); }        
`;        
        
const gradientFlow = keyframes`       
  0% { background-position: 0% 50%; }       
  50% { background-position: 100% 50%; }        
  100% { background-position: 0% 50%; }       
`;        
        
const pulse = keyframes`        
  0%, 100% {        
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);        
    transform: scale(1);        
  }       
  50% {         
    box-shadow: 0 0 40px rgba(0, 255, 136, 0.6);        
    transform: scale(1.02);       
  }       
`;        
        
const slideIn = keyframes`       
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
        
const particleFloat = keyframes`        
  0% {        
    transform: translateY(100vh) rotate(0deg);        
    opacity: 0;       
  }       
  10% {        
    opacity: 1;       
  }       
  90% {        
    opacity: 0.5;       
  }       
  100% {        
    transform: translateY(-100px) rotate(360deg);        
    opacity: 0;       
  }       
`;        
        
const orbPulse = keyframes`        
  0%, 100% {        
    transform: scale(1);        
    opacity: 0.3;       
  }       
  50% {        
    transform: scale(1.2);        
    opacity: 0.6;       
  }       
`;        
        
const beamRotate = keyframes`        
  0% {        
    transform: rotate(0deg);        
  }       
  100% {        
    transform: rotate(360deg);        
  }       
`;        
        
const glow = keyframes`        
  0%, 100% {        
    filter: blur(20px) opacity(0.3);        
  }       
  50% {        
    filter: blur(30px) opacity(0.6);        
  }       
`;        
        
const reflect = keyframes`        
  0% {        
    transform: translateY(0) scaleX(1);        
    opacity: 0.3;       
  }       
  100% {        
    transform: translateY(20px) scaleX(0.95);        
    opacity: 0.1;       
  }       
`;        
        
// 🏗️ Styled Components       
const FullPageContainer = styled.div`        
  min-height: 100vh;        
  width: 100%;        
  position: relative;       
  overflow: hidden;       
  background: #000;        
`;        
        
const BackgroundGradient = styled.div`        
  position: fixed;       
  top: 0;       
  left: 0;        
  width: 100%;        
  height: 100%;       
  background: linear-gradient(135deg,        
    #0c2c1d 0%,        
    #1a4d2e 25%,        
    #2d6a4f 50%,        
    #1e4d2c 75%,        
    #0f2e1c 100%        
  );       
  background-size: 400% 400%;       
  animation: ${gradientFlow} 12s ease infinite;        
  z-index: 1;       
`;        
        
const AnimatedParticles = styled.div`        
  position: fixed;       
  top: 0;       
  left: 0;        
  width: 100%;        
  height: 100%;       
  pointer-events: none;       
  z-index: 2;       
        
  &::before {        
    content: '';        
    position: absolute;       
    width: 100%;        
    height: 100%;        
    background-image:        
      radial-gradient(2px 2px at 20px 30px, rgba(0, 255, 136, 0.3), transparent),        
      radial-gradient(2px 2px at 40px 70px, rgba(0, 255, 136, 0.2), transparent),        
      radial-gradient(1px 1px at 90px 40px, rgba(0, 255, 136, 0.4), transparent),        
      radial-gradient(1px 1px at 130px 80px, rgba(0, 255, 136, 0.2), transparent),        
      radial-gradient(2px 2px at 160px 30px, rgba(0, 255, 136, 0.3), transparent);       
    background-repeat: repeat;        
    background-size: 200px 200px;       
    animation: ${particleFloat} 20s linear infinite;        
  }       
`;        
        
const FloatingOrbs = styled.div`        
  position: fixed;       
  top: 0;       
  left: 0;        
  width: 100%;        
  height: 100%;       
  pointer-events: none;       
  z-index: 2;       
        
  &::before,        
  &::after {        
    content: '';        
    position: absolute;       
    border-radius: 50%;       
    animation: ${orbPulse} 8s ease-in-out infinite;        
  }       
        
  &::before {        
    width: 300px;       
    height: 300px;        
    background: radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%);        
    top: 10%;       
    left: 10%;        
    animation-delay: 0s;       
  }       
        
  &::after {        
    width: 400px;       
    height: 400px;        
    background: radial-gradient(circle, rgba(23, 158, 75, 0.08) 0%, transparent 70%);        
    bottom: 10%;       
    right: 10%;        
    animation-delay: 2s;       
  }       
`;        
        
const LightBeams = styled.div`        
  position: fixed;       
  top: 50%;       
  left: 50%;        
  transform: translate(-50%, -50%);       
  width: 200vw;       
  height: 200vh;        
  background:        
    radial-gradient(circle at center, transparent 30%, rgba(0, 255, 136, 0.03) 70%),        
    conic-gradient(        
      from 0deg at 50% 50%,        
      rgba(0, 255, 136, 0.02) 0deg,        
      rgba(0, 255, 136, 0.01) 90deg,        
      rgba(0, 255, 136, 0.02) 180deg,        
      rgba(0, 255, 136, 0.01) 270deg,        
      rgba(0, 255, 136, 0.02) 360deg        
    );       
  animation: ${beamRotate} 60s linear infinite;        
  z-index: 1;       
  pointer-events: none;       
`;        
        
const ContentWrapper = styled(Container)`        
  position: relative;       
  z-index: 3;       
  min-height: 100vh;        
  display: flex;        
  align-items: center;        
  padding: 0 !important;       
  margin: 0 !important;       
  max-width: 100% !important;       
`;        
        
const ImageSection = styled.div`        
  display: flex;        
  justify-content: center;        
  align-items: center;        
  height: 100vh;        
  padding: 40px;        
`;        
        
const ImageContainer = styled.div`        
  position: relative;       
  display: flex;        
  justify-content: center;        
  align-items: center;        
  animation: ${fadeInUp} 1.2s ease-out;       
`;        
        
const AnimatedImage = styled.img`       
  width: 100%;        
  max-width: 500px;       
  border-radius: 20px;        
  box-shadow:        
    0 20px 60px rgba(0, 0, 0, 0.4),        
    0 0 0 1px rgba(0, 255, 136, 0.1);       
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);       
  position: relative;       
  z-index: 2;       
  backdrop-filter: blur(10px);        
        
  &:hover {       
    transform: scale(1.05) rotate(1deg);        
    box-shadow:        
      0 30px 80px rgba(0, 255, 136, 0.3),        
      0 0 0 1px rgba(0, 255, 136, 0.2);       
  }       
`;        
        
const ImageGlow = styled.div`       
  position: absolute;       
  top: 50%;       
  left: 50%;        
  transform: translate(-50%, -50%);       
  width: 90%;       
  height: 90%;        
  background: radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 60%);        
  animation: ${glow} 3s ease-in-out infinite;        
  z-index: 1;       
  border-radius: 20px;       
`;        
        
const ImageReflection = styled.div`        
  position: absolute;       
  top: calc(100% + 20px);       
  left: 50%;        
  transform: translateX(-50%);       
  width: 80%;       
  height: 40px;        
  background: linear-gradient(        
    to bottom,        
    rgba(0, 255, 136, 0.2) 0%,        
    transparent 100%        
  );       
  border-radius: 50%;       
  filter: blur(10px);       
  animation: ${reflect} 2s ease-in-out infinite alternate;        
  z-index: 1;       
`;        
        
const ContentSection = styled.div`        
  padding: 60px 40px;       
  height: 100vh;        
  display: flex;        
  flex-direction: column;       
  justify-content: center;        
  position: relative;       
  animation: ${slideIn} 1.2s ease-out;       
  backdrop-filter: blur(10px);        
  background: rgba(0, 0, 0, 0.2);        
  border-radius: 20px;       
  margin: 20px;        
`;        
        
const LogoSection = styled.div`       
  text-align: center;       
  margin-bottom: 40px;        
`;        
        
const AnimatedIcon = styled.div`        
  .logo-icon {        
    font-size: 4rem !important;       
    color: #00ff88ff;       
    margin-bottom: 20px;        
    animation: ${float} 4s ease-in-out infinite;       
    filter: drop-shadow(0 0 20px rgba(0, 255, 136, 0.5));       
  }       
`;        
        
const TitleContainer = styled.div`        
  animation: ${fadeInUp} 1s ease-out;       
`;        
        
const MainTitle = styled(Typography).attrs({ variant: 'h2' })`        
  font-weight: 800 !important;        
  font-size: 3rem !important;       
  letter-spacing: 1px;        
  text-align: center;       
  margin-bottom: 15px !important;       
  line-height: 1.1 !important;        
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);       
`;        
        
const GradientText = styled.span`        
  background: linear-gradient(135deg, #00ff88ff, #00e676, #00ff88ff);       
  -webkit-background-clip: text;        
  -webkit-text-fill-color: transparent;       
  background-size: 200% 200%;       
  animation: ${gradientFlow} 3s ease infinite;        
  font-weight: 900;       
  display: inline-block;       
`;        
        
const SubTitle = styled.span`       
  font-size: 1.6rem;        
  font-weight: 300;       
  color: rgba(255, 255, 255, 0.9);        
  display: block;       
  margin-top: 15px;       
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);       
`;        
        
const DescriptionText = styled(Typography).attrs({ variant: 'body1' })`        
  margin: 30px 0;       
  letter-spacing: 0.5px;        
  line-height: 1.8 !important;        
  text-align: center;       
  color: rgba(255, 255, 255, 0.9);       
  animation: ${fadeInUp} 1.4s ease-out;       
  font-weight: 400 !important;        
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);       
  font-size: 1.1rem !important;       
`;        
        
const FeaturesContainer = styled.div`        
  display: flex;        
  flex-direction: column;       
  gap: 15px;        
  margin: 30px 0;       
  animation: ${fadeInUp} 1.6s ease-out;       
`;        
        
const FeatureItem = styled.div`       
  display: flex;        
  align-items: center;        
  gap: 15px;        
  color: rgba(255, 255, 255, 0.95);        
  font-size: 1rem;       
  padding: 10px 0;        
`;        
        
const AnimatedDot = styled.div`        
  width: 12px;       
  height: 12px;        
  border-radius: 50%;       
  background: #00ff88ff;        
  animation: ${pulse} 2s infinite;        
  flex-shrink: 0;       
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);       
`;        
        
const FeatureText = styled.span`        
  font-weight: 500;       
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);       
`;        
        
const ActionButtons = styled(Box)`        
  display: flex;        
  flex-direction: column;       
  align-items: center;        
  justify-content: center;        
  gap: 25px;        
  padding: 40px 0 20px;        
  animation: ${fadeInUp} 1.8s ease-out;       
`;        
        
const ButtonLink = styled(Link)`        
  text-decoration: none;        
  width: 100%;        
  max-width: 350px;       
`;        
        
const PrimaryButton = styled(Button)`        
  background: linear-gradient(135deg, #00ff88ff, #00e676) !important;       
  padding: 16px 32px !important;        
  border-radius: 15px !important;       
  font-weight: 700 !important;        
  font-size: 1.2rem !important;       
  text-transform: none !important;        
  animation: ${fadeInUp} 2s ease-out, ${pulse} 3s infinite ease-in-out;       
  transition: all 0.4s ease !important;       
  backdrop-filter: blur(10px);        
  border: 1px solid rgba(255, 255, 255, 0.1) !important;       
        
  &:hover {       
    transform: translateY(-5px) scale(1.02) !important;       
    box-shadow:        
      0 20px 50px rgba(0, 255, 136, 0.5),        
      0 0 0 1px rgba(255, 255, 255, 0.1) !important;        
  }       
`;        
        
const SecondaryButton = styled(Button)`       
  border: 2px solid #00ff88ff !important;       
  color: #00ff88ff !important;        
  padding: 14px 32px !important;        
  border-radius: 15px !important;       
  font-weight: 600 !important;        
  font-size: 1.1rem !important;       
  text-transform: none !important;        
  animation: ${fadeInUp} 2.2s ease-out;       
  transition: all 0.4s ease !important;       
  backdrop-filter: blur(10px);        
  background: rgba(0, 0, 0, 0.3) !important;       
        
  &:hover {       
    background: rgba(0, 255, 136, 0.15) !important;        
    border-color: #00ff88ff !important;       
    transform: translateY(-3px) !important;       
    box-shadow:        
      0 15px 40px rgba(0, 255, 136, 0.3),        
      0 0 0 1px rgba(255, 255, 255, 0.05) !important;        
  }       
`;        
        
const SignupPrompt = styled.div`       
  margin-top: 20px;       
  text-align: center;       
  padding: 20px;        
  background: rgba(0, 255, 136, 0.05);        
  border-radius: 12px;       
  border: 1px solid rgba(0, 255, 136, 0.1);       
`;        
        
const PromptText = styled(Typography).attrs({ variant: 'body2' })`        
  color: rgba(255, 255, 255, 0.9) !important;        
  font-size: 1rem !important;       
`;        
        
const SignupLink = styled(Link)`        
  color: #00ff88ff !important;       
  text-decoration: none;        
  font-weight: 700;       
  position: relative;       
  transition: all 0.3s ease;        
  text-shadow: 0 2px 10px rgba(0, 255, 136, 0.3);       
        
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
    color: #00e676 !important;       
        
    &::after {        
      width: 100%;        
    }       
  }       
`;          