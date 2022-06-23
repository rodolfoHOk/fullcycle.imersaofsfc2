import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

export function Navbar() {
  return (
    <AppBar position="static" enableColorOnDark>
      <Toolbar>
        <IconButton color="inherit" edge="start" aria-label="menu">
          <DriveEtaIcon />
        </IconButton>
        <Typography variant="h6">Code Delivery</Typography>
      </Toolbar>
    </AppBar>
  );
}
