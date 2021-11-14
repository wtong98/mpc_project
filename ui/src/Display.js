import * as React from 'react';

import Container from '@mui/material/Container';

import PMAppBar from './PasswordManagerAppBar';
import PasswordList from './PasswordList';

export default function Display() {
    return (
        <div>
            <PMAppBar />
            <Container maxWidth="sm">
                <PasswordList />
            </Container>
        </div>
    );
}
