import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { 
    Box, 
    Button, 
    Collapse, 
    Table, 
    TableBody, 
    TableHead, 
    Typography,
    Container,
    Paper,
    Alert,
    CircularProgress
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        console.log("🔄 Fetching student details for:", studentID);
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log("Response:", response) }
    else if (error) { console.log("Error:", error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            console.log("📊 User Details:", userDetails);
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || []);
            setSubjectAttendance(userDetails.attendance || []);
            
            console.log("📅 Attendance Data:", userDetails.attendance);
            console.log("📝 Marks Data:", userDetails.examResult);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress size={60} sx={{ color: '#179e4bff' }} />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Loading student data...
                    </Typography>
                </Box>
            ) : (
                <Box>
                    {/* Student Basic Info */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#179e4bff' }}>
                            Student Information
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                            <Typography variant="body1">
                                <strong>Name:</strong> {userDetails?.name || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Roll Number:</strong> {userDetails?.rollNum || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Class:</strong> {sclassName?.sclassName || 'N/A'}
                            </Typography>
                            <Typography variant="body1">
                                <strong>School:</strong> {studentSchool?.schoolName || 'N/A'}
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Attendance Section */}
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            Attendance Records
                        </Typography>
                        
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    if (subName === teachSubject) {
                                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                        return (
                                            <Box key={index} sx={{ mb: 3 }}>
                                                <Table>
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Subject</StyledTableCell>
                                                            <StyledTableCell>Present</StyledTableCell>
                                                            <StyledTableCell>Total Sessions</StyledTableCell>
                                                            <StyledTableCell>Attendance Percentage</StyledTableCell>
                                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        <StyledTableRow>
                                                            <StyledTableCell>{subName}</StyledTableCell>
                                                            <StyledTableCell>{present}</StyledTableCell>
                                                            <StyledTableCell>{sessions}</StyledTableCell>
                                                            <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Button 
                                                                    variant="contained" 
                                                                    onClick={() => handleOpen(subId)}
                                                                    startIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                >
                                                                    Details
                                                                </Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        <StyledTableRow>
                                                            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                    <Box sx={{ margin: 1 }}>
                                                                        <Typography variant="h6" gutterBottom component="div">
                                                                            Attendance Details
                                                                        </Typography>
                                                                        <Table size="small" aria-label="purchases">
                                                                            <TableHead>
                                                                                <StyledTableRow>
                                                                                    <StyledTableCell>Date</StyledTableCell>
                                                                                    <StyledTableCell align="right">Status</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {allData.map((data, index) => {
                                                                                    const date = new Date(data.date);
                                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                                    return (
                                                                                        <StyledTableRow key={index}>
                                                                                            <StyledTableCell component="th" scope="row">
                                                                                                {dateString}
                                                                                            </StyledTableCell>
                                                                                            <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                        </StyledTableRow>
                                                                                    );
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </Box>
                                                                </Collapse>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                                
                                <Box sx={{ mt: 3, p: 2, background: '#f5f5f5', borderRadius: 2 }}>
                                    <Typography variant="h6">
                                        Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                                    </Typography>
                                </Box>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                    <CustomPieChart data={chartData} />
                                </Box>
                            </>
                        ) : (
                            <Alert severity="info">
                                No attendance records found for this student.
                            </Alert>
                        )}

                        <Box sx={{ mt: 3 }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (!teachSubjectID) {
                                        alert("❌ Cannot mark attendance: Subject ID is missing.");
                                        return;
                                    }
                                    navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`);
                                }}
                                sx={{ mr: 2 }}
                            >
                                Add Attendance
                            </Button>
                        </Box>
                    </Paper>

                    {/* Marks Section */}
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            Subject Marks
                        </Typography>

                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                            <>
                                {subjectMarks.map((result, index) => {
                                    if (result.subName?.subName === teachSubject) {
                                        return (
                                            <Table key={index} sx={{ mb: 2 }}>
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell>Subject</StyledTableCell>
                                                        <StyledTableCell>Marks Obtained</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <StyledTableRow>
                                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                        <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                    </StyledTableRow>
                                                </TableBody>
                                            </Table>
                                        )
                                    }
                                    return null;
                                })}
                            </>
                        ) : (
                            <Alert severity="info">
                                No marks records found for this student.
                            </Alert>
                        )}

                        <Box sx={{ mt: 3 }}>
                            <PurpleButton 
                                variant="contained"
                                onClick={() => {
                                    if (!teachSubjectID) {
                                        alert("❌ Cannot add marks: Subject ID is missing.");
                                        return;
                                    }
                                    navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`);
                                }}
                            >
                                Add Marks
                            </PurpleButton>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Container>
    )
}

export default TeacherViewStudent;