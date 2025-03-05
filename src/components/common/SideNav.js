import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link from react-router-dom
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './styles.css';

const drawerWidth = 240;

// Example arrays describing each navigation item
const mainNavItems = [
  { text: 'Dashboard', icon: <InboxIcon />, path: '/dashboard' },
  { text: 'Activity', icon: <MailIcon />, path: '/dashboard/activity' },
  { text: 'Projects', icon: <InboxIcon />, path: '/dashboard/project' },
  { text: 'Blueprints', icon: <MailIcon />, path: '/dashboard/blueprints' },
];

const secondaryNavItems = [
  { text: 'Profile', icon: <InboxIcon />, path: '/profile' },
  { text: 'Settings', icon: <MailIcon />, path: '/settings' },
  { text: 'Logout', icon: <InboxIcon />, path: '/logout' },
];

function SideNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {mainNavItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              {/* Turn each ListItemButton into a link via component={Link} */}
              <ListItemButton
                component={Link}
                to={item.path}
                className="list-item-button"
              >
                <ListItemIcon className="list-item">{item.icon}</ListItemIcon>
                <ListItemText className="list-item" primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {secondaryNavItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                className="list-item-button"
              >
                <ListItemIcon className="list-item">{item.icon}</ListItemIcon>
                <ListItemText className="list-item" primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default SideNav;
