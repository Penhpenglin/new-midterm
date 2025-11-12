import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 280;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#179e4bff',
        color: 'white',
        fontWeight: 700,
        fontSize: '0.9rem',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        '&:last-child': {
            borderRight: 'none',
        },
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '0.875rem',
        borderRight: '1px solid rgba(0,0,0,0.1)',
        '&:last-child': {
            borderRight: 'none',
        },
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(23, 158, 75, 0.02)',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'rgba(23, 158, 75, 0.05)',
    },
    '&:hover': {
        backgroundColor: 'rgba(23, 158, 75, 0.1)',
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(23, 158, 75, 0.15)',
        transition: 'all 0.3s ease',
    },
    transition: 'all 0.3s ease',
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(135deg, #179e4bff 0%, #0d8b3aff 100%)',
    boxShadow: '0 8px 32px rgba(23, 158, 75, 0.3)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen, 
    }), 
    ...(open && {   
        marginLeft: drawerWidth,    
        width: `calc(100% - ${drawerWidth}px)`, 
        transition: theme.transitions.create(['width', 'margin'], { 
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.duration.enteringScreen,    
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { 
    shouldForwardProp: (prop) => prop !== 'open' 
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        background: 'linear-gradient(180deg, #0c2c1d 0%, #1a4d2e 100%)',
        color: 'white',
        borderRight: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '8px 0 32px rgba(0,0,0,0.2)',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 255, 136, 0.3)',
            borderRadius: '3px',
        },
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(9),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
            '& .MuiListItemText-root': {
                display: 'none',
            },
            '& .MuiListItemIcon-root': {
                minWidth: 0,
                justifyContent: 'center',
                marginRight: 'auto',
                marginLeft: 'auto',
            },
            '& .MuiListSubheader-root': {
                display: 'none',
            },
        }),
    },
}));

// Additional styled components for modern design
export const Card = styled('div')(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: theme.spacing(3),
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
}));

export const PrimaryButton = styled('button')(({ theme }) => ({
    background: 'linear-gradient(135deg, #179e4bff 0%, #0d8b3aff 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(23, 158, 75, 0.3)',
    '&:hover': {
        background: 'linear-gradient(135deg, #0d8b3aff 0%, #179e4bff 100%)',
        boxShadow: '0 6px 20px rgba(23, 158, 75, 0.4)',
        transform: 'translateY(-2px)',
    },
    '&:disabled': {
        background: '#e5e7eb',
        transform: 'none',
        boxShadow: 'none',
        cursor: 'not-allowed',
    },
}));

export const SecondaryButton = styled('button')(({ theme }) => ({
    background: 'transparent',
    border: '2px solid #179e4bff',
    borderRadius: '12px',
    padding: '10px 22px',
    color: '#179e4bff',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'rgba(23, 158, 75, 0.1)',
        borderColor: '#0d8b3aff',
        color: '#0d8b3aff',
        transform: 'translateY(-1px)',
    },
    '&:disabled': {
        borderColor: '#e5e7eb',
        color: '#9ca3af',
        cursor: 'not-allowed',
    },
}));

export const InputField = styled('input')(({ theme }) => ({
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    '&:focus': {
        outline: 'none',
        borderColor: '#179e4bff',
        boxShadow: '0 0 0 3px rgba(23, 158, 75, 0.1)',
    },
    '&:hover': {
        borderColor: '#179e4bff',
    },
}));

export const Badge = styled('span')(({ theme, variant = 'primary' }) => {
    const colors = {
        primary: {
            background: 'linear-gradient(135deg, #179e4bff, #0d8b3aff)',
            color: 'white',
        },
        secondary: {
            background: 'rgba(23, 158, 75, 0.1)',
            color: '#179e4bff',
            border: '1px solid rgba(23, 158, 75, 0.3)',
        },
        warning: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
        },
        error: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
        }
    };

    return {
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...colors[variant],
    };
});