import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, Home, AddCircle, List, Favorite, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MyCafeList
        </Typography>
        <IconButton color="inherit" component={Link} to="/">
          <Home />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/add">
          <AddCircle />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/list">
          <List />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/favorites">
          <Favorite />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/profile">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
