import { useState } from 'react';                                                                                                                                           
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
import { AppBar, Drawer } from '../../components/styles';           
import Logout from '../Logout';         
import SideBar from './SideBar';            
import AdminProfile from './AdminProfile';          
import AdminHomePage from './AdminHomePage';            
            
import AddStudent from './studentRelated/AddStudent';           
import SeeComplains from './studentRelated/SeeComplains';           
import ShowStudents from './studentRelated/ShowStudents';           
import StudentAttendance from './studentRelated/StudentAttendance';         
import StudentExamMarks from './studentRelated/StudentExamMarks';           
import ViewStudent from './studentRelated/ViewStudent';         
            
import AddNotice from './noticeRelated/AddNotice';          
import ShowNotices from './noticeRelated/ShowNotices';          
            
import ShowSubjects from './subjectRelated/ShowSubjects';           
import SubjectForm from './subjectRelated/SubjectForm';         
import ViewSubject from './subjectRelated/ViewSubject';         
            
import AddTeacher from './teacherRelated/AddTeacher';           
import ChooseClass from './teacherRelated/ChooseClass';         
import ChooseSubject from './teacherRelated/ChooseSubject';         
import ShowTeachers from './teacherRelated/ShowTeachers';           
import TeacherDetails from './teacherRelated/TeacherDetails';           
            
import AddClass from './classRelated/AddClass';         
import ClassDetails from './classRelated/ClassDetails';         
import ShowClasses from './classRelated/ShowClasses';           
import AccountMenu from '../../components/AccountMenu';         
            
const AdminDashboard = () => {          
    const [open, setOpen] = useState(false);            
    const theme = useTheme();           
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));           
                
    const toggleDrawer = () => {            
        setOpen(!open);         
    };          
            
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
                            Admin Dashboard         
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
                                SETEC ADMIN         
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
                        <SideBar />         
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
                    <Routes>            
                        <Route path="/" element={<AdminHomePage />} />          
                        <Route path='*' element={<Navigate to="/" />} />            
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />           
                        <Route path="/Admin/profile" element={<AdminProfile />} />          
                        <Route path="/Admin/complains" element={<SeeComplains />} />            
                            
                        {/* Notice */}          
                        <Route path="/Admin/addnotice" element={<AddNotice />} />           
                        <Route path="/Admin/notices" element={<ShowNotices />} />           
                            
                        {/* Subject */}         
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />         
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />          
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />          
                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />            
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />         
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />            
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />          
                            
                        {/* Class */}           
                        <Route path="/Admin/addclass" element={<AddClass />} />         
                        <Route path="/Admin/classes" element={<ShowClasses />} />           
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />            
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />            
                            
                        {/* Student */}         
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />            
                        <Route path="/Admin/students" element={<ShowStudents />} />         
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />          
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />         
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />           
                            
                        {/* Teacher */}         
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />         
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />           
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />          
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />         
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />          
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />            
                            
                        <Route path="/logout" element={<Logout />} />           
                    </Routes>           
                </Box>          
            </Box>          
        </>         
    );          
}           
            
export default AdminDashboard;          