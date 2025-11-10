import * as React from 'react';
import { 
    Divider, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    ListSubheader,
    Box,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../redux/userRelated/userSlice';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { 
    Dashboard,
    Groups,
    Report,
    Person,
    School
} from '@mui/icons-material';

const TeacherSideBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutDialog, setLogoutDialog] = React.useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;

    const menuItems = [
        {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/",
            color: "#00ff88"
        },
        {
            text: `Class ${sclassName?.sclassName || ''}`,
            icon: <School />,
            path: "/Teacher/class",
            color: "#2196f3"
        },
        {
            text: "Students",
            icon: <Groups />,
            path: "/Teacher/students",
            color: "#ff9800"
        },
        {
            text: "Complains",
            icon: <Report />,
            path: "/Teacher/complain",
            color: "#f44336"
        }
    ];

    const userItems = [
        {
            text: "Profile",
            icon: <AccountCircleOutlinedIcon />,
            path: "/Teacher/profile",
            color: "#00ff88",
            type: "link"
        },
        {
            text: "Logout",
            icon: <ExitToAppIcon />,
            path: "#",
            color: "#e53e3e",
            type: "action"
        }
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "/Teacher/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
        setLogoutDialog(false);
    };

    const handleLogoutClick = () => {
        setLogoutDialog(true);
    };

    const handleMenuItemClick = (item) => {
        if (item.type === "action" && item.text === "Logout") {
            handleLogoutClick();
        }
    };

    return (
        <>
            <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #0c2c1d 0%, #1a4d2e 100%)' }}>
                {/* Header */}
                <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Person 
                        sx={{ 
                            fontSize: 40, 
                            color: '#00ff88',
                            mb: 1,
                            filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.3))'
                        }} 
                    />
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: 'white',
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #fff, #00ff88)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        TEACHER PORTAL
                    </Typography>
                    <Chip 
                        label={currentUser?.name || "Teacher"} 
                        size="small" 
                        sx={{ 
                            mt: 1,
                            background: 'rgba(0, 255, 136, 0.1)',
                            color: '#00ff88',
                            border: '1px solid rgba(0, 255, 136, 0.3)',
                            fontSize: '0.7rem',
                            fontWeight: 600
                        }} 
                    />
                </Box>

                {/* Main Menu */}
                <Box sx={{ p: 1 }}>
                    <ListSubheader 
                        sx={{ 
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            mb: 1
                        }}
                    >
                        Navigation
                    </ListSubheader>
                    
                    {menuItems.map((item, index) => (
                        <StyledListItemButton
                            key={item.text}
                            component={Link}
                            to={item.path}
                            isactive={isActive(item.path) ? 1 : 0}
                            color={item.color}
                            sx={{
                                animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <IconWrapper color={item.color} isactive={isActive(item.path) ? 1 : 0}>
                                    {item.icon}
                                </IconWrapper>
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                sx={{
                                    '& .MuiTypography-root': {
                                        color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.8)',
                                        fontWeight: isActive(item.path) ? 600 : 400,
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }
                                }}
                            />
                            {isActive(item.path) && (
                                <ActiveIndicator color={item.color} />
                            )}
                        </StyledListItemButton>
                    ))}
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 1 }} />

                {/* User Menu */}
                <Box sx={{ p: 1 }}>
                    <ListSubheader 
                        sx={{ 
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            mb: 1
                        }}
                    >
                        Account
                    </ListSubheader>
                    
                    {userItems.map((item, index) => (
                        <StyledListItemButton
                            key={item.text}
                            component={item.type === "link" ? Link : "button"}
                            to={item.type === "link" ? item.path : undefined}
                            onClick={() => item.type === "action" && handleMenuItemClick(item)}
                            isactive={item.type === "link" && isActive(item.path) ? 1 : 0}
                            color={item.color}
                            sx={{
                                animation: `slideInLeft 0.5s ease-out ${(menuItems.length + index) * 0.1}s both`
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <IconWrapper color={item.color} isactive={item.type === "link" && isActive(item.path) ? 1 : 0}>
                                    {item.icon}
                                </IconWrapper>
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.text}
                                sx={{
                                    '& .MuiTypography-root': {
                                        color: item.type === "link" && isActive(item.path) ? 'white' : 'rgba(255,255,255,0.8)',
                                        fontWeight: item.type === "link" && isActive(item.path) ? 600 : 400,
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }
                                }}
                            />
                            {item.type === "link" && isActive(item.path) && (
                                <ActiveIndicator color={item.color} />
                            )}
                        </StyledListItemButton>
                    ))}
                </Box>

                {/* Footer */}
                <Box sx={{ 
                    height: '100px',
                    background: 'linear-gradient(180deg, #0c2c1d 0%, #1a4d2e 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.5)',
                            textAlign: 'center',
                            display: 'block'
                        }}
                    >
                        SETEC Institute
                    </Typography>
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.3)',
                            textAlign: 'center',
                            display: 'block'
                        }}
                    >
                        Teacher Portal
                    </Typography>
                </Box>

                {/* Global Styles */}
                <style>
                    {`
                        @keyframes slideInLeft {
                            from {
                                opacity: 0;
                                transform: translateX(-20px);
                            }
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }
                        
                        @keyframes pulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                        }
                    `}
                </style>
            </Box>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={logoutDialog}
                onClose={() => setLogoutDialog(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 5,
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        border: '1px solid rgba(23, 158, 75, 0.2)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #179e4b, #0d8b3a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700
                }}>
                    Confirm Logout
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        Are you sure you want to logout from your account?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 3 }}>
                    <Button
                        onClick={() => setLogoutDialog(false)}
                        variant="outlined"
                        sx={{
                            borderColor: '#179e4b',
                            color: '#179e4b',
                            borderRadius: 2,
                            px: 3,
                            '&:hover': {
                                background: 'rgba(23, 158, 75, 0.1)',
                                borderColor: '#179e4b'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleLogout}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #e53e3e, #c53030)',
                            borderRadius: 2,
                            px: 3,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #c53030, #9b2c2c)',
                                boxShadow: '0 4px 15px rgba(229, 62, 62, 0.3)'
                            }
                        }}
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

// Styled Components (same as admin)
const StyledListItemButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'color',
})(({ isactive, color }) => ({
    borderRadius: '8px',
    margin: '2px 4px',
    padding: '8px 12px',
    position: 'relative',
    overflow: 'hidden',
    background: isactive 
        ? `linear-gradient(135deg, ${color}20, ${color}10)`
        : 'transparent',
    border: isactive 
        ? `1px solid ${color}40`
        : '1px solid transparent',
    '&:hover': {
        background: isactive 
            ? `linear-gradient(135deg, ${color}30, ${color}20)`
            : 'rgba(255, 255, 255, 0.05)',
        border: isactive 
            ? `1px solid ${color}60`
            : '1px solid rgba(255, 255, 255, 0.1)',
        transform: 'translateX(4px)',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: -100,
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
        transition: 'left 0.5s',
    },
    '&:hover::before': {
        left: '100%',
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const IconWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isactive' && prop !== 'color',
})(({ isactive, color }) => ({
    color: isactive ? color : 'rgba(255, 255, 255, 0.7)',
    filter: isactive ? `drop-shadow(0 0 8px ${color}40)` : 'none',
    transition: 'all 0.3s ease',
    animation: isactive ? 'pulse 2s infinite' : 'none',
}));

const ActiveIndicator = styled(Box)(({ color }) => ({
    width: 4,
    height: 20,
    borderRadius: 2,
    background: `linear-gradient(135deg, ${color}, ${color}80)`,
    marginLeft: 'auto',
    boxShadow: `0 0 8px ${color}40`,
}));

export default TeacherSideBar;