import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import './font.css';

export default createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#468189',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#77ACA2',
    },
    error: {
      main: '#EDF6F9',
    },
    success: {
      main: '#F4E9CD',
    },
    background: {
      default: '#9DBEBB',
    },
  },
  typography: {
    fontFamily: 'Baloo Bhai 2',
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    
      // fontWeightBold: 500,
      // button: {
      //     textTransform: 'none'
      // },
      h1: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '3rem',
        fontWeight: 800,
        color: '#468189',
      },
      h2: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#468189'
      },
      h3: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#468189'
      },
      h4: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#468189'
      },
      h5: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '1.25rem',
        fontWeight: 700,
      },
      h6: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '1rem',
        fontWeight: 700,
      },
      body1: {
        fontFamily: '"Baloo Bhai 2"',
        fontSize: '.9rem',
        fontWeight: 500,
        color: '#468189'
      }
  },
});