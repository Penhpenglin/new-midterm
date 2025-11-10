import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Typography,
    Box,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material';

const TeacherDebug = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { sclassStudents, loading, error } = useSelector((state) => state.sclass);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#179e4bff' }}>
                Teacher Debug Information
            </Typography>

            {/* Current User Info */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" gutterBottom>Current Teacher Information</Typography>
                <Box sx={{ display: 'grid', gap: 1 }}>
                    <Typography><strong>Name:</strong> {currentUser?.name}</Typography>
                    <Typography><strong>Email:</strong> {currentUser?.email}</Typography>
                    <Typography><strong>Teacher ID:</strong> {currentUser?._id}</Typography>
                    <Typography>
                        <strong>Assigned Class:</strong> 
                        {currentUser?.teachSclass ? (
                            <Chip label={currentUser.teachSclass.sclassName} color="primary" sx={{ ml: 1 }} />
                        ) : (
                            <Chip label="NOT ASSIGNED" color="error" sx={{ ml: 1 }} />
                        )}
                    </Typography>
                    <Typography>
                        <strong>Assigned Subject:</strong> 
                        {currentUser?.teachSubject ? (
                            <Chip label={currentUser.teachSubject.subName} color="secondary" sx={{ ml: 1 }} />
                        ) : (
                            <Chip label="NOT ASSIGNED" color="error" sx={{ ml: 1 }} />
                        )}
                    </Typography>
                    <Typography><strong>Class ID:</strong> {currentUser?.teachSclass?._id || 'NULL'}</Typography>
                    <Typography><strong>Subject ID:</strong> {currentUser?.teachSubject?._id || 'NULL'}</Typography>
                </Box>
            </Paper>

            {/* Students Information */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" gutterBottom>Students Information</Typography>
                <Typography><strong>Total Students:</strong> {Array.isArray(sclassStudents) ? sclassStudents.length : 0}</Typography>
                <Typography><strong>Loading:</strong> {loading ? 'YES' : 'NO'}</Typography>
                <Typography><strong>Error:</strong> {error || 'NONE'}</Typography>

                {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                    <TableContainer sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Student Name</strong></TableCell>
                                    <TableCell><strong>Roll Number</strong></TableCell>
                                    <TableCell><strong>Student ID</strong></TableCell>
                                    <TableCell><strong>Actions Available</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sclassStudents.map((student) => (
                                    <TableRow key={student._id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.rollNum}</TableCell>
                                        <TableCell>{student._id}</TableCell>
                                        <TableCell>
                                            {currentUser?.teachSubject?._id ? (
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Chip 
                                                        label="Add Attendance" 
                                                        size="small" 
                                                        color="primary"
                                                        onClick={() => {
                                                            console.log('Attendance Route:', `/Teacher/class/student/attendance/${student._id}/${currentUser.teachSubject._id}`);
                                                            window.location.href = `/Teacher/class/student/attendance/${student._id}/${currentUser.teachSubject._id}`;
                                                        }}
                                                    />
                                                    <Chip 
                                                        label="Add Marks" 
                                                        size="small" 
                                                        color="secondary"
                                                        onClick={() => {
                                                            console.log('Marks Route:', `/Teacher/class/student/marks/${student._id}/${currentUser.teachSubject._id}`);
                                                            window.location.href = `/Teacher/class/student/marks/${student._id}/${currentUser.teachSubject._id}`;
                                                        }}
                                                    />
                                                </Box>
                                            ) : (
                                                <Chip label="NO SUBJECT ASSIGNED" color="error" size="small" />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* Quick Test Links */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>Quick Test Links</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Array.isArray(sclassStudents) && sclassStudents.length > 0 && currentUser?.teachSubject?._id && (
                        <>
                            <Alert severity="info">
                                Test the first student in the list:
                            </Alert>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Chip 
                                    label={`Test Attendance for ${sclassStudents[0].name}`}
                                    color="primary"
                                    variant="outlined"
                                    clickable
                                    onClick={() => {
                                        const route = `/Teacher/class/student/attendance/${sclassStudents[0]._id}/${currentUser.teachSubject._id}`;
                                        console.log('Testing route:', route);
                                        window.location.href = route;
                                    }}
                                />
                                <Chip 
                                    label={`Test Marks for ${sclassStudents[0].name}`}
                                    color="secondary"
                                    variant="outlined"
                                    clickable
                                    onClick={() => {
                                        const route = `/Teacher/class/student/marks/${sclassStudents[0]._id}/${currentUser.teachSubject._id}`;
                                        console.log('Testing route:', route);
                                        window.location.href = route;
                                    }}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default TeacherDebug;