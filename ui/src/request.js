import { useState, useEffect } from 'react';

import axios from 'axios';

const localServerUrl = 'http://localhost:36227';

export function useAccountList() {
    const [accountList, setAccountList] = useState([]);

    useEffect(() => {
        async function getAccounts() {
            const resp = await axios.get(localServerUrl + '/list')
            setAccountList(resp.data)
        }

        getAccounts();
    }, []);

    return accountList;
}

export async function addPassword(data) {
    const resp = await axios.post(localServerUrl + '/add', data);
    return resp;
}

export async function getPassword(accountName) {
    const resp = await axios.get(localServerUrl + '/get/' + accountName);
    return resp.data;
}

export async function deletePassword(accountName) {
    const resp = await axios.get(localServerUrl + '/delete/' + accountName);
    return resp.data;
}
