import React from 'react';                                                                                                                          
import { useNavigate } from 'react-router-dom';   
import { useDispatch, useSelector } from 'react-redux';   
import { authLogout } from '../redux/userRelated/userSlice';    
import styled, { keyframes } from 'styled-components';    
import { Logout, Cancel, Person } from '@mui/icons-material';   
    
const LogoutComponent = () => {   
    const currentUser = useSelector(state => state.user.currentUser);   
    const navigate = useNavigate();   
    const dispatch = useDispatch();   
    
    const handleLogout = () => {    
        dispatch(authLogout());   
        navigate('/');    
    };    
      
    const handleCancel = () => {    
        navigate(-1);   
    };    
      
    return (    
        <PageBackground>    
            <LogoutContainer>   
                <UserAvatar>    
                    <Person className="avatar-icon" />    
                </UserAvatar>   
                    
                <UserInfo>    
                    <UserName>{currentUser?.name || "User"}</UserName>    
                    <UserEmail>{currentUser?.email || "user@example.com"}</UserEmail>   
                </UserInfo>   
        
                <LogoutMessage>   
                    Are you sure you want to log out?   
                </LogoutMessage>    
        
                <WarningText>   
                    You'll need to sign in again to access your account.    
                </WarningText>    
        
                <ButtonGroup>   
                    <LogoutButtonCancel onClick={handleCancel}>   
                        <Cancel className="button-icon" />    
                        Cancel    
                    </LogoutButtonCancel>   
                    <LogoutButtonLogout onClick={handleLogout}>   
                        <Logout className="button-icon" />    
                        Sign Out    
                    </LogoutButtonLogout>   
                </ButtonGroup>    
            </LogoutContainer>    
        </PageBackground>   
    );    
};    
    
export default LogoutComponent;   
    
//    
// 🎨 Enhanced Styled Components with Advanced Animations   
//    
    
// --- Animations ---   
const fadeInUp = keyframes`   
  from {    
    opacity: 0;     
    transform: translateY(30px) scale(0.95);    
  }   
  to {    
    opacity: 1;     
    transform: translateY(0) scale(1);    
  }   
`;    
    
const backgroundFlow = keyframes`   
  0% { background-position: 0% 50%; }   
  50% { background-position: 100% 50%; }    
  100% { background-position: 0% 50%; }   
`;    
    
const pulseGlow = keyframes`    
  0%, 100% {    
    box-shadow: 0 0 20px rgba(23, 158, 75, 0.3),    
                0 0 40px rgba(23, 158, 75, 0.1);    
  }   
  50% {     
    box-shadow: 0 0 30px rgba(23, 158, 75, 0.5),    
                0 0 60px rgba(23, 158, 75, 0.2);    
  }   
`;    
    
const iconBounce = keyframes`   
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }   
  40% { transform: translateY(-5px); }    
  60% { transform: translateY(-3px); }    
`;    
    
// --- Layout ---   
const PageBackground = styled.div`    
  display: flex;    
  align-items: center;    
  justify-content: center;    
  min-height: 100vh;    
  padding: 20px;    
  background: linear-gradient(-45deg, #0c2c1d, #1a4d2e, #2d6a4f, #40916c);    
  background-size: 400% 400%;   
  animation: ${backgroundFlow} 8s ease infinite;    
`;    
    
const LogoutContainer = styled.div`   
  background: rgba(255, 255, 255, 0.95);    
  backdrop-filter: blur(20px);    
  border-radius: 24px;    
  padding: 50px 40px;   
  text-align: center;   
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);    
  border: 1px solid rgba(255, 255, 255, 0.3);   
  animation: ${fadeInUp} 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);    
  max-width: 420px;   
  width: 100%;    
  position: relative;   
  overflow: hidden;   
  transition: all 0.4s ease;    
    
  &:hover {   
    transform: translateY(-5px);    
    animation: ${pulseGlow} 2s ease-in-out infinite;    
  }   
    
  &::before {   
    content: '';    
    position: absolute;   
    top: 0;   
    left: -100%;    
    width: 100%;    
    height: 100%;   
    background: linear-gradient(90deg, transparent, rgba(23, 158, 75, 0.1), transparent);   
    transition: left 0.6s;    
  }   
    
  &:hover::before {   
    left: 100%;   
  }   
`;    
    
const UserAvatar = styled.div`    
  width: 80px;    
  height: 80px;   
  border-radius: 50%;   
  background: linear-gradient(135deg, #179e4bff, #0d8b3aff);    
  display: flex;    
  align-items: center;    
  justify-content: center;    
  margin: 0 auto 20px;    
  box-shadow: 0 8px 25px rgba(23, 158, 75, 0.3);    
  position: relative;   
  transition: all 0.3s ease;    
    
  .avatar-icon {    
    font-size: 2.5rem !important;   
    color: white;   
  }   
    
  &:hover {   
    transform: scale(1.1);    
    animation: ${iconBounce} 1s ease;   
  }   
`;    
    
const UserInfo = styled.div`    
  margin-bottom: 30px;    
`;    
    
const UserName = styled.h1`   
  font-size: 1.8rem;    
  color: #2d3748;   
  margin-bottom: 5px;   
  font-weight: 700;   
  text-transform: capitalize;   
  background: linear-gradient(45deg, #2d3748, #179e4bff);   
  -webkit-background-clip: text;    
  -webkit-text-fill-color: transparent;   
`;    
    
const UserEmail = styled.p`   
  font-size: 0.9rem;    
  color: #718096;   
  font-weight: 500;   
`;    
    
const LogoutMessage = styled.h2`    
  font-size: 1.4rem;    
  color: #2d3748;   
  margin-bottom: 15px;    
  font-weight: 600;   
  line-height: 1.4;   
`;    
    
const WarningText = styled.p`   
  font-size: 0.95rem;   
  color: #718096;   
  margin-bottom: 35px;    
  line-height: 1.5;   
  font-weight: 400;   
`;    
    
const ButtonGroup = styled.div`   
  display: flex;    
  gap: 15px;    
  width: 100%;    
    
  @media (max-width: 480px) {   
    flex-direction: column;   
  }   
`;    
    
// --- Buttons ---    
const BaseButton = styled.button`   
  padding: 14px 24px;   
  border-radius: 12px;    
  border: none;   
  font-size: 1rem;    
  font-weight: 600;   
  cursor: pointer;    
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);    
  display: flex;    
  align-items: center;    
  justify-content: center;    
  gap: 8px;   
  flex: 1;    
  position: relative;   
  overflow: hidden;   
    
  &::before {   
    content: '';    
    position: absolute;   
    top: 0;   
    left: -100%;    
    width: 100%;    
    height: 100%;   
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);   
    transition: left 0.5s;    
  }   
    
  &:hover::before {   
    left: 100%;   
  }   
    
  .button-icon {    
    font-size: 1.2rem !important;   
    transition: transform 0.3s ease;    
  }   
    
  &:hover {   
    transform: translateY(-2px);    
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);   
    
    .button-icon {    
      transform: scale(1.1);    
    }   
  }   
    
  &:active {    
    transform: translateY(0);   
  }   
`;    
    
const LogoutButtonLogout = styled(BaseButton)`    
  background: linear-gradient(135deg, #e53e3e, #c53030);    
  color: white;   
  box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);    
    
  &:hover {   
    background: linear-gradient(135deg, #c53030, #9b2c2c);    
    box-shadow: 0 8px 25px rgba(229, 62, 62, 0.4);    
  }   
`;    
    
const LogoutButtonCancel = styled(BaseButton)`    
  background: linear-gradient(135deg, #179e4bff, #0d8b3aff);    
  color: white;   
  box-shadow: 0 4px 15px rgba(23, 158, 75, 0.3);    
    
  &:hover {   
    background: linear-gradient(135deg, #0d8b3aff, #0a6e2e);    
    box-shadow: 0 8px 25px rgba(23, 158, 75, 0.4);    
  }   
`;    
    
// Floating particles for background    
const ParticleBackground = styled.div`    
  position: fixed;    
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
  background: rgba(255, 255, 255, 0.6);   
  border-radius: 50%;   
  animation: float 6s ease-in-out infinite;   
  animation-delay: ${props => props.delay || '0s'};   
      
  @keyframes float {    
    0%, 100% { transform: translateY(0px) rotate(0deg); }   
    50% { transform: translateY(-20px) rotate(180deg); }    
  }   
`;    