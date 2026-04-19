import React from 'react';
import { Menu, MenuItem } from '@mui/material';

const ShareMenu = ({ open, onClose, anchorEl, recipeId }) => {
  const handleShare = (platform) => {
    console.log(`Sharing recipe ${recipeId} on ${platform}`);
    onClose();
  };

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={() => handleShare('Twitter')}>Share on Twitter</MenuItem>
      <MenuItem onClick={() => handleShare('Facebook')}>Share on Facebook</MenuItem>
      <MenuItem onClick={() => handleShare('Email')}>Share via Email</MenuItem>
    </Menu>
  );
};

export default ShareMenu;