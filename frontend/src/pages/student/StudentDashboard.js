import { useState, useEffect } from 'react';                                                                                                     
import { 
    CssBaseline, 
    Box, 
    Toolbar, 
    List, 
    Typography, 
    Divider, 
    IconButton, 
    useTheme, 
    useMediaQuery, 
} from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu'; 
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import { Navigate, Route, Routes } from 'react-router-dom'; 
import StudentSideBar from './StudentSideBar'; 
import StudentHomePage from './StudentHomePage'; 
import StudentProfile from './StudentProfile'; 
import StudentSubjects from './StudentSubjects'; 
import ViewStdAttendance from './ViewStdAttendance'; 
import StudentComplain from './StudentComplain'; 
import Logout from '../Logout' 
import AccountMenu from '../../components/AccountMenu'; 
import { AppBar, Drawer } from '../../components/styles'; 
import { useSelector } from 'react-redux'; 
 
const StudentDashboard = () => { 
    const [open, setOpen] = useState(false); 
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
                        boxShadow: '0 4px 20px rgba(23, 158, 75, 0.3)', 
                        transition: 'all 0.3s ease', 
                        zIndex: (theme) => theme.zIndex.drawer + 1, 
                        ...(open && { 
                            width: { md: `calc(100% - 240px)` }, 
                            ml: { md: '240px' }, 
                        }), 
                    }} 
                > 
                    <Toolbar sx={{ pr: '24px' }}> 
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            aria-label="open drawer" 
                            onClick={toggleDrawer} 
                            sx={{ 
                                marginRight: '36px', 
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
                        <DashboardIcon sx={{ mr: 2, fontSize: '2rem' }} /> 
                        <Typography 
                            component="h1" 
                            variant="h6" 
                            color="inherit" 
                            noWrap 
                            sx={{  
                                flexGrow: 1, 
                                fontWeight: 700, 
                            }} 
                        > 
                            Student Dashboard 
                        </Typography> 
                        <AccountMenu /> 
                    </Toolbar> 
                </AppBar> 
                 
                <Drawer  
                    variant={isMobile ? "temporary" : "permanent"}  
                    open={open}  
                    onClose={toggleDrawer} 
                    sx={{ 
                        display: 'flex', 
                        '& .MuiDrawer-paper': { 
                            background: 'linear-gradient(180deg, #0c2c1d 0%, #1a4d2e 100%)', 
                            color: 'white', 
                            borderRight: '1px solid rgba(255, 255, 255, 0.1)', 
                            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)', 
                            overflowX: 'hidden', 
                            transition: 'width 0.3s ease', 
                            width: open ? 240 : { xs: 0, md: 60 }, 
                            ...(!open && { 
                                '@media (max-width: 900px)': { 
                                    display: 'none', 
                                }, 
                            }), 
                        }, 
                    }} 
                > 
                    <Toolbar sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        px: 2, 
                        py: 1, 
                        background: 'linear-gradient(90deg, rgba(23, 158, 75, 0.2) 0%, transparent 100%)', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
                    }}> 
                        {open && ( 
                            <Typography  
                                variant="h6"  
                                sx={{  
                                    flexGrow: 1,  
                                    textAlign: 'center', 
                                    color: '#179e4bff', 
                                    fontWeight: 600, 
                                }} 
                            > 
                                STUDENT PORTAL 
                            </Typography> 
                        )} 
                        <IconButton  
                            onClick={toggleDrawer} 
                            sx={{ 
                                color: 'white', 
                                '&:hover': { 
                                    backgroundColor: 'rgba(23, 158, 75, 0.1)', 
                                    transform: 'scale(1.1)', 
                                } 
                            }} 
                        > 
                            <ChevronLeftIcon /> 
                        </IconButton> 
                    </Toolbar> 
                    <Divider /> 
                    <List component="nav" sx={{ px: 1 }}> 
                        <StudentSideBar /> 
                    </List> 
                </Drawer> 
                 
                <Box  
                    component="main"  
                    sx={{ 
                        backgroundColor: 'transparent', 
                        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
                        flexGrow: 1, 
                        height: '100vh', 
                        overflow: 'auto', 
                        position: 'relative', 
                    }} 
                > 
                    <Toolbar /> 
                    <Box sx={{  
                        p: { xs: 2, sm: 3, md: 4 }, 
                        minHeight: 'calc(100vh - 64px)' 
                    }}> 
                        <Routes> 
                            <Route path="/" element={<StudentHomePage />} /> 
                            <Route path='*' element={<Navigate to="/" />} /> 
                            <Route path="/Student/dashboard" element={<StudentHomePage />} /> 
                            <Route path="/Student/profile" element={<StudentProfile />} /> 
                            <Route path="/Student/subjects" element={<StudentSubjects />} /> 
                            <Route path="/Student/attendance" element={<ViewStdAttendance />} /> 
                            <Route path="/Student/complain" element={<StudentComplain />} /> 
                            <Route path="/logout" element={<Logout />} /> 
                        </Routes> 
                    </Box> 
                </Box> 
            </Box> 
        </> 
    ); 
} 
export default StudentDashboard; 