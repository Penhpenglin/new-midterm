import React, { useState } from 'react';                                                                                                         
import {  
    KeyboardArrowDown,  
    KeyboardArrowUp, 
    Edit, 
    Delete, 
    School, 
    Person, 
    Email, 
    Security 
} from '@mui/icons-material' 
import { useDispatch, useSelector } from 'react-redux'; 
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle'; 
import { useNavigate } from 'react-router-dom' 
import { authLogout } from '../../redux/userRelated/userSlice'; 
import {  
    Button,  
    Collapse,  
    Box,  
    Typography,  
    Card,  
    CardContent,  
    TextField, 
    Avatar, 
    Paper, 
    Alert, 
    CircularProgress 
} from '@mui/material'; 
 
const AdminProfile = () => { 
    const [showTab, setShowTab] = useState(false); 
    const [loading, setLoading] = useState(false); 
    const buttonText = showTab ? 'Cancel' : 'Edit Profile'; 
 
    const navigate = useNavigate() 
    const dispatch = useDispatch(); 
    const { currentUser, response, error } = useSelector((state) => state.user); 
    const address = "Admin" 
 
    const [name, setName] = useState(currentUser.name); 
    const [email, setEmail] = useState(currentUser.email); 
    const [password, setPassword] = useState(""); 
    const [schoolName, setSchoolName] = useState(currentUser.schoolName); 
    const [formError, setFormError] = useState(""); 
 
    const submitHandler = async (event) => { 
        event.preventDefault(); 
        setLoading(true); 
        setFormError(""); 
 
        // Validation 
        if (!name.trim() || !email.trim() || !schoolName.trim()) { 
            setFormError("All fields are required"); 
            setLoading(false); 
            return; 
        } 
 
        if (password && password.length < 6) { 
            setFormError("Password must be at least 6 characters long"); 
            setLoading(false); 
            return; 
        } 
 
        try { 
            // Prepare fields based on whether password is provided 
            const fields = {  
                name: name.trim(),  
                email: email.trim(),  
                schoolName: schoolName.trim()  
            }; 
             
            // Only include password if it's provided and valid 
            if (password && password.length >= 6) { 
                fields.password = password; 
            } 
 
            console.log("Sending update data:", fields); // Debug log 
 
            await dispatch(updateUser(fields, currentUser._id, address)); 
             
            // Reset password field after successful update 
            setPassword(""); 
             
        } catch (err) { 
            setFormError("Update failed. Please try again."); 
            console.error("Update error:", err); 
        } finally { 
            setLoading(false); 
        } 
    } 
 
    const deleteHandler = () => { 
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) { 
            try { 
                dispatch(deleteUser(currentUser._id, "Students")); 
                dispatch(deleteUser(currentUser._id, address)); 
                dispatch(authLogout()); 
                navigate('/'); 
            } catch (error) { 
                console.error(error); 
            } 
        } 
    } 
 
    return ( 
        <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}> 
            {/* Header */} 
            <Typography  
                variant="h4"  
                sx={{  
                    mb: 4,  
                    textAlign: 'center', 
                    fontWeight: 700, 
                    background: 'linear-gradient(45deg, #179e4bff, #0d8b3aff)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                }} 
            > 
                Admin Profile 
            </Typography> 
 
            {/* Current Profile Info */} 
            <Card  
                sx={{  
                    mb: 3,  
                    borderRadius: 3, 
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 
                    overflow: 'visible' 
                }} 
            > 
                <CardContent sx={{ p: 4 }}> 
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}> 
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
                            {currentUser.name.charAt(0).toUpperCase()} 
                        </Avatar> 
                        <Box> 
                            <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3748' }}> 
                                {currentUser.name} 
                            </Typography> 
                            <Typography variant="body1" sx={{ color: '#718096' }}> 
                                Administrator 
                            </Typography> 
                        </Box> 
                    </Box> 
 
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}> 
                        <InfoItem  
                            icon={<Person sx={{ color: '#179e4bff' }} />} 
                            label="Full Name" 
                            value={currentUser.name} 
                        /> 
                        <InfoItem  
                            icon={<Email sx={{ color: '#179e4bff' }} />} 
                            label="Email Address" 
                            value={currentUser.email} 
                        /> 
                        <InfoItem  
                            icon={<School sx={{ color: '#179e4bff' }} />} 
                            label="School Name" 
                            value={currentUser.schoolName} 
                        /> 
                        <InfoItem  
                            icon={<Security sx={{ color: '#179e4bff' }} />} 
                            label="Account Type" 
                            value="Administrator" 
                        /> 
                    </Box> 
                </CardContent> 
            </Card> 
 
            {/* Action Buttons */} 
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3, flexWrap: 'wrap' }}> 
                <Button  
                    variant="contained" 
                    onClick={() => setShowTab(!showTab)} 
                    startIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />} 
                    endIcon={<Edit />} 
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
                    {buttonText} 
                </Button> 
 
                <Button  
                    variant="outlined" 
                    onClick={deleteHandler} 
                    startIcon={<Delete />} 
                    sx={{ 
                        borderColor: '#e53e3e', 
                        color: '#e53e3e', 
                        borderRadius: 2, 
                        px: 4, 
                        py: 1.5, 
                        fontWeight: 600, 
                        textTransform: 'none', 
                        fontSize: '1rem', 
                        '&:hover': { 
                            background: '#e53e3e', 
                            color: 'white', 
                            borderColor: '#e53e3e', 
                            transform: 'translateY(-2px)', 
                            boxShadow: '0 4px 15px rgba(229, 62, 62, 0.3)' 
                        }, 
                        transition: 'all 0.3s ease' 
                    }} 
                > 
                    Delete Account 
                </Button> 
            </Box> 
 
            {/* Messages */} 
            {formError && ( 
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}> 
                    {formError} 
                </Alert> 
            )} 
            {response && ( 
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}> 
                    Profile updated successfully! 
                </Alert> 
            )} 
            {error && ( 
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}> 
                    {error.message || "An error occurred during update"} 
                </Alert> 
            )} 
 
            {/* Edit Form */} 
            <Collapse in={showTab} timeout="auto" unmountOnExit> 
                <Paper  
                    sx={{  
                        p: 4,  
                        borderRadius: 3, 
                        background: 'linear-gradient(135deg, #f8fff9 0%, #f0f9ff 100%)', 
                        border: '2px dashed #179e4bff', 
                        boxShadow: '0 8px 32px rgba(23, 158, 75, 0.1)' 
                    }} 
                > 
                    <Typography  
                        variant="h5"  
                        sx={{  
                            mb: 3,  
                            textAlign: 'center', 
                            fontWeight: 600, 
                            color: '#179e4bff' 
                        }} 
                    > 
                        Update Profile Information 
                    </Typography> 
 
                    <Box component="form" onSubmit={submitHandler} sx={{ maxWidth: 500, margin: '0 auto' }}> 
                        <TextField 
                            fullWidth 
                            label="Full Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            margin="normal" 
                            required 
                            error={!name.trim()} 
                            helperText={!name.trim() ? "Name is required" : ""} 
                            InputProps={{ 
                                startAdornment: <Person sx={{ mr: 1, color: '#179e4bff' }} /> 
                            }} 
                            sx={styles.textField} 
                        /> 
 
                        <TextField 
                            fullWidth 
                            label="School Name" 
                            value={schoolName} 
                            onChange={(e) => setSchoolName(e.target.value)} 
                            margin="normal" 
                            required 
                            error={!schoolName.trim()} 
                            helperText={!schoolName.trim() ? "School name is required" : ""} 
                            InputProps={{ 
                                startAdornment: <School sx={{ mr: 1, color: '#179e4bff' }} /> 
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
                            error={!email.trim()} 
                            helperText={!email.trim() ? "Email is required" : ""} 
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
                            helperText="Minimum 6 characters" 
                            error={password.length > 0 && password.length < 6} 
                            InputProps={{ 
                                startAdornment: <Security sx={{ mr: 1, color: '#179e4bff' }} /> 
                            }} 
                            sx={styles.textField} 
                        /> 
 
                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            disabled={loading} 
                            sx={{ 
                                mt: 3, 
                                mb: 2, 
                                background: loading ? '#ccc' : 'linear-gradient(135deg, #179e4bff, #0d8b3aff)', 
                                borderRadius: 2, 
                                py: 1.5, 
                                fontWeight: 600, 
                                textTransform: 'none', 
                                fontSize: '1.1rem', 
                                boxShadow: loading ? 'none' : '0 4px 15px rgba(23, 158, 75, 0.3)', 
                                '&:hover': loading ? {} : { 
                                    background: 'linear-gradient(135deg, #0d8b3aff, #179e4bff)', 
                                    boxShadow: '0 6px 20px rgba(23, 158, 75, 0.4)', 
                                    transform: 'translateY(-2px)' 
                                }, 
                                transition: 'all 0.3s ease' 
                            }} 
                        > 
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Update Profile"} 
                        </Button> 
                    </Box> 
                </Paper> 
            </Collapse> 
        </Box> 
    ) 
} 
 
// Info Item Component 
const InfoItem = ({ icon, label, value }) => ( 
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, background: 'rgba(23, 158, 75, 0.05)' }}> 
        <Box sx={{ mr: 2 }}> 
            {icon} 
        </Box> 
        <Box> 
            <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500, fontSize: '0.8rem' }}> 
                {label} 
            </Typography> 
            <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}> 
                {value} 
            </Typography> 
        </Box> 
    </Box> 
); 
 
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
} 
 
export default AdminProfile; 