import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import './font.css';

export default createTheme({
  palette: {
    primary: {
      main: '#CCCCCC',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#999999',
      paper: '#ffffff',
    },
  },
  typography: {
        fontFamily: 'Open Sans',
      fontWeightBold: 500,
      button: {
          textTransform: 'none'
      },
      h1: {
        fontFamily: '"Righteous"',
        fontSize: '3rem',
        fontWeight: 500,
        color: '#000000',
      },
      h2: {
        fontFamily: '"Open Sans"',
      }
  }
});