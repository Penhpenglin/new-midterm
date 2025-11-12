import * as React from 'react';                                                                                                              
import { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import {  
    Grid,  
    Box,  
    Typography,  
    Paper,  
    Checkbox,  
    FormControlLabel,  
    TextField,  
    CssBaseline,  
    IconButton,  
    InputAdornment,  
    CircularProgress, 
    Container, 
    Card, 
    CardContent, 
    Stepper, 
    Step, 
    StepLabel, 
    Button 
} from '@mui/material'; 
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import {  
    Visibility,  
    VisibilityOff,  
    School,  
    Person,  
    Email,  
    Security, 
    ArrowBack, 
    Groups, 
    Class, 
    Assignment, 
    Dashboard 
} from '@mui/icons-material'; 
import { LightPurpleButton } from '../../components/buttonStyles'; 
import { registerUser } from '../../redux/userRelated/userHandle'; 
import Popup from '../../components/Popup'; 
 
const defaultTheme = createTheme(); 
 
const steps = ['Admin Details', 'School Information', 'Complete Setup']; 
 
const AdminRegisterPage = () => { 
    const dispatch = useDispatch() 
    const navigate = useNavigate() 
 
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user); 
    const [toggle, setToggle] = useState(false) 
    const [loader, setLoader] = useState(false) 
    const [showPopup, setShowPopup] = useState(false); 
    const [message, setMessage] = useState(""); 
    const [activeStep, setActiveStep] = useState(0); 
 
    const [formData, setFormData] = useState({ 
        adminName: '', 
        email: '', 
        password: '', 
        schoolName: '' 
    }); 
 
    const [formErrors, setFormErrors] = useState({ 
        adminName: '', 
        email: '', 
        password: '', 
        schoolName: '' 
    }); 
 
    const [touched, setTouched] = useState({ 
        adminName: false, 
        email: false, 
        password: false, 
        schoolName: false 
    }); 
 
    const role = "Admin" 
 
    const validateStep = (step) => { 
        const errors = {}; 
         
        if (step === 0) { 
            if (!formData.adminName?.trim()) errors.adminName = 'Admin name is required'; 
            if (!formData.email?.trim()) errors.email = 'Email is required'; 
            else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'; 
            if (!formData.password) errors.password = 'Password is required'; 
            else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters'; 
        } 
         
        if (step === 1) { 
            if (!formData.schoolName?.trim()) errors.schoolName = 'School name is required'; 
        } 
 
        return errors; 
    }; 
 
    const handleNext = () => { 
        const errors = validateStep(activeStep); 
        if (Object.keys(errors).length === 0) { 
            setActiveStep((prev) => prev + 1); 
        } else { 
            setFormErrors(errors); 
            // Mark all fields in current step as touched 
            const stepFields = activeStep === 0  
                ? ['adminName', 'email', 'password'] 
                : ['schoolName']; 
            setTouched(prev => ({ 
                ...prev, 
                ...stepFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) 
            })); 
        } 
    }; 
 
    const handleBack = () => { 
        setActiveStep((prev) => prev - 1); 
    }; 
 
    const handleSubmit = (event) => { 
        event.preventDefault(); 
         
        const finalErrors = validateStep(0); 
        const step2Errors = validateStep(1); 
        const allErrors = { ...finalErrors, ...step2Errors }; 
         
        if (Object.keys(allErrors).length > 0) { 
            setFormErrors(allErrors); 
            setTouched({ 
                adminName: true, 
                email: true, 
                password: true, 
                schoolName: true 
            }); 
            return; 
        } 
 
        const fields = {  
            name: formData.adminName,  
            email: formData.email,  
            password: formData.password,  
            role,  
            schoolName: formData.schoolName 
        }; 
         
        setLoader(true); 
        dispatch(registerUser(fields, role)); 
    }; 
 
    const handleInputChange = (event) => { 
        const { name, value } = event.target; 
         
        setFormData(prev => ({ ...prev, [name]: value })); 
        setTouched(prev => ({ ...prev, [name]: true })); 
         
        // Clear error when user starts typing 
        if (formErrors[name]) { 
            setFormErrors(prev => ({ ...prev, [name]: '' })); 
        } 
    }; 
 
    const handleBlur = (event) => { 
        const { name, value } = event.target; 
        const errors = validateStep(activeStep); 
        setFormErrors(prev => ({ ...prev, [name]: errors[name] })); 
    }; 
 
    useEffect(() => { 
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) { 
            navigate('/Admin/dashboard'); 
        } 
        else if (status === 'failed') { 
            setMessage(response) 
            setShowPopup(true) 
            setLoader(false) 
        } 
        else if (status === 'error') { 
            setMessage("Network error occurred. Please try again.") 
            setShowPopup(true) 
            setLoader(false) 
        } 
    }, [status, currentUser, currentRole, navigate, error, response]); 
 
    const renderStepContent = (step) => { 
        switch (step) { 
            case 0: 
                return ( 
                    <Box sx={{ mt: 3 }}> 
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#179e4bff', mb: 3 }}> 
                            👤 Admin Information 
                        </Typography> 
                         
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            id="adminName" 
                            label="Full Name" 
                            name="adminName" 
                            value={formData.adminName} 
                            autoComplete="name" 
                            autoFocus 
                            error={touched.adminName && !!formErrors.adminName} 
                            helperText={touched.adminName && formErrors.adminName} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur} 
                            InputProps={{ 
                                startAdornment: ( 
                                    <InputAdornment position="start"> 
                                        <Person sx={{ color: '#179e4bff' }} /> 
                                    </InputAdornment> 
                                ), 
                            }} 
                            sx={styles.textField} 
                        /> 
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            id="email" 
                            label="Email Address" 
                            name="email" 
                            value={formData.email} 
                            autoComplete="email" 
                            error={touched.email && !!formErrors.email} 
                            helperText={touched.email && formErrors.email} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur} 
                            InputProps={{ 
                                startAdornment: ( 
                                    <InputAdornment position="start"> 
                                        <Email sx={{ color: '#179e4bff' }} /> 
                                    </InputAdornment> 
                                ), 
                            }} 
                            sx={styles.textField} 
                        /> 
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            name="password" 
                            label="Password" 
                            type={toggle ? 'text' : 'password'} 
                            id="password" 
                            value={formData.password} 
                            autoComplete="new-password" 
                            error={touched.password && !!formErrors.password} 
                            helperText={touched.password && formErrors.password} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur} 
                            InputProps={{ 
                                startAdornment: ( 
                                    <InputAdornment position="start"> 
                                        <Security sx={{ color: '#179e4bff' }} /> 
                                    </InputAdornment> 
                                ), 
                                endAdornment: ( 
                                    <InputAdornment position="end"> 
                                        <IconButton  
                                            onClick={() => setToggle(!toggle)} 
                                            edge="end" 
                                        > 
                                            {toggle ? <VisibilityOff /> : <Visibility />} 
                                        </IconButton> 
                                    </InputAdornment> 
                                ), 
                            }} 
                            sx={styles.textField} 
                        /> 
 
                        <FormControlLabel 
                            control={ 
                                <Checkbox  
                                    value="remember"  
                                    sx={{  
                                        color: '#179e4bff', 
                                        '&.Mui-checked': { 
                                            color: '#179e4bff', 
                                        }, 
                                    }}  
                                /> 
                            } 
                            label="Remember me" 
                            sx={{ mt: 2 }} 
                        /> 
                    </Box> 
                ); 
             
            case 1: 
                return ( 
                    <Box sx={{ mt: 3 }}> 
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#179e4bff', mb: 3 }}> 
                            🏫 School Information 
                        </Typography> 
                         
                        <TextField 
                            margin="normal" 
                            required 
                            fullWidth 
                            id="schoolName" 
                            label="School Name" 
                            name="schoolName" 
                            value={formData.schoolName} 
                            error={touched.schoolName && !!formErrors.schoolName} 
                            helperText={touched.schoolName && formErrors.schoolName} 
                            onChange={handleInputChange} 
                            onBlur={handleBlur} 
                            InputProps={{ 
                                startAdornment: ( 
                                    <InputAdornment position="start"> 
                                        <School sx={{ color: '#179e4bff' }} /> 
                                    </InputAdornment> 
                                ), 
                            }} 
                            sx={styles.textField} 
                            placeholder="Enter your school name" 
                        /> 
                         
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2, mb: 1 }}> 
                            You'll be able to add more school details like address, phone number, and other information later in your admin  dashboard.
                        </Typography> 
                    </Box> 
                ); 
             
            case 2: 
                return ( 
                    <Box sx={{ mt: 3, textAlign: 'center' }}> 
                        <School  
                            sx={{  
                                fontSize: 80,  
                                color: '#179e4bff', 
                                mb: 3 
                            }}  
                        /> 
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#179e4bff' }}> 
                            🎉 Ready to Get Started! 
                        </Typography> 
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}> 
                            Review your information and complete the registration process. 
                        </Typography> 
                         
                        <Card sx={{ mb: 3, background: 'rgba(23, 158, 75, 0.05)' }}> 
                            <CardContent> 
                                <Typography variant="h6" gutterBottom>Registration Summary</Typography> 
                                <Grid container spacing={2}> 
                                    <Grid item xs={6}> 
                                        <Typography variant="body2" color="text.secondary">Admin Name:</Typography> 
                                        <Typography variant="body1" fontWeight={600}>{formData.adminName}</Typography> 
                                    </Grid> 
                                    <Grid item xs={6}> 
                                        <Typography variant="body2" color="text.secondary">Email:</Typography> 
                                        <Typography variant="body1" fontWeight={600}>{formData.email}</Typography> 
                                    </Grid> 
                                    <Grid item xs={12}> 
                                        <Typography variant="body2" color="text.secondary">School Name:</Typography> 
                                        <Typography variant="body1" fontWeight={600}>{formData.schoolName}</Typography> 
                                    </Grid> 
                                </Grid> 
                            </CardContent> 
                        </Card> 
 
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}> 
                            After registration, you'll be redirected to your admin dashboard where you can start setting up your school. 
                        </Typography> 
                    </Box> 
                ); 
             
            default: 
                return null; 
        } 
    }; 
 
    return ( 
        <ThemeProvider theme={defaultTheme}> 
            <Box sx={{  
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #0c2c1d 0%, #1a4d2e 100%)', 
                position: 'relative', 
                overflow: 'hidden' 
            }}> 
                {/* Background Pattern */} 
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        background: ` 
                            radial-gradient(circle at 20% 80%, rgba(23, 158, 75, 0.1) 0%, transparent 50%), 
                            radial-gradient(circle at 80% 20%, rgba(13, 139, 58, 0.1) 0%, transparent 50%), 
                            radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.05) 0%, transparent 50%) 
                        `, 
                    }} 
                /> 
 
                <CssBaseline /> 
                 
                {/* Back Button */} 
                <IconButton 
                    onClick={() => navigate(-1)} 
                    sx={{ 
                        position: 'absolute', 
                        top: 20, 
                        left: 20, 
                        color: 'white', 
                        zIndex: 10, 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        '&:hover': { 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                        } 
                    }} 
                > 
                    <ArrowBack /> 
                </IconButton> 
 
                <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}> 
                    <Grid container spacing={4} alignItems="center"> 
                        {/* Left Side - Content */} 
                        <Grid item xs={12} md={6}> 
                            <Box sx={{ color: 'white', pr: { md: 4 } }}> 
                                <School  
                                    sx={{  
                                        fontSize: 64,  
                                        color: '#00ff88', 
                                        mb: 3, 
                                        filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.3))' 
                                    }}  
                                /> 
                                <Typography  
                                    variant="h2"  
                                    sx={{  
                                        fontWeight: 800, 
                                        mb: 2, 
                                        background: 'linear-gradient(45deg, #fff, #00ff88)', 
                                        WebkitBackgroundClip: 'text', 
                                        WebkitTextFillColor: 'transparent', 
                                    }} 
                                > 
                                    SETEC Institute 
                                </Typography> 
                                <Typography  
                                    variant="h4"  
                                    sx={{  
                                        fontWeight: 600, 
                                        mb: 3, 
                                        color: 'rgba(255, 255, 255, 0.9)' 
                                    }} 
                                > 
                                    School Management System 
                                </Typography> 
                                <Typography  
                                    variant="h6"  
                                    sx={{  
                                        color: 'rgba(255, 255, 255, 0.8)', 
                                        fontWeight: 300, 
                                        mb: 4, 
                                        lineHeight: 1.6 
                                    }} 
                                > 
                                    Transform your educational institution with our comprehensive management platform.  
                                    Streamline operations, enhance learning experiences, and empower your community. 
                                </Typography> 
 
                                {/* Features Grid */} 
                                <Grid container spacing={2} sx={{ mb: 4 }}> 
                                    {[ 
                                        { icon: <Groups />, text: 'Student Management' }, 
                                        { icon: <Class />, text: 'Class Organization' }, 
                                        { icon: <Assignment />, text: 'Academic Tracking' }, 
                                        { icon: <Dashboard />, text: 'Analytics Dashboard' } 
                                    ].map((feature, index) => ( 
                                        <Grid item xs={6} key={index}> 
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> 
                                                <Box sx={{ color: '#00ff88' }}> 
                                                    {feature.icon} 
                                                </Box> 
                                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}> 
                                                    {feature.text} 
                                                </Typography> 
                                            </Box> 
                                        </Grid> 
                                    ))} 
                                </Grid> 
                            </Box> 
                        </Grid> 
 
                        {/* Right Side - Form */} 
                        <Grid item xs={12} md={6}> 
                            <Paper  
                                elevation={8} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: 4, 
                                    background: 'rgba(255, 255, 255, 0.95)', 
                                    backdropFilter: 'blur(20px)', 
                                    border: '1px solid rgba(255, 255, 255, 0.2)', 
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
                                }} 
                            > 
                                {/* Stepper */} 
                                <Stepper activeStep={activeStep} sx={{ mb: 4 }}> 
                                    {steps.map((label) => ( 
                                        <Step key={label}> 
                                            <StepLabel>{label}</StepLabel> 
                                        </Step> 
                                    ))} 
                                </Stepper> 
 
                                <Box component="form" noValidate onSubmit={activeStep === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>  
                                    {renderStepContent(activeStep)} 
 
                                    {/* Navigation Buttons */} 
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}> 
                                        <Button 
                                            onClick={handleBack} 
                                            disabled={activeStep === 0} 
                                            sx={{ 
                                                color: '#179e4bff', 
                                                fontWeight: 600 
                                            }} 
                                        > 
                                            Back 
                                        </Button> 
                                         
                                        {activeStep === steps.length - 1 ? ( 
                                            <LightPurpleButton 
                                                type="submit" 
                                                variant="contained" 
                                                disabled={loader} 
                                                sx={{ 
                                                    px: 4, 
                                                    py: 1.5, 
                                                    fontSize: '1rem', 
                                                    fontWeight: 600, 
                                                    background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)', 
                                                    borderRadius: 2, 
                                                    boxShadow: '0 4px 15px rgba(23, 158, 75, 0.3)', 
                                                    '&:hover': { 
                                                        background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)', 
                                                        boxShadow: '0 6px 20px rgba(23, 158, 75, 0.4)', 
                                                        transform: 'translateY(-2px)' 
                                                    }, 
                                                    '&:disabled': { 
                                                        background: '#ccc', 
                                                        transform: 'none', 
                                                        boxShadow: 'none' 
                                                    }, 
                                                    transition: 'all 0.3s ease' 
                                                }} 
                                            > 
                                                {loader ? ( 
                                                    <CircularProgress size={24} color="inherit" /> 
                                                ) : ( 
                                                    "Create School Account" 
                                                )} 
                                            </LightPurpleButton> 
                                        ) : ( 
                                            <LightPurpleButton 
                                                type="submit" 
                                                variant="contained" 
                                                sx={{ 
                                                    px: 4, 
                                                    py: 1.5, 
                                                    fontSize: '1rem', 
                                                    fontWeight: 600, 
                                                    background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)', 
                                                    borderRadius: 2, 
                                                    '&:hover': { 
                                                        background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)', 
                                                        transform: 'translateY(-2px)' 
                                                    }, 
                                                    transition: 'all 0.3s ease' 
                                                }} 
                                            > 
                                                Next 
                                            </LightPurpleButton> 
                                        )} 
                                    </Box> 
 
                                    {/* Login Link */} 
                                    <Box sx={{ textAlign: 'center', mt: 3 }}> 
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}> 
                                            Already have an account?{' '} 
                                            <Link  
                                                to="/Adminlogin"  
                                                style={{  
                                                    color: '#179e4bff',  
                                                    textDecoration: 'none', 
                                                    fontWeight: 600 
                                                }} 
                                            > 
                                                Sign in here 
                                            </Link> 
                                        </Typography> 
                                    </Box> 
                                </Box> 
                            </Paper> 
                        </Grid> 
                    </Grid> 
                </Container> 
            </Box> 
 
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> 
        </ThemeProvider> 
    ); 
} 
 
export default AdminRegisterPage; 
 
const styles = { 
    textField: { 
        '& .MuiOutlinedInput-root': { 
            borderRadius: 2, 
            '&:hover fieldset': { 
                borderColor: '#179e4bff', 
            }, 
            '&.Mui-focused fieldset': { 
                borderColor: '#179e4bff', 
                borderWidth: 2, 
            }, 
        }, 
        '& .MuiInputLabel-root.Mui-focused': { 
            color: '#179e4bff', 
        }, 
    } 
}; 