import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ForumIcon from '@mui/icons-material/Forum';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTheme } from '@emotion/react';


export default function FixedNavigation1() {
    const theme = useTheme();
    return (
        <Box sx={{ zIndex : 999, background : 'white' }}>
          <Paper  elevation={3}>
            <BottomNavigation
            showLabels
            >
              <BottomNavigationAction label="Chat" icon={<ForumIcon sx={{color:theme.palette.primary.main}} />} />
              <BottomNavigationAction label="Call" icon={<WifiCalling3Icon sx={{color:theme.palette.primary.main}} />} />
              <BottomNavigationAction label="Whatsapp" icon={<WhatsAppIcon sx={{color:theme.palette.primary.main}} />} />
            </BottomNavigation>
          </Paper>
        </Box>
      );    
}