import { useEffect } from "react";                                                                                                                                                                                                                                      
import * as React from 'react';                             
import { useDispatch, useSelector } from 'react-redux';                                 
import { useNavigate } from 'react-router-dom'                              
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";                              
import {                                
    Paper,                              
    Box,                                
    Typography,                                 
    Button,                             
    Card,                               
    CardContent,                                
    Grid,                               
    Chip,                               
    CircularProgress,                               
    Container,                              
    Alert,                              
    Snackbar                                
} from '@mui/material';                             
import { BlueButton, GreenButton } from "../../components/buttonStyles";                                
import TableTemplate from "../../components/TableTemplate";                             
import {                                
    People,                             
    School,                             
    Assignment,                             
    CalendarToday,                              
    Visibility                              
} from "@mui/icons-material";                               
                                
const TeacherClassDetails = () => {                             
    const navigate = useNavigate()                              
    const dispatch = useDispatch();                             
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);                               
    const { currentUser } = useSelector((state) => state.user);                             
                                
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });                             
                                
    const showSnackbar = (message, severity = 'info') => {                              
        setSnackbar({ open: true, message, severity });                             
    };                              
                                
    const classID = currentUser?.teachSclass?._id;                              
    const subjectID = currentUser?.teachSubject?._id;                               
                                
    useEffect(() => {                               
        console.log('=== TEACHER CLASS DETAILS DEBUG ===');                             
        console.log('Current User:', currentUser);                              
        console.log('Class ID:', classID);                              
        console.log('Subject ID:', subjectID);                              
        console.log('Students Data:', sclassStudents);                              
        console.log('==============================');                              
    }, [currentUser, classID, subjectID, sclassStudents]);                              
                                
    useEffect(() => {                               
        if (!classID) {                             
            console.error("❌ Class ID is undefined - teacher might not be assigned to a class");                               
            showSnackbar('Teacher is not assigned to any class. Please contact administrator.', 'warning');                             
            return;                             
        }                               
        if (!subjectID) {                               
            console.error("❌ Subject ID is undefined - teacher might not be assigned to a subject");                               
            showSnackbar('Teacher is not assigned to any subject. Please contact administrator.', 'warning');                               
            return;                             
        }                               
                                        
        console.log("🔄 Fetching students for class:", classID);                                
        dispatch(getClassStudents(classID));                                
    }, [dispatch, classID, subjectID]);                             
                                
    if (error) {                                
        return (                                
            <Container maxWidth="md" sx={{ mt: 4 }}>                                
                <Alert severity="error">                                
                    <Typography variant="h6" gutterBottom>                              
                        Error Loading Class Data                                
                    </Typography>                               
                    <Typography variant="body2">                                
                        {error.message || "Unable to load student information."}                                
                    </Typography>                               
                </Alert>                                
            </Container>                                
        );                              
    }                               
                                
    if (loading) {                              
        return (                                
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>                             
                <CircularProgress size={60} sx={{ color: '#179e4bff', mb: 2 }} />                               
                <Typography variant="h6" color="textSecondary">                             
                    Loading students data...                                
                </Typography>                               
            </Box>                              
        );                              
    }                               
                                
    const studentColumns = [                                
        { id: 'name', label: 'Student Name', minWidth: 200 },                               
        { id: 'rollNum', label: 'Roll Number', minWidth: 120 },                             
        { id: 'actions', label: 'Actions', minWidth: 400, align: 'center' },                                
    ];                              
                                
    const studentRows = Array.isArray(sclassStudents)                               
        ? sclassStudents.map((student) => ({                                
            name: student.name || 'Unknown',                                
            rollNum: student.rollNum || 'N/A',                              
            id: student._id,                                
        }))                             
        : [];                               
                                    
    const StudentsButtonHaver = ({ row }) => {                              
        const handleAttendance = () => {                                
            console.log('🎯 Attempting to add attendance for:', {                               
                studentId: row.id,                              
                studentName: row.name,                              
                subjectId: subjectID,                               
                subjectName: currentUser?.teachSubject?.subName                             
            });                             
                                        
            if (!subjectID) {                               
                showSnackbar('Cannot mark attendance: No subject assigned to teacher.', 'error');                               
                return;                             
            }                               
            if (!row.id) {                              
                showSnackbar('Cannot mark attendance: Student ID is missing.', 'error');                                
                return;                             
            }                               
                                        
            const attendanceRoute = `/Teacher/class/student/attendance/${row.id}/${subjectID}`;                             
            console.log('📍 Navigating to:', attendanceRoute);                              
            navigate(attendanceRoute);                              
        };                              
                                    
        const handleMarks = () => {                             
            console.log('📊 Attempting to add marks for:', {                                
                studentId: row.id,                              
                subjectId: subjectID                                
            });                             
                                        
            if (!subjectID) {                               
                showSnackbar('Cannot add marks: No subject assigned to teacher.', 'error');                             
                return;                             
            }                               
                                        
            const marksRoute = `/Teacher/class/student/marks/${row.id}/${subjectID}`;                               
            console.log('📍 Navigating to:', marksRoute);                               
            navigate(marksRoute);                               
        };                              
                                    
        const handleViewStudent = () => {                               
            console.log('👀 Viewing student:', row.id);                             
            navigate(`/Teacher/class/student/${row.id}`);                               
        };                              
                                    
        return (                                
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>                                
                {/* View Student Button */}                             
                <BlueButton                             
                    variant="contained"                             
                    startIcon={<Visibility />}                              
                    onClick={handleViewStudent}                             
                    sx={{                               
                        borderRadius: 2,                                
                        textTransform: 'none',                              
                        fontWeight: 600,                                
                        px: 2,                              
                        minWidth: '100px'                               
                    }}                              
                >                               
                    View                                
                </BlueButton>                               
                                                
                {/* Attendance Button */}                               
                <GreenButton                                
                    variant="contained"                             
                    startIcon={<CalendarToday />}                               
                    onClick={handleAttendance}                              
                    disabled={!subjectID}                               
                    sx={{                               
                        borderRadius: 2,                                
                        textTransform: 'none',                              
                        fontWeight: 600,                                
                        px: 2,                              
                        minWidth: '140px',                              
                        background: subjectID                               
                            ? 'linear-gradient(135deg, #179e4bff, #0d8b3aff)'                               
                            : '#ccc',                               
                        '&:hover': subjectID ? {                                
                            background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)',                                
                        } : {},                             
                        '&.Mui-disabled': {                             
                            background: '#ccc',                             
                            color: '#666'                               
                        }                               
                    }}                              
                >                               
                    Attendance                              
                </GreenButton>                              
                                                
                {/* Marks Button */}                                
                <Button                             
                    variant="contained"                             
                    startIcon={<Assignment />}                              
                    onClick={handleMarks}                               
                    disabled={!subjectID}                               
                    sx={{                               
                        borderRadius: 2,                                
                        textTransform: 'none',                              
                        fontWeight: 600,                                
                        px: 2,                              
                        minWidth: '120px',                              
                        background: subjectID                               
                            ? 'linear-gradient(135deg, #ff9800, #f57c00)'                               
                            : '#ccc',                               
                        '&:hover': subjectID ? {                                
                            background: 'linear-gradient(135deg, #f57c00, #ff9800)',                                
                        } : {},                             
                        '&.Mui-disabled': {                             
                            background: '#ccc',                             
                            color: '#666'                               
                        }                               
                    }}                              
                >                               
                    Marks                               
                </Button>                               
            </Box>                              
        );                              
    };                              
                                
    return (                                
        <Container maxWidth="xl">                               
            <Snackbar                               
                open={snackbar.open}                                
                autoHideDuration={6000}                             
                onClose={() => setSnackbar({ ...snackbar, open: false })}                               
                message={snackbar.message}                              
            />                              
                                
            {/* Header Section */}                              
            <Box sx={{ mb: 4 }}>                                
                <Typography                                 
                    variant="h3"                                
                    align="center"                              
                    gutterBottom                                
                    sx={{                               
                        fontWeight: 700,                                
                        background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',                             
                        WebkitBackgroundClip: 'text',                               
                        WebkitTextFillColor: 'transparent',                             
                        mb: 2                               
                    }}                              
                >                               
                    Class Management                                
                </Typography>                               
                                                
                {/* Assignment Status */}                               
                {(!classID || !subjectID) && (                              
                    <Alert severity="warning" sx={{ mb: 3 }}>                               
                        <Typography variant="h6" gutterBottom>                              
                            Teacher Assignment Required                             
                        </Typography>                               
                        <Typography variant="body2">                                
                            {!classID && "• Teacher is not assigned to any class\n"}                                
                            {!subjectID && "• Teacher is not assigned to any subject\n"}                                
                            Please contact administrator to complete teacher assignment.                                
                        </Typography>                               
                    </Alert>                                
                )}                              
                                
                {/* Stats Cards */}                             
                <Grid container spacing={3} sx={{ mb: 4 }}>                             
                    <Grid item xs={12} md={4}>                              
                        <Card sx={{                                 
                            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',                                
                            color: 'white',                             
                            borderRadius: 3,                                
                            boxShadow: '0 8px 32px rgba(23, 158, 75, 0.3)'                              
                        }}>                             
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>                                
                                <People sx={{ fontSize: 40, mb: 1 }} />                             
                                <Typography variant="h6">Total Students</Typography>                                
                                <Typography variant="h3" sx={{ fontWeight: 700 }}>                              
                                    {studentRows.length}                                
                                </Typography>                               
                            </CardContent>                              
                        </Card>                             
                    </Grid>                             
                    <Grid item xs={12} md={4}>                              
                        <Card sx={{                                 
                            background: classID                                 
                                ? 'linear-gradient(135deg, #2196f3, #1976d2)'                               
                                : 'linear-gradient(135deg, #ff9800, #f57c00)',                              
                            color: 'white',                             
                            borderRadius: 3,                                
                            boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)'                             
                        }}>                             
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>                                
                                <School sx={{ fontSize: 40, mb: 1 }} />                             
                                <Typography variant="h6">Class</Typography>                             
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>                              
                                    {currentUser.teachSclass?.sclassName || "Not Assigned"}                             
                                </Typography>                               
                                {!classID && (                              
                                    <Chip                               
                                        label="Assignment Required"                                 
                                        size="small"                                
                                        color="warning"                                 
                                        sx={{ mt: 1 }}                              
                                    />                              
                                )}                              
                            </CardContent>                              
                        </Card>                             
                    </Grid>                             
                    <Grid item xs={12} md={4}>                              
                        <Card sx={{                                 
                            background: subjectID                               
                                ? 'linear-gradient(135deg, #ff9800, #f57c00)'                               
                                : 'linear-gradient(135deg, #f44336, #d32f2f)',                              
                            color: 'white',                             
                            borderRadius: 3,                                
                            boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)'                              
                        }}>                             
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>                                
                                <Assignment sx={{ fontSize: 40, mb: 1 }} />                             
                                <Typography variant="h6">Subject</Typography>                               
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>                              
                                    {currentUser.teachSubject?.subName || "Not Assigned"}                               
                                </Typography>                               
                                {!subjectID && (                                
                                    <Chip                               
                                        label="Assignment Required"                                 
                                        size="small"                                
                                        color="error"                               
                                        sx={{ mt: 1 }}                              
                                    />                              
                                )}                              
                            </CardContent>                              
                        </Card>                             
                    </Grid>                             
                </Grid>                             
            </Box>                              
                                                            
            {/* Students Table */}                              
            {getresponse ? (                                
                <Box sx={{                              
                    textAlign: 'center',                                
                    py: 8,                              
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',                                
                    borderRadius: 3,                                
                    border: '2px dashed #ddd'                               
                }}>                             
                    <People sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />                              
                    <Typography variant="h5" color="textSecondary" gutterBottom>                                
                        No Students Found                               
                    </Typography>                               
                    <Typography variant="body1" color="textSecondary">                              
                        There are currently no students enrolled in this class.                             
                    </Typography>                               
                </Box>                              
            ) : (                               
                <Paper                              
                    elevation={0}                               
                    sx={{                               
                        borderRadius: 3,                                
                        overflow: 'hidden',                             
                        border: '1px solid rgba(23, 158, 75, 0.2)',                             
                        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',                                
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'                             
                    }}                              
                >                               
                    <Box sx={{                              
                        p: 3,                               
                        background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',                                
                        color: 'white'                              
                    }}>                             
                        <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>                               
                            <People sx={{ fontSize: 32 }} />                                
                            Students List                               
                        </Typography>                               
                        <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>                               
                            {subjectID                              
                                ? `Manage student attendance and marks for ${currentUser.teachSubject?.subName}`                                
                                : "Assign teacher to a subject to enable attendance and marks features"                             
                            }                               
                        </Typography>                               
                    </Box>                              
                                                        
                    {studentRows.length > 0 ? (                             
                        <TableTemplate                              
                            buttonHaver={StudentsButtonHaver}                               
                            columns={studentColumns}                                
                            rows={studentRows}                              
                        />                              
                    ) : (                               
                        <Box sx={{ p: 4, textAlign: 'center' }}>                                
                            <Typography variant="h6" color="textSecondary">                             
                                No students available in this class.                                
                            </Typography>                               
                        </Box>                              
                    )}                              
                </Paper>                                
            )}                              
        </Container>                                
    );                              
};                              
                                
export default TeacherClassDetails;                             