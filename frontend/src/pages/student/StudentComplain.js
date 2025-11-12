import { useEffect, useState } from 'react';                                                                                 
import {  
    Box,  
    CircularProgress,  
    Stack,  
    TextField,  
    Typography, 
    Alert, 
    Card, 
    CardContent  
} from '@mui/material'; 
import Popup from '../../components/Popup'; 
import { BlueButton } from '../../components/buttonStyles'; 
import { addStuff } from '../../redux/userRelated/userHandle'; 
import { useDispatch, useSelector } from 'react-redux'; 
 
const StudentComplain = () => { 
    const [complaint, setComplaint] = useState(""); 
    const [date, setDate] = useState(""); 
    const [errors, setErrors] = useState({}); 
    const [showDraftAlert, setShowDraftAlert] = useState(false); 
 
    const dispatch = useDispatch(); 
    const { status, currentUser, error } = useSelector(state => state.user); 
 
    const user = currentUser._id; 
    const school = currentUser.school._id; 
    const address = "Complain"; 
 
    const [loader, setLoader] = useState(false); 
    const [message, setMessage] = useState(""); 
    const [showPopup, setShowPopup] = useState(false); 
 
    const fields = { 
        user, 
        date, 
        complaint: complaint.trim(), 
        school, 
    }; 
 
    // Load draft from localStorage on component mount 
    useEffect(() => { 
        const savedDraft = localStorage.getItem('complaintDraft'); 
        if (savedDraft) { 
            try { 
                const draft = JSON.parse(savedDraft); 
                if (draft.complaint || draft.date) { 
                    setComplaint(draft.complaint || ""); 
                    setDate(draft.date || ""); 
                    setShowDraftAlert(true); 
                } 
            } catch (error) { 
                console.error('Error loading draft:', error); 
            } 
        } 
    }, []); 
 
    // Auto-save draft to localStorage 
    useEffect(() => { 
        if (complaint || date) { 
            const draft = { complaint, date }; 
            localStorage.setItem('complaintDraft', JSON.stringify(draft)); 
        } 
    }, [complaint, date]); 
 
    const validateForm = () => { 
        const newErrors = {}; 
         
        if (!date) { 
            newErrors.date = "Date is required"; 
        } else { 
            const selectedDate = new Date(date); 
            const today = new Date(); 
            if (selectedDate > today) { 
                newErrors.date = "Date cannot be in the future"; 
            } 
        } 
         
        if (!complaint.trim()) { 
            newErrors.complaint = "Complaint description is required"; 
        } else if (complaint.trim().length < 10) { 
            newErrors.complaint = "Complaint must be at least 10 characters long"; 
        } else if (complaint.trim().length > 500) { 
            newErrors.complaint = "Complaint cannot exceed 500 characters"; 
        } 
         
        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0; 
    }; 
 
    const clearDraft = () => { 
        localStorage.removeItem('complaintDraft'); 
        setComplaint(""); 
        setDate(""); 
        setShowDraftAlert(false); 
    }; 
 
    const submitHandler = (event) => { 
        event.preventDefault(); 
        if (validateForm()) { 
            setLoader(true); 
            dispatch(addStuff(fields, address)); 
        } 
    }; 
 
    useEffect(() => { 
        if (status === "added") { 
            setLoader(false); 
            setShowPopup(true); 
            setMessage("Complaint submitted successfully! We will review your concern shortly."); 
            // Clear form and draft on successful submission 
            setComplaint(""); 
            setDate(""); 
            localStorage.removeItem('complaintDraft'); 
            setShowDraftAlert(false); 
        } else if (error) { 
            setLoader(false); 
            setShowPopup(true); 
            setMessage("Failed to submit complaint. Please check your connection and try again."); 
        } 
    }, [status, error]); 
 
    const handlePopupClose = () => { 
    setShowPopup(false); 
    };

    return ( 
    <> 
        <Box 
            sx={{ 
                flex: '1 1 auto', 
                alignItems: 'center', 
                display: 'flex', 
                justifyContent: 'center', 
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
                minHeight: '100vh', 
                py: 3 
            }} 
        > 
            <Box 
                sx={{ 
                    maxWidth: 600, 
                    width: '100%', 
                    px: 2 
                }} 
            > 
                {showDraftAlert && ( 
                    <Alert  
                        severity="info"  
                        sx={{ mb: 3 }} 
                        onClose={() => setShowDraftAlert(false)} 
                    > 
                        We found a previously saved draft of your complaint. 
                        <BlueButton  
                            size="small"  
                            sx={{ ml: 2 }} 
                            onClick={clearDraft} 
                        > 
                            Start New 
                        </BlueButton> 
                    </Alert> 
                )} 

                <Card 
                    sx={{ 
                        borderRadius: 3, 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        overflow: 'hidden' 
                    }} 
                > 
                    <CardContent sx={{ p: 0 }}> 
                        <Box 
                            sx={{ 
                                background: 'linear-gradient(135deg, #1976d2 0%, #00bcd4 100%)', 
                                color: 'white', 
                                py: 4, 
                                px: 4, 
                                textAlign: 'center' 
                            }} 
                        > 
                            <Typography  
                                variant="h4"  
                                sx={{  
                                    fontWeight: 700, 
                                    mb: 1 
                                }} 
                            > 
                                Submit Complaint 
                            </Typography> 
                            <Typography variant="body1" sx={{ opacity: 0.9 }}> 
                                Please provide detailed information about your concern 
                            </Typography> 
                        </Box> 

                        <Box sx={{ p: 4 }}> 
                            <form onSubmit={submitHandler}> 
                                <Stack spacing={3}> 
                                    <TextField 
                                        fullWidth 
                                        label="Incident Date" 
                                        type="date" 
                                        value={date} 
                                        onChange={(event) => { 
                                            setDate(event.target.value); 
                                            setErrors(prev => ({ ...prev, date: '' })); 
                                        }} 
                                        error={!!errors.date} 
                                        helperText={errors.date} 
                                        required 
                                        InputLabelProps={{ 
                                            shrink: true, 
                                        }} 
                                        inputProps={{ 
                                            max: new Date().toISOString().split('T')[0] 
                                        }} 
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { 
                                                borderRadius: 2 
                                            } 
                                        }} 
                                    /> 
                                     
                                    <TextField 
                                        fullWidth 
                                        label="Complaint Description" 
                                        variant="outlined" 
                                        value={complaint} 
                                        onChange={(event) => { 
                                            setComplaint(event.target.value); 
                                            setErrors(prev => ({ ...prev, complaint: '' })); 
                                        }} 
                                        error={!!errors.complaint} 
                                        helperText={ 
                                            errors.complaint ||  
                                            `${complaint.length}/500 characters - Minimum 10 characters required` 
                                        } 
                                        required 
                                        multiline 
                                        rows={5} 
                                        inputProps={{ 
                                            maxLength: 500 
                                        }} 
                                        placeholder="Please describe your complaint in detail. Include specific dates, times, people involved, and any other relevant information that will help us address your concern effectively." 
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': { 
                                                borderRadius: 2 
                                            } 
                                        }} 
                                    /> 
                                </Stack> 

                                <Box sx={{ mt: 4 }}> 
                                    <Typography  
                                        variant="body2"  
                                        color="text.secondary"  
                                        sx={{ mb: 2 }} 
                                    > 
                                        By submitting this complaint, you acknowledge that: 
                                    </Typography> 
                                    <Typography  
                                        variant="body2"  
                                        color="text.secondary" 
                                        sx={{  
                                            fontSize: '0.8rem', 
                                            fontStyle: 'italic' 
                                        }} 
                                    > 
                                        • You are providing accurate and truthful information<br/> 
                                        • The administration will review your complaint<br/> 
                                        • You may be contacted for additional information<br/> 
                                        • False complaints may result in disciplinary action 
                                    </Typography> 
                                </Box> 

                                <BlueButton 
                                    fullWidth 
                                    size="large" 
                                    sx={{  
                                        mt: 4, 
                                        py: 1.5, 
                                        fontSize: '1.1rem', 
                                        borderRadius: 2, 
                                        fontWeight: 600 
                                    }} 
                                    variant="contained" 
                                    type="submit" 
                                    disabled={loader} 
                                > 
                                    {loader ? ( 
                                        <CircularProgress size={24} color="inherit" /> 
                                    ) : ( 
                                        "Submit Complaint" 
                                    )} 
                                </BlueButton> 
                            </form> 
                        </Box> 
                    </CardContent> 
                </Card> 
            </Box> 
        </Box> 
         
        <Popup  
            message={message}  
            setShowPopup={setShowPopup}  
            showPopup={showPopup}  
            onClose={handlePopupClose} 
        /> 
    </> 
    ); 
}; 
 
export default StudentComplain;  