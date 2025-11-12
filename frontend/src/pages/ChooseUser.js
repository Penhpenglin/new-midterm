import React, { useEffect, useState } from 'react';                                                                       
import { useNavigate } from 'react-router-dom'; 
import {  
  Grid, 
  Paper,  
  Box,  
  Container,  
  CircularProgress, 
  Backdrop, 
  Typography, 
} from '@mui/material'; 
import { AccountCircle, School, Group } from '@mui/icons-material'; 
import styled, { keyframes } from 'styled-components';  
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUser } from '../redux/userRelated/userHandle';  
import Popup from '../components/Popup';  
  
const ChooseUser = ({ visitor }) => { 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const password = 'zxc'; 
  
  const { status, currentUser, currentRole } = useSelector( 
    (state) => state.user 
  );  
  
  const [loader, setLoader] = useState(false);  
  const [showPopup, setShowPopup] = useState(false);  
  const [message, setMessage] = useState(''); 
  const [hoveredCard, setHoveredCard] = useState(null); 
  
  const navigateHandler = (user) => { 
    if (user === 'Admin') { 
      if (visitor === 'guest') {  
        const email = 'yogendra@12';  
        const fields = { email, password }; 
        setLoader(true);  
        dispatch(loginUser(fields, user));  
      } else {  
        navigate('/Adminlogin');  
      } 
    } else if (user === 'Student') {  
      if (visitor === 'guest') {  
        const rollNum = '1';  
        const studentName = 'Dipesh Awasthi'; 
        const fields = { rollNum, studentName, password };  
        setLoader(true);  
        dispatch(loginUser(fields, user));  
      } else {  
        navigate('/Studentlogin');  
      } 
    } else if (user === 'Teacher') {  
      if (visitor === 'guest') {  
        const email = 'tony@12';  
        const fields = { email, password }; 
        setLoader(true);  
        dispatch(loginUser(fields, user));  
      } else {  
        navigate('/Teacherlogin');  
      } 
    } 
  };  
  
  useEffect(() => { 
    if (status === 'success' || currentUser !== null) { 
      if (currentRole === 'Admin') {  
        navigate('/Admin/dashboard'); 
      } else if (currentRole === 'Student') { 
        navigate('/Student/dashboard'); 
      } else if (currentRole === 'Teacher') { 
        navigate('/Teacher/dashboard'); 
      } 
    } else if (status === 'error') {  
      setLoader(false); 
      setMessage('Network Error');  
      setShowPopup(true); 
    } 
  }, [status, currentRole, navigate, currentUser]); 
  
  return (  
    <StyledContainer> 
      <HeaderSection> 
        <WelcomeTitle variant="h1"> 
          Welcome to Setec Institute  
        </WelcomeTitle> 
        <WelcomeSubtitle variant="h5">  
          Choose your role to continue your journey 
        </WelcomeSubtitle>  
      </HeaderSection>  
    
      <Container maxWidth="lg"> 
        <Grid container spacing={4} justifyContent="center">  
          <Grid item xs={12} sm={6} md={4}> 
            <StyledCard   
              onMouseEnter={() => setHoveredCard('admin')}  
              onMouseLeave={() => setHoveredCard(null)} 
              onClick={() => navigateHandler('Admin')}  
              className={hoveredCard === 'admin' ? 'hovered' : ''}  
              delay="0s"  
            > 
              <CardGlow />  
              <IconWrapper className="icon-wrapper">  
                <AccountCircle className="card-icon" /> 
                <RippleEffect />  
              </IconWrapper>  
              <StyledTitle>Administrator</StyledTitle>  
              <StyledText>  
                Manage the entire system, oversee operations, and maintain platform integrity.  
              </StyledText> 
              <CardFooter>  
                <ClickHint>Click to continue →</ClickHint>  
              </CardFooter> 
            </StyledCard> 
          </Grid> 
    
          <Grid item xs={12} sm={6} md={4}> 
            <StyledCard   
              onMouseEnter={() => setHoveredCard('student')}  
              onMouseLeave={() => setHoveredCard(null)} 
              onClick={() => navigateHandler('Student')}  
              className={hoveredCard === 'student' ? 'hovered' : ''}  
              delay="0.2s"  
            > 
              <CardGlow />  
              <IconWrapper className="icon-wrapper">  
                <School className="card-icon" />  
                <RippleEffect />  
              </IconWrapper>  
              <StyledTitle>Student</StyledTitle>  
              <StyledText>  
                Access courses, submit assignments, and track your academic progress. 
              </StyledText> 
              <CardFooter>  
                <ClickHint>Click to continue →</ClickHint>  
              </CardFooter> 
            </StyledCard> 
          </Grid> 
    
          <Grid item xs={12} sm={6} md={4}> 
            <StyledCard   
              onMouseEnter={() => setHoveredCard('teacher')}  
              onMouseLeave={() => setHoveredCard(null)} 
              onClick={() => navigateHandler('Teacher')}  
              className={hoveredCard === 'teacher' ? 'hovered' : ''}  
              delay="0.4s"  
            > 
              <CardGlow />  
              <IconWrapper className="icon-wrapper">  
                <Group className="card-icon" /> 
                <RippleEffect />  
              </IconWrapper>  
              <StyledTitle>Teacher</StyledTitle>  
              <StyledText>  
                Create content, grade assignments, and guide students through their learning. 
              </StyledText> 
              <CardFooter>  
                <ClickHint>Click to continue →</ClickHint>  
              </CardFooter> 
            </StyledCard> 
          </Grid> 
        </Grid> 
      </Container>  
    
      <FloatingParticles> 
        {[...Array(15)].map((_, i) => ( 
          <Particle key={i} index={i} />  
        ))} 
      </FloatingParticles>  
        
      <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}  
        open={loader} 
      > 
        <LoadingContainer>  
          <CircularProgress color="inherit" size={60} />  
          <Typography variant="h6" sx={{ mt: 2 }}>  
            Preparing your dashboard... 
          </Typography> 
        </LoadingContainer> 
      </Backdrop> 
        
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> 
    </StyledContainer>  
  );  
};  
  
export default ChooseUser;  
  
//  
// 🎨 Styled Components with Advanced Animations  
//  
  
// Floating animation for particles 
const float = keyframes`  
  0%, 100% { transform: translateY(0px) rotate(0deg); } 
  50% { transform: translateY(-20px) rotate(180deg); }  
`;  
  
// Card entrance animation  
const slideUp = keyframes`  
  from {  
    opacity: 0;   
    transform: translateY(50px) scale(0.8);   
  } 
  to {  
    opacity: 1;   
    transform: translateY(0) scale(1);  
  } 
`;  
  
// Pulse animation for icons  
const pulse = keyframes`  
  0% { transform: scale(1); } 
  50% { transform: scale(1.1); }  
  100% { transform: scale(1); } 
`;  
  
// Ripple effect animation  
const ripple = keyframes` 
  0% {  
    transform: scale(0.8);  
    opacity: 1; 
  } 
  100% {  
    transform: scale(2.5);  
    opacity: 0; 
  } 
`;  
  
// Glow animation 
const glow = keyframes` 
  0%, 100% { box-shadow: 0 0 20px rgba(23, 158, 75, 0.3); } 
  50% { box-shadow: 0 0 40px rgba(23, 158, 75, 0.6); }  
`;  
  
const StyledContainer = styled.div` 
  background: linear-gradient(135deg, #0c2c1d 0%, #1a4d2e 50%, #2d6a4f 100%); 
  min-height: 100vh;  
  display: flex;  
  flex-direction: column; 
  justify-content: center;  
  align-items: center;  
  padding: 2rem;  
  position: relative; 
  overflow: hidden; 
`;  
  
const HeaderSection = styled(Box)`  
  text-align: center; 
  margin-bottom: 4rem;  
  animation: ${slideUp} 1s ease-out;  
`;  
  
const WelcomeTitle = styled(Typography)`  
  background: linear-gradient(45deg, #fff, #179e4bff);  
  -webkit-background-clip: text;  
  -webkit-text-fill-color: transparent; 
  font-weight: 700 !important;  
  margin-bottom: 1rem !important; 
  font-size: 3.5rem !important; 
`;  
  
const WelcomeSubtitle = styled(Typography)` 
  color: rgba(255, 255, 255, 0.8);  
  font-weight: 300 !important;  
`;  
  
const StyledCard = styled(Paper)` 
  padding: 40px 30px; 
  text-align: center; 
  background: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(10px);  
  border: 1px solid rgba(255, 255, 255, 0.2); 
  border-radius: 20px;  
  cursor: pointer;  
  position: relative; 
  overflow: hidden; 
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
  animation: ${slideUp} 0.8s ease-out both; 
  animation-delay: ${props => props.delay}; 
  
  &:before {  
    content: '';  
    position: absolute; 
    top: 0; 
    left: -100%;  
    width: 100%;  
    height: 100%; 
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent); 
    transition: left 0.5s;  
  } 
  
  &:hover { 
    transform: translateY(-15px) scale(1.05); 
    background: rgba(255, 255, 255, 0.15);  
    border-color: rgba(23, 158, 75, 0.5); 
  
    &:before {  
      left: 100%; 
    } 
  
    .card-icon {  
      animation: ${pulse} 1s ease-in-out; 
      color: #179e4bff; 
    } 
  
    .icon-wrapper { 
      transform: scale(1.1);  
    } 
  } 
  
  &.hovered { 
    animation: ${glow} 2s ease-in-out infinite; 
  } 
`;  
  
const CardGlow = styled.div`  
  position: absolute; 
  top: -2px;  
  left: -2px; 
  right: -2px;  
  bottom: -2px; 
  background: linear-gradient(45deg, #179e4bff, #0d8b3aff, #179e4bff);  
  border-radius: 22px;  
  z-index: -1;  
  opacity: 0; 
  transition: opacity 0.3s ease;  
  
  ${StyledCard}:hover & { 
    opacity: 1; 
  } 
`;  
  
const IconWrapper = styled.div` 
  margin-bottom: 20px;  
  position: relative; 
  display: inline-block;  
  transition: transform 0.3s ease;  
  
  .card-icon {  
    font-size: 4rem !important; 
    color: rgba(255, 255, 255, 0.9);  
    transition: all 0.3s ease;  
  } 
`;  
  
const RippleEffect = styled.div`  
  position: absolute; 
  top: 50%; 
  left: 50%;  
  width: 60px;  
  height: 60px; 
  background: rgba(23, 158, 75, 0.3); 
  border-radius: 50%; 
  transform: translate(-50%, -50%); 
  animation: ${ripple} 2s linear infinite;  
  
  ${StyledCard}:hover & { 
    animation-duration: 1s; 
  } 
`;  
  
const StyledTitle = styled.h2`  
  color: white; 
  font-weight: 600; 
  margin-bottom: 15px;  
  font-size: 1.8rem;  
`;  
  
const StyledText = styled.p`  
  color: rgba(255, 255, 255, 0.8);  
  font-size: 1rem;  
  line-height: 1.6; 
  margin-bottom: 20px;  
`;  
  
const CardFooter = styled.div`  
  margin-top: 20px; 
  opacity: 0; 
  transform: translateY(10px);  
  transition: all 0.3s ease;  
  
  ${StyledCard}:hover & { 
    opacity: 1; 
    transform: translateY(0); 
  } 
`;  
  
const ClickHint = styled.span`  
  color: #179e4bff; 
  font-weight: 500; 
  font-size: 0.9rem;  
`;  
  
const FloatingParticles = styled.div` 
  position: absolute; 
  top: 0; 
  left: 0;  
  width: 100%;  
  height: 100%; 
  pointer-events: none; 
  z-index: 0; 
`;  
  
const Particle = styled.div`  
  position: absolute; 
  width: 4px; 
  height: 4px;  
  background: rgba(23, 158, 75, 0.6); 
  border-radius: 50%; 
  animation: ${float} 6s ease-in-out infinite;  
  animation-delay: ${props => props.index * 0.4}s;  
  top: ${props => Math.random() * 100}%;  
  left: ${props => Math.random() * 100}%; 
`;  
  
const LoadingContainer = styled(Box)` 
  display: flex;  
  flex-direction: column; 
  align-items: center;  
  justify-content: center;  
`;  