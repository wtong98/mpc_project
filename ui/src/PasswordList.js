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

import AddPasswordModal from './AddPasswordModal';
import GetPasswordModal from './GetPasswordModal';
import { useAccountList, getPassword, deletePassword } from './request';

export default function PasswordList() {
    const [addPasswordModalOpen, setAddPasswordModalOpen] = React.useState(false);
    const [getPasswordModalOpen, setGetPasswordModalOpen] = React.useState(false);
    const [currAccount, setCurrAccount] = React.useState('');
    const [currPassword, setCurrPassword] = React.useState('');

    React.useEffect(() => {
        if (currAccount.length > 0) {
            getPassword(currAccount).then((result) => {
                setCurrPassword(result);
                setGetPasswordModalOpen(true);
            });
        }
    }, [currAccount])

    function retrieve(accountName) {
        setCurrAccount(accountName);
    }

    function deleteAccount(accountName) {
        deletePassword(accountName).then(() => {
            window.location.reload(false);
        })
    }

    const accountList = useAccountList();
    const listItems = accountList.map((entry) => (
        <ListItem disablePadding key={entry}>
            <ListItemButton onClick={() => retrieve(entry)}>
                <ListItemIcon>
                    <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={entry} />
                <IconButton onClick={() => deleteAccount(entry)}>
                    <DeleteOutlineIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    ));

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: '1rem' }}>
                <List>
                    {listItems}
                </List>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => setAddPasswordModalOpen(true)}>Add</Button>
                </div>
            </Box>
            <AddPasswordModal open={addPasswordModalOpen} setOpen={setAddPasswordModalOpen} />
            <GetPasswordModal open={getPasswordModalOpen} setOpen={setGetPasswordModalOpen} account={currAccount} password={currPassword}/>
        </>
    );
}
