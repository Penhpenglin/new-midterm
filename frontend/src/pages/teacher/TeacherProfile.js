import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Container, 
    Grid, 
    Avatar, 
    Chip,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    CircularProgress
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Person, 
    Email, 
    School, 
    Class, 
    Subject, 
    Edit,
    Security,
    Assignment
} from '@mui/icons-material';
import { updateUser } from '../../redux/userRelated/userHandle';

const TeacherProfile = () => {
    const { currentUser, response, error, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    const [editDialog, setEditDialog] = useState(false);
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [password, setPassword] = useState('');

    const teachSclass = currentUser?.teachSclass || {};
    const teachSubject = currentUser?.teachSubject || {};
    const teachSchool = currentUser?.school || {};

    const handleUpdate = (e) => {
        e.preventDefault();
        const fields = { name, email };
        if (password) {
            fields.password = password;
        }
        dispatch(updateUser(fields, currentUser._id, "Teacher"));
        setEditDialog(false);
        setPassword('');
    };

    const InfoItem = ({ icon, label, value, color = "#179e4bff" }) => (
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            borderRadius: 2, 
            background: 'rgba(23, 158, 75, 0.05)',
            border: `1px solid ${color}20`,
            mb: 2
        }}>
            <Box sx={{ 
                mr: 2,
                color: color,
                display: 'flex',
                alignItems: 'center'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500, fontSize: '0.8rem' }}>
                    {label}
                </Typography>
                <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                    {value || 'Not assigned'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                    Teacher Profile
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Manage your account information and teaching assignments
                </Typography>
            </Box>

            {response && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                    {response}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={4}>
                {/* Profile Information */}
                <Grid item xs={12} md={8}>
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 4, 
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                            border: '1px solid rgba(23, 158, 75, 0.2)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mr: 3,
                                    background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                                    fontSize: '2rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {currentUser?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2d3748' }}>
                                    {currentUser?.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#718096' }}>
                                    Teacher
                                </Typography>
                                <Chip 
                                    label="SETEC Faculty" 
                                    color="primary" 
                                    size="small"
                                    sx={{ 
                                        mt: 1,
                                        background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)'
                                    }}
                                />
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <InfoItem 
                                    icon={<Person sx={{ fontSize: 24 }} />}
                                    label="Full Name"
                                    value={currentUser?.name}
                                    color="#179e4bff"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem 
                                    icon={<Email sx={{ fontSize: 24 }} />}
                                    label="Email Address"
                                    value={currentUser?.email}
                                    color="#2196f3"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem 
                                    icon={<Class sx={{ fontSize: 24 }} />}
                                    label="Assigned Class"
                                    value={teachSclass?.sclassName}
                                    color="#ff9800"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem 
                                    icon={<Subject sx={{ fontSize: 24 }} />}
                                    label="Teaching Subject"
                                    value={teachSubject?.subName}
                                    color="#9c27b0"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InfoItem 
                                    icon={<School sx={{ fontSize: 24 }} />}
                                    label="School"
                                    value={teachSchool?.schoolName}
                                    color="#f44336"
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                            <Button
                                variant="contained"
                                startIcon={<Edit />}
                                onClick={() => setEditDialog(true)}
                                sx={{
                                    background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 15px rgba(23, 158, 75, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)',
                                        boxShadow: '0 6px 20px rgba(23, 158, 75, 0.4)',
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Teaching Statistics & Quick Info */}
                <Grid item xs={12} md={4}>
                    {/* Teaching Stats */}
                    <Card 
                        sx={{ 
                            mb: 3,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(23, 158, 75, 0.3)'
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Teaching Statistics
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Assignment sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2">
                                    Subject: {teachSubject?.subName || 'Not assigned'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Class sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2">
                                    Class: {teachSclass?.sclassName || 'Not assigned'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <School sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2">
                                    School: {teachSchool?.schoolName || 'Not assigned'}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Account Status */}
                    <Card 
                        sx={{ 
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #2196f3, #1976d2)',
                            color: 'white',
                            boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)'
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Account Status
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Security sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2">
                                    Status: Active
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Person sx={{ mr: 1, fontSize: 20 }} />
                                <Typography variant="body2">
                                    Role: Teacher
                                </Typography>
                            </Box>
                            <Chip 
                                label="Verified Faculty" 
                                size="small"
                                sx={{ 
                                    background: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    border: '1px solid rgba(255,255,255,0.3)'
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Edit Profile Dialog */}
            <Dialog
                open={editDialog}
                onClose={() => setEditDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700
                }}>
                    Edit Profile Information
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: <Person sx={{ mr: 1, color: '#179e4bff' }} />
                            }}
                            sx={styles.textField}
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: <Email sx={{ mr: 1, color: '#179e4bff' }} />
                            }}
                            sx={styles.textField}
                        />
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            placeholder="Leave blank to keep current password"
                            InputProps={{
                                startAdornment: <Security sx={{ mr: 1, color: '#179e4bff' }} />
                            }}
                            sx={styles.textField}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 2, p: 3 }}>
                    <Button
                        onClick={() => setEditDialog(false)}
                        variant="outlined"
                        sx={{
                            borderColor: '#179e4bff',
                            color: '#179e4bff',
                            borderRadius: 2,
                            px: 4,
                            fontWeight: 600,
                            '&:hover': {
                                background: 'rgba(23, 158, 75, 0.1)',
                                borderColor: '#179e4bff'
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                            borderRadius: 2,
                            px: 4,
                            fontWeight: 600,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)',
                            boxShadow: '0 4px 15px rgba(23, 158, 75, 0.3)'
                            }
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

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

export default TeacherProfile;