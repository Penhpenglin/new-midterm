import React, { useEffect, useState } from 'react'
import { 
    KeyboardArrowDown, 
    KeyboardArrowUp,
    ExpandMore,
    ExpandLess
} from '@mui/icons-material';
import { 
    BottomNavigation, 
    BottomNavigationAction, 
    Box, 
    Button, 
    Collapse, 
    Paper, 
    Table, 
    TableBody, 
    TableHead, 
    Typography,
    Card,
    CardContent,
    Grid,
    Chip,
    CircularProgress,
    Container,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const getAttendanceColor = (percentage) => {
        if (percentage >= 75) return '#4caf50';
        if (percentage >= 60) return '#ff9800';
        return '#f44336';
    };

    const getAttendanceStatus = (percentage) => {
        if (percentage >= 75) return 'Excellent';
        if (percentage >= 60) return 'Good';
        if (percentage >= 40) return 'Needs Improvement';
        return 'Poor';
    };

    const renderTableSection = () => {
        return (
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3
                    }}
                >
                    Attendance Overview
                </Typography>

                {/* Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(23, 158, 75, 0.3)'
                        }}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <CalendarTodayIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Overall Attendance
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {overallAttendancePercentage.toFixed(1)}%
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            background: 'linear-gradient(135deg, #2196f3, #1976d2)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)'
                        }}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <SchoolIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Total Subjects
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {Object.keys(attendanceBySubject).length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)'
                        }}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Attendance Status
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {getAttendanceStatus(overallAttendancePercentage)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Paper 
                    elevation={0}
                    sx={{ 
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid rgba(23, 158, 75, 0.2)',
                        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)'
                    }}
                >
                    <Table>
                        <TableHead>
                            <StyledTableRow sx={{ background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)' }}>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Subject
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Attended
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Total Sessions
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Attendance %
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }} align="center">
                                    Status
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }} align="center">
                                    Details
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            const attendanceColor = getAttendanceColor(subjectAttendancePercentage);
                            const attendanceStatus = getAttendanceStatus(subjectAttendancePercentage);

                            return (
                                <TableBody key={index}>
                                    <StyledTableRow sx={{ 
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(23, 158, 75, 0.05)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}>
                                        <StyledTableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SchoolIcon sx={{ mr: 2, color: '#179e4bff' }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {subName}
                                                </Typography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#179e4bff' }}>
                                                {present}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {sessions}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 700,
                                                    color: attendanceColor
                                                }}
                                            >
                                                {subjectAttendancePercentage}%
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Chip 
                                                label={attendanceStatus}
                                                sx={{ 
                                                    background: attendanceColor,
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    minWidth: 120
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button 
                                                variant="outlined"
                                                onClick={() => handleOpen(subId)}
                                                startIcon={openStates[subId] ? <ExpandLess /> : <ExpandMore />}
                                                sx={{
                                                    borderColor: '#179e4bff',
                                                    color: '#179e4bff',
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        background: 'rgba(23, 158, 75, 0.1)',
                                                        borderColor: '#179e4bff'
                                                    }
                                                }}
                                            >
                                                {openStates[subId] ? 'Hide' : 'Show'} Details
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 2, p: 2, background: 'rgba(23, 158, 75, 0.02)', borderRadius: 2 }}>
                                                    <Typography variant="h6" gutterBottom sx={{ color: '#179e4bff', fontWeight: 600 }}>
                                                        📅 Attendance Details - {subName}
                                                    </Typography>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell sx={{ fontWeight: 600 }}>Date</StyledTableCell>
                                                                <StyledTableCell sx={{ fontWeight: 600 }} align="center">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                const isPresent = data.status.toLowerCase() === 'present';
                                                                
                                                                return (
                                                                    <StyledTableRow key={index}>
                                                                        <StyledTableCell>
                                                                            <Typography variant="body2">
                                                                                {dateString}
                                                                            </Typography>
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="center">
                                                                            <Chip 
                                                                                label={data.status}
                                                                                color={isPresent ? 'success' : 'error'}
                                                                                size="small"
                                                                                variant="outlined"
                                                                            />
                                                                        </StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            )
                        })}
                    </Table>
                </Paper>
            </Box>
        )
    }

    const renderChartSection = () => {
        return (
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3
                    }}
                >
                    Attendance Analytics
                </Typography>
                <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
            </Box>
        )
    };

    const renderNoAttendance = () => {
        return (
            <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <CalendarTodayIcon 
                        sx={{ 
                            fontSize: 80, 
                            color: '#ccc',
                            mb: 2
                        }} 
                    />
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            color: '#666',
                            fontWeight: 600,
                            mb: 2
                        }}
                    >
                        No Attendance Records Found
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: '#999',
                            mb: 4
                        }}
                    >
                        Your attendance records will appear here once your teachers start marking attendance.
                    </Typography>
                </Box>
            </Container>
        )
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress 
                        size={60} 
                        sx={{ 
                            color: '#179e4bff'
                        }} 
                    />
                </Box>
            ) : (
                <Box sx={{ pb: 8 }}>
                    {response && (
                        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                            {response}
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper 
                                sx={{ 
                                    position: 'fixed', 
                                    bottom: 0, 
                                    left: 0, 
                                    right: 0,
                                    borderRadius: '16px 16px 0 0',
                                    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(23, 158, 75, 0.1)',
                                    borderBottom: 'none'
                                }} 
                                elevation={3}
                            >
                                <BottomNavigation 
                                    value={selectedSection} 
                                    onChange={handleSectionChange} 
                                    showLabels
                                    sx={{
                                        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                                        '& .MuiBottomNavigationAction-root': {
                                            color: '#666',
                                            '&.Mui-selected': {
                                                color: '#179e4bff',
                                            }
                                        }
                                    }}
                                >
                                    <BottomNavigationAction
                                        label="Attendance Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? 
                                            <TableChartIcon sx={{ fontSize: 28 }} /> : 
                                            <TableChartOutlinedIcon sx={{ fontSize: 28 }} />
                                        }
                                    />
                                    <BottomNavigationAction
                                        label="Analytics Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? 
                                            <InsertChartIcon sx={{ fontSize: 28 }} /> : 
                                            <InsertChartOutlinedIcon sx={{ fontSize: 28 }} />
                                        }
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>
                    ) : (
                        renderNoAttendance()
                    )}
                </Box>
            )}
        </>
    )
}

export default ViewStdAttendance