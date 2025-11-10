import { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';
import { useSelector } from 'react-redux';




const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { currentUser } = useSelector(state => state.user);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Auto-close drawer on mobile
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar 
                    open={open} 
                    position='fixed'
                    sx={{
                        background: 'linear-gradient(135deg, #179e4bff 0%, #0d8b3aff 100%)',
                        boxShadow: '0 8px 32px rgba(23, 158, 75, 0.3)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        zIndex: theme.zIndex.drawer + 1,
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        ...(open && {
                            width: { md: `calc(100% - 280px)` },
                            ml: { md: '280px' },
                        }),
                    }}
                >
                    <Toolbar sx={{ 
                        pr: '24px',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '24px',
                                    ...(open && { display: 'none' }),
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'scale(1.1)',
                                    }
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ 
                                        fontWeight: 700,
                                        fontSize: { xs: '1rem', sm: '1.25rem' },
                                        background: 'linear-gradient(45deg, #fff, #e8f5e8)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    Teacher Portal
                                </Typography>
                                <Chip 
                                    label={`Welcome, ${currentUser?.name || 'Teacher'}`}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: '0.7rem',
                                        background: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        mt: 0.5,
                                        fontWeight: 500
                                    }}
                                />
                            </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip 
                                icon={<PersonIcon sx={{ fontSize: 16, color: 'white' }} />}
                                label="TEACHER"
                                size="small"
                                sx={{
                                    background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                                    color: 'white',
                                    fontWeight: 700,
                                    display: { xs: 'none', sm: 'flex' },
                                    boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)'
                                }}
                            />
                            <AccountMenu />
                        </Box>
                    </Toolbar>
                </AppBar>
                
                <Drawer 
                    variant={isMobile ? "temporary" : "permanent"} 
                    open={open} 
                    onClose={() => isMobile && setOpen(false)}
                    sx={{
                        ...(open ? styles.drawerStyled : styles.hideDrawer),
                        '& .MuiDrawer-paper': {
                            background: 'linear-gradient(180deg, #0c2c1d 0%, #1a4d2e 100%)',
                            borderRight: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '8px 0 32px rgba(0,0,0,0.2)',
                            width: 280,
                            overflowX: 'hidden',
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                            [theme.breakpoints.down('sm')]: {
                                width: 260,
                            },
                        }
                    }}
                >
                    <Toolbar sx={{
                        ...styles.toolBarStyled,
                        background: 'linear-gradient(90deg, rgba(23, 158, 75, 0.2) 0%, transparent 100%)',
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
                            <PersonIcon 
                                sx={{ 
                                    fontSize: 28, 
                                    color: '#00ff88ff',
                                    mr: 1,
                                    filter: 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.4))'
                                }} 
                            />
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: 'white',
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #fff, #00ff88ff)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                TEACHER
                            </Typography>
                        </Box>
                        <IconButton 
                            onClick={toggleDrawer}
                            sx={{ 
                                color: 'rgba(255,255,255,0.7)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.1)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    
                    <List component="nav" sx={{ 
                        flex: 1, 
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(0, 255, 136, 0.3)',
                            borderRadius: '3px',
                        },
                    }}>
                        <TeacherSideBar />
                    </List>
                    
                    {/* Footer */}
                    <Box sx={{ 
                        p: 2,
                        background: 'rgba(0,0,0,0.3)',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: 'rgba(255,255,255,0.6)',
                                textAlign: 'center',
                                display: 'block',
                                fontSize: '0.75rem',
                                fontWeight: 500
                            }}
                        >
                            SETEC Institute
                        </Typography>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: 'rgba(255,255,255,0.4)',
                                textAlign: 'center',
                                display: 'block',
                                fontSize: '0.7rem'
                            }}
                        >
                            Teacher Portal v2.0
                        </Typography>
                    </Box>
                </Drawer>
                
                <Box 
                    component="main" 
                    sx={{
                        ...styles.boxStyled,
                        background: `
                            linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%),
                            radial-gradient(circle at 20% 80%, rgba(23, 158, 75, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(13, 139, 58, 0.05) 0%, transparent 50%)
                        `,
                        minHeight: '100vh',
                        position: 'relative',
                    }}
                >
                    <Toolbar />
                    <Box sx={{ 
                        p: { xs: 2, sm: 3, md: 4 },
                        minHeight: 'calc(100vh - 64px)'
                    }}>
                        <Routes>
                            <Route path="/" element={<TeacherHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                            <Route path="/Teacher/profile" element={<TeacherProfile />} />
                            <Route path="/Teacher/students" element={<TeacherClassDetails />} />
                            <Route path="/Teacher/complain" element={<TeacherComplain />} />

                            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                            <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />

                            <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                            <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default TeacherDashboard;

const styles = {
    boxStyled: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        width: '100%',
        transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 2,
        minHeight: '64px !important',
    },
    drawerStyled: {
        display: "flex",
        '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            overflowX: 'hidden',
            transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 900px)': {
            display: 'none',
        },
        '& .MuiDrawer-paper': {
            width: 70,
            overflowX: 'hidden',
            transition: theme => theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            '& .MuiListItemText-root': {
                display: 'none',
            },
            '& .MuiListItemIcon-root': {
                minWidth: 0,
                justifyContent: 'center',
                marginRight: 'auto',
                marginLeft: 'auto',
            },
            '& .MuiListSubheader-root': {
                display: 'none',
            },
        },
    },
};