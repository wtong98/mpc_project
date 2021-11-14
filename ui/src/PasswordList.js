/**
 * Keeps track of the password list
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { usePasswordList } from './request';

export default function PasswordList() {
    const passwordList = usePasswordList();
    const listItems = passwordList.map((entry) => (
        <ListItem disablePadding key={entry.pid}>
            <ListItemButton>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={entry.account} />
                <IconButton>
                    <DeleteOutlineIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    ));

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: '1rem' }}>
            <List>
                {listItems}
            </List>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained">Add</Button>
            </div>
        </Box>
    );
}
