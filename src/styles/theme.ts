import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3AADA3',
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: '#FFFFFF',
    },
    success: {
      main: '#3AADA3'
    }
  },
});

export default theme;