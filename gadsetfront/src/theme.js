import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  spacing: 8,
  palette:{
    primary:{
      main : "#000",
    },
    secondary : {
      main : "#333",
    },
    background : {
      main : "#D9D9D9",
      paper : "#E3E3E3",
    },
    buttoncolor : {
      main : '#AAA',
    }
  },
  typography :{
     body1 : {
      fontFamily  : "Work Sans",
      fontSize :'16px',
      color: '#000',
      fontStyle : 'normal',
      fontWeight : '500',
     },
     body2 : {
      color: '#333',
      fontFamily: 'Inria Sans',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight:'normal',
     },
     h4 : {
      fontFamily : "Work Sans",
      fontSize : '18px',
      fontWeight: '500',
     },
     h5 : {
      color: '#000',
fontFamily:'Work Sans',
fontSize: '20px',
fontStyle: 'normal',
fontWeight: '400',
lineHeight: 'normal',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background :'#AAA',
          borderRadius : '10px',
        },
      },
    },
    MuiTextField : {
      styleOverrides : {
        root : {
          borderRadius: '5px',
background:'#D9D9D9',
        }
      }
    },
    MuiGrid : {
      styleOverrides : {
        root : {
          marginLeft : '0px',
          marginRight : '0px',
          paddingLeft : '0px',
          paddingRight : '0px'
        },
        item : {
          root : {
            marginLeft : '0px',
            marginRight : '0px',
            paddingLeft : '0px',
            paddingRight : '0px'
          }
        }
      }
    },
  },
});

export default theme;
