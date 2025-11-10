import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { 
    BottomNavigation, 
    BottomNavigationAction, 
    Container, 
    Paper, 
    Table, 
    TableBody, 
    TableHead, 
    Typography,
    Box,
    Card,
    CardContent,
    Grid,
    CircularProgress,
    Chip,
    Alert
} from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const calculateAverage = () => {
        if (!subjectMarks || subjectMarks.length === 0) return 0;
        const total = subjectMarks.reduce((sum, result) => {
            return sum + (parseInt(result.marksObtained) || 0);
        }, 0);
        return (total / subjectMarks.length).toFixed(1);
    };

    const getGrade = (marks) => {
        if (marks >= 90) return { grade: 'A+', color: '#4caf50' };
        if (marks >= 80) return { grade: 'A', color: '#8bc34a' };
        if (marks >= 70) return { grade: 'B+', color: '#cddc39' };
        if (marks >= 60) return { grade: 'B', color: '#ffeb3b' };
        if (marks >= 50) return { grade: 'C', color: '#ffc107' };
        if (marks >= 40) return { grade: 'D', color: '#ff9800' };
        return { grade: 'F', color: '#f44336' };
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
                    Subject Performance
                </Typography>
                
                {/* Performance Summary */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ 
                            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                            color: 'white',
                            borderRadius: 3,
                            boxShadow: '0 8px 32px rgba(23, 158, 75, 0.3)'
                        }}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <SchoolIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Total Subjects
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {subjectMarks.length}
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
                                <AnalyticsIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Average Marks
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {calculateAverage()}%
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
                                <SubjectIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Highest Score
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                    {Math.max(...subjectMarks.map(result => parseInt(result.marksObtained) || 0))}%
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
                                    Marks Obtained
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Grade
                                </StyledTableCell>
                                <StyledTableCell sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                                    Status
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                const marks = parseInt(result.marksObtained);
                                const gradeInfo = getGrade(marks);
                                const isPass = marks >= 40;
                                
                                return (
                                    <StyledTableRow 
                                        key={index}
                                        sx={{ 
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(23, 158, 75, 0.05)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }
                                        }}
                                    >
                                        <StyledTableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <SubjectIcon sx={{ mr: 2, color: '#179e4bff' }} />
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {result.subName.subName}
                                                </Typography>
                                            </Box>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 700,
                                                    color: marks >= 40 ? '#179e4bff' : '#f44336'
                                                }}
                                            >
                                                {result.marksObtained}%
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Chip 
                                                label={gradeInfo.grade}
                                                sx={{ 
                                                    background: gradeInfo.color,
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Chip 
                                                label={isPass ? 'Pass' : 'Fail'}
                                                color={isPass ? 'success' : 'error'}
                                                variant="outlined"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        );
    };

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
                    Performance Analytics
                </Typography>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </Box>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <SchoolIcon 
                        sx={{ 
                            fontSize: 60, 
                            color: '#179e4bff',
                            mb: 2,
                            filter: 'drop-shadow(0 0 12px rgba(23, 158, 75, 0.3))'
                        }} 
                    />
                    <Typography 
                        variant="h4" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Class Information
                    </Typography>
                </Box>

                <Card 
                    sx={{ 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                        border: '1px solid rgba(23, 158, 75, 0.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        p: 4
                    }}
                >
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            color: '#179e4bff',
                            fontWeight: 600,
                            mb: 3
                        }}
                    >
                        📚 Class: {sclassDetails && sclassDetails.sclassName}
                    </Typography>
                    
                    <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                            color: '#666',
                            mb: 3
                        }}
                    >
                        Your enrolled subjects:
                    </Typography>
                    
                    <Grid container spacing={2}>
                        {subjectsList && subjectsList.map((subject, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card 
                                    sx={{ 
                                        p: 2,
                                        borderRadius: 2,
                                        background: 'rgba(23, 158, 75, 0.05)',
                                        border: '1px solid rgba(23, 158, 75, 0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 6px 20px rgba(23, 158, 75, 0.15)'
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <SubjectIcon sx={{ mr: 2, color: '#179e4bff' }} />
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                {subject.subName}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                Code: {subject.subCode}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Container>
        );
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

                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
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
                                        label="Performance Table"
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
                        renderClassDetailsSection()
                    )}
                </Box>
            )}
        </>
    );
};

export default StudentSubjects;