import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { addPassword } from './request';

export default function AddPasswordModal(props) {
    const [accountText, setAccountText] = React.useState('');
    const [passwordText, setPasswordText] = React.useState('');

    function submitPassword() {
        const data = {
            'account': accountText,
            'password': passwordText
        };

        props.setOpen(false);
        setAccountText('');
        setPasswordText('');
        addPassword(data).then(() => {
            window.location.reload(false)
        });
    }

    return (
        <div>
            <Dialog open={props.open} onClose={() => props.setOpen(false)}>
                <DialogTitle>Add new password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="account"
                        label="Account"
                        fullWidth
                        variant="standard"
                        value={accountText}
                        onChange={(e) => setAccountText(e.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={passwordText}
                        onChange={(e) => setPasswordText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitPassword}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
