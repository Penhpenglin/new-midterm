import { Container, Grid, Paper, Box, Typography } from '@mui/material'                                                                                          
import SeeNotice from '../../components/SeeNotice'; 
import Students from "../../assets/img1.png"; 
import Classes from "../../assets/img2.png"; 
import Teachers from "../../assets/img3.png"; 
import Fees from "../../assets/img4.png"; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useEffect, useState } from 'react'; 
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle'; 
import { getAllStudents } from '../../redux/studentRelated/studentHandle'; 
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle'; 
import {  
    People,  
    Class,  
    Person,  
    AttachMoney, 
    TrendingUp  
} from '@mui/icons-material'; 
 
const AdminHomePage = () => { 
    const dispatch = useDispatch(); 
    const { studentsList } = useSelector((state) => state.student); 
    const { sclassesList } = useSelector((state) => state.sclass); 
    const { teachersList } = useSelector((state) => state.teacher); 
    const { currentUser } = useSelector(state => state.user); 
 
    const adminID = currentUser._id; 
    const [isVisible, setIsVisible] = useState(false); 
 
    useEffect(() => { 
        dispatch(getAllStudents(adminID)); 
        dispatch(getAllSclasses(adminID, "Sclass")); 
        dispatch(getAllTeachers(adminID)); 
         
        // Trigger animations after data loads 
        const timer = setTimeout(() => { 
            setIsVisible(true); 
        }, 300); 
         
        return () => clearTimeout(timer); 
    }, [adminID, dispatch]); 
 
    const numberOfStudents = studentsList && studentsList.length; 
    const numberOfClasses = sclassesList && sclassesList.length; 
    const numberOfTeachers = teachersList && teachersList.length; 
 
    const statsData = [ 
        { 
            icon: <People sx={{ fontSize: 40 }} />, 
            title: "Total Students", 
            value: numberOfStudents, 
            color: "#179e4bff", 
            image: Students, 
            duration: 2.5 
        }, 
        { 
            icon: <Class sx={{ fontSize: 40 }} />, 
            title: "Total Classes", 
            value: numberOfClasses, 
            color: "#2196f3", 
            image: Classes, 
            duration: 3 
        }, 
        { 
            icon: <Person sx={{ fontSize: 40 }} />, 
            title: "Total Teachers", 
            value: numberOfTeachers, 
            color: "#ff9800", 
            image: Teachers, 
            duration: 2.5 
        }, 
        { 
            icon: <AttachMoney sx={{ fontSize: 40 }} />, 
            title: "Fees Collection", 
            value: 23000, 
            color: "#f44336", 
            image: Fees, 
            duration: 2, 
            prefix: "$" 
        } 
    ]; 
 
    return ( 
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> 
            {/* Welcome Header */} 
            <Box sx={{ mb: 4, textAlign: 'center' }}> 
                <Typography  
                    variant="h4"  
                    sx={{  
                        fontWeight: 700, 
                        background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent', 
                        mb: 1 
                    }} 
                > 
                    Welcome back, Admin! 
                </Typography> 
                <Typography variant="h6" color="text.secondary"> 
                    Here's what's happening with your institution today 
                </Typography> 
            </Box> 
 
            <Grid container spacing={3}> 
                {statsData.map((stat, index) => ( 
                    <Grid item xs={12} sm={6} md={3} key={index}> 
                        <Paper  
                            sx={{ 
                                padding: '24px', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                height: '160px', 
                                justifyContent: 'space-between', 
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                                borderRadius: '16px', 
                                cursor: 'pointer', 
                                position: 'relative', 
                                overflow: 'hidden', 
                                background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`, 
                                border: `1px solid ${stat.color}20`, 
                                animation: isVisible ?  
                                    `slideUp 0.6s ease-out ${index * 0.1}s both` : 'none', 
                                '&:hover': { 
                                    transform: 'translateY(-8px)', 
                                    boxShadow: `0 12px 30px ${stat.color}30`, 
                                }, 
                                '&::before': { 
                                    content: '""', 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    right: 0, 
                                    height: '4px', 
                                    background: stat.color, 
                                    borderRadius: '16px 16px 0 0', 
                                }, 
                                '@keyframes slideUp': { 
                                    from: { 
                                        opacity: 0, 
                                        transform: 'translateY(30px)', 
                                    }, 
                                    to: { 
                                        opacity: 1, 
                                        transform: 'translateY(0)', 
                                    }, 
                                } 
                            }} 
                        > 
                            {/* Background Pattern */} 
                            <Box 
                                sx={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    right: 0, 
                                    width: '80px', 
                                    height: '80px', 
                                    background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)`, 
                                    borderRadius: '50%', 
                                    transform: 'translate(30px, -30px)', 
                                }} 
                            /> 
                             
                            {/* Content */} 
                            <Box sx={{  
                                display: 'flex',  
                                alignItems: 'center',  
                                justifyContent: 'space-between', 
                                width: '100%', 
                                position: 'relative', 
                                zIndex: 2 
                            }}> 
                                <Box> 
                                    <Typography  
                                        variant="h6"  
                                        sx={{  
                                            color: 'text.secondary', 
                                            fontSize: '0.9rem', 
                                            fontWeight: 600, 
                                            mb: 1 
                                        }} 
                                    > 
                                        {stat.title} 
                                    </Typography> 
                                    <Typography  
                                        variant="h4"  
                                        sx={{  
                                            fontWeight: 700, 
                                            color: stat.color, 
                                            fontSize: '2rem' 
                                        }} 
                                    > 
                                        {stat.prefix || ''} 
                                        <CountUpValue  
                                            end={stat.value}  
                                            duration={stat.duration} 
                                            isVisible={isVisible} 
                                        /> 
                                    </Typography> 
                                </Box> 
                                <Box 
                                    sx={{ 
                                        background: `${stat.color}20`, 
                                        borderRadius: '50%', 
                                        padding: '12px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }} 
                                > 
                                    <Box sx={{ color: stat.color }}> 
                                        {stat.icon} 
                                    </Box> 
                                </Box> 
                            </Box> 
 
                            {/* Trend Indicator */} 
                            <Box  
                                sx={{  
                                    display: 'flex',  
                                    alignItems: 'center',  
                                    mt: 2, 
                                    position: 'relative', 
                                    zIndex: 2 
                                }} 
                            > 
                                <TrendingUp sx={{  
                                    fontSize: 16,  
                                    color: '#4caf50', 
                                    mr: 0.5  
                                }} /> 
                                <Typography  
                                    variant="body2"  
                                    sx={{  
                                        color: '#4caf50', 
                                        fontWeight: 600, 
                                        fontSize: '0.8rem' 
                                    }} 
                                > 
                                    +12% this month 
                                </Typography> 
                            </Box> 
                        </Paper> 
                    </Grid> 
                ))} 
                 
                {/* Notices Section */} 
                <Grid item xs={12}> 
                    <Paper  
                        sx={{  
                            p: 3,  
                            display: 'flex',  
                            flexDirection: 'column', 
                            animation: isVisible ? 'fadeIn 0.8s ease-out 0.4s both' : 'none', 
                            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)', 
                            border: '1px solid #e0e0e0', 
                            borderRadius: '16px', 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
                            '@keyframes fadeIn': { 
                                from: { 
                                    opacity: 0, 
                                }, 
                                to: { 
                                    opacity: 1, 
                                }, 
                            } 
                        }} 
                    > 
                        <Typography  
                            variant="h5"  
                            sx={{  
                                mb: 2,  
                                fontWeight: 600, 
                                color: '#179e4bff' 
                            }} 
                        > 
                            Recent Notices 
                        </Typography> 
                        <SeeNotice /> 
                    </Paper> 
                </Grid> 
            </Grid> 
        </Container> 
    ); 
}; 
 
// CountUp Component with fallback 
const CountUpValue = ({ end, duration, isVisible }) => { 
    const [displayValue, setDisplayValue] = useState(0); 
     
    useEffect(() => { 
        if (isVisible && end > 0) { 
            let start = 0; 
            const increment = end / (duration * 60); // 60fps 
            const timer = setInterval(() => { 
                start += increment; 
                if (start >= end) { 
                    setDisplayValue(end); 
                    clearInterval(timer); 
                } else { 
                    setDisplayValue(Math.floor(start)); 
                } 
            }, 1000 / 60); 
            
            return () => clearInterval(timer); 
        } 
    }, [end, duration, isVisible]); 
     
    if (!isVisible) { 
        return <span>0</span>; 
    } 
     
    return <span>{Math.floor(displayValue)}</span>; 
}; 
 
export default AdminHomePage; 