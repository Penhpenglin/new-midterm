import React, { useEffect, useState } from 'react'      ;                                                                                                                                                       
import {                            
    Container,                              
    Grid,                           
    Typography,                             
    Box,                            
    Card,                           
    CardContent,                            
    LinearProgress,                             
    Chip,                           
    Stack                           
} from '@mui/material'                          
import { useDispatch, useSelector } from 'react-redux';                             
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';                           
import CustomPieChart from '../../components/CustomPieChart';                           
import { getUserDetails } from '../../redux/userRelated/userHandle';                            
import SeeNotice from '../../components/SeeNotice';                             
import CountUp from 'react-countup';                            
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';                            
import {                            
    School,                             
    Assignment as AssignmentIcon,                           
    TrendingUp,                             
    Person,                             
    Class as ClassIcon                          
} from '@mui/icons-material';                           
                            
const StudentHomePage = () => {                             
    const dispatch = useDispatch();                             
                            
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);                             
    const { subjectsList } = useSelector((state) => state.sclass);                          
                            
    const [subjectAttendance, setSubjectAttendance] = useState([]);                             
    const [attendanceData, setAttendanceData] = useState([]);                           
                            
    const classID = currentUser?.sclassName?._id;                           
                            
    useEffect(() => {                           
        if (currentUser?._id) {                             
            dispatch(getUserDetails(currentUser._id, "Student"));                           
        }                           
        if (classID) {                          
            dispatch(getSubjectList(classID, "ClassSubjects"));                             
        }                           
    }, [dispatch, currentUser?._id, classID]);                          
                            
    const numberOfSubjects = subjectsList?.length || 0;                             
                            
    useEffect(() => {                           
        if (userDetails) {                          
            const attendance = userDetails.attendance || [];                            
            setSubjectAttendance(attendance);                           
                                        
            // Calculate attendance data for chart                          
            const overallAttendancePercentage = calculateOverallAttendancePercentage(attendance);                           
            const overallAbsentPercentage = 100 - overallAttendancePercentage;                          
                                    
            setAttendanceData([                             
                { name: 'Present', value: overallAttendancePercentage },                            
                { name: 'Absent', value: overallAbsentPercentage }                          
            ]);                             
        }                           
    }, [userDetails]);                          
                            
    // Stats data for admin-like cards                          
    const studentStats = [                          
        {                           
            label: 'Total Subjects',                            
            value: numberOfSubjects,                            
            icon: <School />,                           
            color: '#1976d2'                            
        },                          
        {                           
            label: 'Assignments Due',                           
            value: 3,                           
            icon: <AssignmentIcon />,                           
            color: '#ed6c02'                            
        },                          
        {                           
            label: 'Classes This Week',                             
            value: 18,                              
            icon: <ClassIcon />,                            
            color: '#2e7d32'                            
        },                          
        {                           
            label: 'Overall Attendance',                            
            value: `${Math.round(attendanceData[0]?.value || 0)}%`,                             
            icon: <TrendingUp />,                           
            color: '#9c27b0'                            
        }                           
    ];                          
                            
    // Stats Card Component                             
    const StatsCard = ({ icon, title, value, color }) => (                          
        <Card                           
            sx={{                           
                height: '100%',                             
                background: `linear-gradient(135deg, ${color}20, ${color}10)`,                          
                border: `1px solid ${color}30`,                             
                borderRadius: 3,                            
                transition: 'all 0.3s ease',                            
                '&:hover': {                            
                    transform: 'translateY(-8px)',                          
                    boxShadow: `0 12px 30px ${color}40`,                            
                }                           
            }}                          
        >                           
            <CardContent sx={{ p: 3, textAlign: 'center' }}>                            
                <Box                            
                    sx={{                           
                        display: 'inline-flex',                             
                        alignItems: 'center',                           
                        justifyContent: 'center',                           
                        width: 60,                          
                        height: 60,                             
                        borderRadius: '50%',                            
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,                            
                        mb: 2,                          
                        color: 'white',                             
                        fontSize: '1.5rem'                          
                    }}                          
                >                           
                    {icon}                          
                </Box>                          
                <Typography                             
                    variant="h4"                            
                    sx={{                           
                        fontWeight: 700,                            
                        color: color,                           
                        mb: 1                           
                    }}                          
                >                           
                    {typeof value === 'number' ? (                          
                        <CountUp end={value} duration={2.5} />                          
                    ) : (                           
                        value                           
                    )}                          
                </Typography>                           
                <Typography                             
                    variant="body1"                             
                    color="text.secondary"                          
                    sx={{ fontWeight: 500 }}                            
                >                           
                    {title}                             
                </Typography>                           
            </CardContent>                          
        </Card>                             
    );                          
                            
    // Chart Card Component                             
    const ChartCard = ({ title, children, sx }) => (                            
        <Card                           
            sx={{                           
                height: '100%',                             
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',                            
                border: '1px solid rgba(0,0,0,0.05)',                           
                borderRadius: 3,                            
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',                            
                ...sx                           
            }}                          
        >                           
            <CardContent sx={{ p: 0, height: '100%' }}>                             
                <Box                            
                    sx={{                           
                        p: 3,                           
                        borderBottom: '1px solid rgba(0,0,0,0.05)',                             
                        background: 'linear-gradient(135deg, #1976d2, #1565c0)',                            
                        color: 'white',                             
                        borderRadius: '12px 12px 0 0'                           
                    }}                          
                >                           
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>                          
                        {title}                             
                    </Typography>                           
                </Box>                          
                <Box sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>                            
                    {children}                          
                </Box>                          
            </CardContent>                          
        </Card>                             
    );                          
                            
    return (                            
        <>                          
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>                             
                {/* Welcome Section */}                             
                <Box sx={{ mb: 4 }}>                            
                    <Typography                             
                        variant="h4"                            
                        sx={{                           
                            fontWeight: 700,                            
                            background: 'linear-gradient(45deg, #1976d2, #00bcd4)',                             
                            WebkitBackgroundClip: 'text',                           
                            WebkitTextFillColor: 'transparent',                             
                            mb: 1                           
                        }}                          
                    >                           
                        Welcome back, {currentUser?.name || 'Student'}!                             
                    </Typography>                           
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>                             
                        Here's your academic overview for today                             
                    </Typography>                           
                    <Stack direction="row" spacing={2}>                             
                        <Chip                           
                            icon={<Person />}                           
                            label={`Class: ${currentUser?.sclassName?.sclassName || 'N/A'}`}                            
                            variant="outlined"                          
                            sx={{ borderColor: '#1976d2', color: '#1976d2' }}                           
                        />                          
                        <Chip                           
                            label={`Roll No: ${currentUser?.rollNum || 'N/A'}`}                             
                            variant="outlined"                          
                            sx={{ borderColor: '#2e7d32', color: '#2e7d32' }}                           
                        />                          
                    </Stack>                            
                </Box>                          
                                                
                <Grid container spacing={3}>                            
                    {/* Stats Cards */}                             
                    {studentStats.map((stat, index) => (                            
                        <Grid item xs={12} sm={6} md={3} key={index}>                           
                            <StatsCard                              
                                icon={stat.icon}                            
                                title={stat.label}                          
                                value={stat.value}                          
                                color={stat.color}                          
                            />                          
                        </Grid>                             
                    ))}                             
                            
                    {/* Attendance Chart */}                            
                    <Grid item xs={12} md={8} lg={9}>                           
                        <ChartCard title="Attendance Overview" sx={{ minHeight: 400 }}>                             
                            {loading ? (                            
                                <Box sx={{ textAlign: 'center', py: 4 }}>                           
                                    <LinearProgress sx={{ mb: 2, width: '50%', mx: 'auto' }} />                             
                                    <Typography variant="h6">Loading Attendance...</Typography>                             
                                </Box>                          
                            ) : response ? (                            
                                <Typography variant="h6" color="text.secondary">                            
                                    No Attendance Data Available                            
                                </Typography>                           
                            ) : attendanceData.length > 0 ? (                           
                                <Box sx={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                          
                                    <CustomPieChart data={attendanceData} />                            
                                </Box>                          
                            ) : (                           
                                <Typography variant="h6" color="text.secondary">                            
                                    No Attendance Records Found                             
                                </Typography>                           
                            )}                          
                        </ChartCard>                            
                    </Grid>                             
                                                    
                    {/* Quick Stats */}                             
                    <Grid item xs={12} md={4} lg={3}>                           
                        <ChartCard title="Quick Stats">                             
                            <Stack spacing={2}>                             
                                <Box sx={{ textAlign: 'center', p: 2 }}>                            
                                    <Typography variant="h4" color="#1976d2" fontWeight={700}>                          
                                        85%                             
                                    </Typography>                           
                                    <Typography variant="body2" color="text.secondary">                             
                                        Average Grade                           
                                    </Typography>                           
                                </Box>                          
                                <Box sx={{ textAlign: 'center', p: 2 }}>                            
                                    <Typography variant="h4" color="#2e7d32" fontWeight={700}>                          
                                        12                          
                                    </Typography>                           
                                    <Typography variant="body2" color="text.secondary">                             
                                        Completed Assignments                           
                                    </Typography>                           
                                </Box>                          
                                <Box sx={{ textAlign: 'center', p: 2 }}>                            
                                    <Typography variant="h4" color="#ed6c02" fontWeight={700}>                          
                                        3                           
                                    </Typography>                           
                                    <Typography variant="body2" color="text.secondary">                             
                                        Pending Tasks                           
                                    </Typography>                           
                                </Box>                          
                            </Stack>                            
                        </ChartCard>                            
                    </Grid>                             
                                                    
                    {/* Recent Notices */}                          
                    <Grid item xs={12}>                             
                        <ChartCard title="Recent Notices" sx={{ minHeight: 400 }}>                          
                            <SeeNotice />                           
                        </ChartCard>                            
                    </Grid>                             
                </Grid>                             
            </Container>                            
        </>                             
    );                          
}                           
                            
export default StudentHomePage;                             