import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser?.teachSclass?._id;
    const subjectID = currentUser?.teachSubject?._id;

    useEffect(() => {
        console.log("🔄 Loading teacher homepage data...");
        console.log("📚 Subject ID:", subjectID);
        console.log("🏫 Class ID:", classID);
        
        if (subjectID) {
            dispatch(getSubjectDetails(subjectID, "Subject"));
        }
        if (classID) {
            dispatch(getClassStudents(classID));
        }
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    console.log("📊 Stats - Students:", numberOfStudents, "Sessions:", numberOfSessions);

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography 
                        variant="h3" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Teacher Dashboard
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Welcome back, {currentUser?.name || 'Teacher'}! Here's your teaching overview.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Students} alt="Students" style={{ width: 60, height: 60 }} />
                            <Title>
                                Class Students
                            </Title>
                            <Data start={0} end={numberOfStudents} duration={2.5} />
                            <Typography variant="body2" color="textSecondary">
                                Enrolled in your class
                            </Typography>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Lessons} alt="Lessons" style={{ width: 60, height: 60 }} />
                            <Title>
                                Total Lessons
                            </Title>
                            <Data start={0} end={numberOfSessions} duration={5} />
                            <Typography variant="body2" color="textSecondary">
                                Teaching sessions
                            </Typography>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Tests} alt="Tests" style={{ width: 60, height: 60 }} />
                            <Title>
                                Tests Taken
                            </Title>
                            <Data start={0} end={24} duration={4} />
                            <Typography variant="body2" color="textSecondary">
                                This semester
                            </Typography>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Time} alt="Time" style={{ width: 60, height: 60 }} />
                            <Title>
                                Total Hours
                            </Title>
                            <Data start={0} end={30} duration={4} suffix="hrs"/>
                            <Typography variant="body2" color="textSecondary">
                                Teaching hours
                            </Typography>
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border: 1px solid rgba(23, 158, 75, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(23, 158, 75, 0.15);
  }
`;

const Title = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 8px 0;
  color: #2d3748;
`;

const Data = styled(CountUp)`
  font-size: calc(1.5rem + .6vw);
  color: #179e4bff;
  font-weight: 700;
`;

export default TeacherHomePage