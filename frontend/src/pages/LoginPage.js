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
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    // Add form state to store input values
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rollNumber: '',
        studentName: ''
    });

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const { rollNumber, studentName, password } = formData;

            if (!rollNumber || !studentName || !password) {
                if (!rollNumber) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum: rollNumber, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }

        else {
            const { email, password } = formData;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        
        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc"

        if (role === "Admin") {
            const email = "yogendra@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Student") {
            const rollNum = "1"
            const studentName = "Dipesh Awasthi"
            const fields = { rollNum, studentName, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Teacher") {
            const email = "tony@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

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
                                    Welcome Back, {role}!
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
                                    Sign in to access your personalized dashboard and continue your educational journey at Setec Institute.
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
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            fontWeight: 700,
                                            color: '#179e4bff',
                                            mb: 1
                                        }}
                                    >
                                        Welcome to Setec Institute
                                    </Typography>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            color: 'text.secondary',
                                            fontWeight: 400
                                        }}
                                    >
                                        {role} please sign in with your account
                                    </Typography>
                                </Box>

                                <Box component="form" noValidate onSubmit={handleSubmit}>
                                    {role === "Student" ? (
                                        <>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="rollNumber"
                                                label="Roll Number"
                                                name="rollNumber"
                                                autoComplete="off"
                                                type="number"
                                                value={formData.rollNumber}
                                                error={rollNumberError}
                                                helperText={rollNumberError && 'Roll Number is required'}
                                                onChange={handleInputChange}
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
                                                id="studentName"
                                                label="Student Name"
                                                name="studentName"
                                                autoComplete="name"
                                                value={formData.studentName}
                                                error={studentNameError}
                                                helperText={studentNameError && 'Name is required'}
                                                onChange={handleInputChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Person sx={{ color: '#179e4bff' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={styles.textField}
                                            />
                                        </>
                                    ) : (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            error={emailError}
                                            helperText={emailError && 'Email is required'}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email sx={{ color: '#179e4bff' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={styles.textField}
                                        />
                                    )}
                                    
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={toggle ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="current-password"
                                        value={formData.password}
                                        error={passwordError}
                                        helperText={passwordError && 'Password is required'}
                                        onChange={handleInputChange}
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

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
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
                                        />
                                        <Link 
                                            to="#" 
                                            style={{ 
                                                color: '#179e4bff', 
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </Box>

                                    {/* Action Buttons */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled={loader}
                                        sx={{
                                            py: 1.5,
                                            mb: 2,
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
                                            "Sign In"
                                        )}
                                    </Button>

                                    <Button
                                        fullWidth
                                        onClick={guestModeHandler}
                                        variant="outlined"
                                        disabled={guestLoader}
                                        sx={{
                                            py: 1.5,
                                            borderColor: 'grey.300',
                                            color: 'text.secondary',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            borderRadius: 2,
                                            '&:hover': {
                                                borderColor: '#179e4bff',
                                                color: '#179e4bff',
                                                backgroundColor: 'rgba(23, 158, 75, 0.04)',
                                            },
                                            '&:disabled': {
                                                borderColor: '#e5e7eb',
                                                color: '#9ca3af',
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {guestLoader ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            "Continue as Guest"
                                        )}
                                    </Button>

                                    {/* Register Link for Admin */}
                                    {role === "Admin" && (
                                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                Don't have an account?{' '}
                                                <Link 
                                                    to="/Adminregister" 
                                                    style={{ 
                                                        color: '#179e4bff', 
                                                        textDecoration: 'none',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Sign up here
                                                </Link>
                                            </Typography>
                                        </Box>
                                    )}
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

export default LoginPage;

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