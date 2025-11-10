import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    Alert,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Avatar,
    CircularProgress
} from '@mui/material';
import {
    Send,
    Warning,
    CheckCircle,
    Error as ErrorIcon,
    Info,
    ChatBubbleOutline,
    History
} from '@mui/icons-material';

const TeacherComplain = () => {
    const [complainText, setComplainText] = useState('');
    const [complainType, setComplainType] = useState('general');
    const [priority, setPriority] = useState('medium');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Mock data for previous complaints
    const previousComplaints = [
        {
            id: 1,
            type: 'Technical',
            message: 'Projector not working in classroom 101',
            status: 'resolved',
            date: '2024-01-15',
            response: 'Issue resolved. Technician replaced the projector bulb.'
        },
        {
            id: 2,
            type: 'Administrative',
            message: 'Need additional teaching materials for Science class',
            status: 'in-progress',
            date: '2024-01-18',
            response: 'Request forwarded to department head for approval.'
        },
        {
            id: 3,
            type: 'General',
            message: 'Classroom temperature too high',
            status: 'pending',
            date: '2024-01-20',
            response: ''
        }
    ];

    const complainTypes = [
        { value: 'technical', label: 'Technical Issue', icon: '🔧' },
        { value: 'administrative', label: 'Administrative', icon: '📋' },
        { value: 'academic', label: 'Academic', icon: '📚' },
        { value: 'facility', label: 'Facility', icon: '🏫' },
        { value: 'general', label: 'General', icon: '💬' }
    ];

    const priorityLevels = [
        { value: 'low', label: 'Low', color: '#4caf50' },
        { value: 'medium', label: 'Medium', color: '#ff9800' },
        { value: 'high', label: 'High', color: '#f44336' },
        { value: 'urgent', label: 'Urgent', color: '#d32f2f' }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'resolved':
                return <CheckCircle sx={{ color: '#4caf50' }} />;
            case 'in-progress':
                return <Info sx={{ color: '#2196f3' }} />;
            case 'pending':
                return <Warning sx={{ color: '#ff9800' }} />;
            default:
                return <ErrorIcon sx={{ color: '#f44336' }} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'success';
            case 'in-progress': return 'info';
            case 'pending': return 'warning';
            default: return 'error';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!complainText.trim()) {
            setError('Please enter your complaint message');
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setMessage('Complaint submitted successfully! We will get back to you soon.');
            setComplainText('');
            setComplainType('general');
            setPriority('medium');
        } catch (err) {
            setError('Failed to submit complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    Teacher Support Portal
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Report issues, request assistance, or provide feedback
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Complaint Form */}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <ChatBubbleOutline sx={{ fontSize: 32, color: '#179e4bff', mr: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                Submit New Complaint
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {message && (
                            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                                {message}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Complaint Type */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                        Complaint Type
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {complainTypes.map((type) => (
                                            <Chip
                                                key={type.value}
                                                icon={<span>{type.icon}</span>}
                                                label={type.label}
                                                onClick={() => setComplainType(type.value)}
                                                color={complainType === type.value ? 'primary' : 'default'}
                                                variant={complainType === type.value ? 'filled' : 'outlined'}
                                                sx={{ 
                                                    mb: 1,
                                                    '&.MuiChip-filledPrimary': {
                                                        background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Grid>

                                {/* Priority Level */}
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                        Priority Level
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {priorityLevels.map((level) => (
                                            <Chip
                                                key={level.value}
                                                label={level.label}
                                                onClick={() => setPriority(level.value)}
                                                color={priority === level.value ? 'primary' : 'default'}
                                                variant={priority === level.value ? 'filled' : 'outlined'}
                                                sx={{ 
                                                    mb: 1,
                                                    borderColor: level.color,
                                                    color: priority === level.value ? 'white' : level.color,
                                                    background: priority === level.value ? level.color : 'transparent',
                                                    '&:hover': {
                                                        background: `${level.color}20`,
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Grid>

                                {/* Complaint Message */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={6}
                                        label="Describe your complaint or issue"
                                        value={complainText}
                                        onChange={(e) => setComplainText(e.target.value)}
                                        placeholder="Please provide detailed information about the issue you're facing..."
                                        variant="outlined"
                                        sx={{
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
                                        }}
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                                        sx={{
                                            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
                                            borderRadius: 2,
                                            px: 4,
                                            py: 1.5,
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)',
                                                boxShadow: '0 6px 20px rgba(23, 158, 75, 0.4)',
                                            },
                                            '&:disabled': {
                                                background: '#ccc',
                                            }
                                        }}
                                    >
                                        {loading ? 'Submitting...' : 'Submit Complaint'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>

                {/* Previous Complaints & Info */}
                <Grid item xs={12} md={4}>
                    {/* Complaint History */}
                    <Paper 
                        elevation={0}
                        sx={{ 
                            p: 3, 
                            mb: 3,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #fff3e0, #ffecb3)',
                            border: '1px solid rgba(255, 152, 0, 0.2)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <History sx={{ color: '#ff9800', mr: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Complaint History
                            </Typography>
                        </Box>
                        
                        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                            {previousComplaints.map((complaint) => (
                                <ListItem 
                                    key={complaint.id}
                                    sx={{ 
                                        mb: 2, 
                                        background: 'white',
                                        borderRadius: 2,
                                        border: '1px solid rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <ListItemIcon>
                                        {getStatusIcon(complaint.status)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    {complaint.type}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {complaint.message}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                    <Chip 
                                                        label={complaint.status} 
                                                        size="small" 
                                                        color={getStatusColor(complaint.status)}
                                                        variant="outlined"
                                                    />
                                                    <Typography variant="caption" color="textSecondary">
                                                        {complaint.date}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>

                    {/* Quick Tips */}
                    <Card 
                        sx={{ 
                            background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                            border: '1px solid rgba(33, 150, 243, 0.2)',
                            borderRadius: 3
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
                                💡 Quick Tips
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                • Be specific and provide details
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                • Include relevant class/subject information
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                • Attach screenshots if applicable
                            </Typography>
                            <Typography variant="body2">
                                • Check existing solutions in FAQ
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Support Information */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#179e4bff', mx: 'auto', mb: 1 }}>
                            <ChatBubbleOutline />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            Response Time
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Typically within 24-48 hours
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#2196f3', mx: 'auto', mb: 1 }}>
                            <CheckCircle />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            Resolution Rate
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            95% of issues resolved
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: 'center', p: 2 }}>
                        <Avatar sx={{ bgcolor: '#ff9800', mx: 'auto', mb: 1 }}>
                            <Info />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                            Support Hours
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Mon-Fri: 8:00 AM - 5:00 PM
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default TeacherComplain;