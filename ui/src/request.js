import { useState, useEffect } from 'react';

import axios from 'axios';

const localServerUrl = 'localhost:36227';

export function usePasswordList() {
    const [passwordList, setPasswordList] = useState([]);

    useEffect(() => {
        async function getPasswords() {
            // const resp = await axios.get(localServerUrl + '/list')
            // setPasswordList(resp.data)
            const dummyPasswords = [
                {
                    pid: 0,
                    account: 'Netflix',
                    username: 'CouchPoetaetoe',
                },
                {
                    pid: 1,
                    account: 'Steam',
                    username: 'PuppyCh0w'
                },
                {
                    pid: 2,
                    account: 'Email',
                    username: 'crypto.anarchist@protonmail.com'
                }
            ]

            setPasswordList(dummyPasswords)
        }

        getPasswords();
    }, []);

    return passwordList;
}

export async function addPassword(data) {
    const resp = await axios.post(localServerUrl + '/add', data);
    return resp;
}

export function usePasswordDecrypt(pid) {

}

export function deleteAccount(pid) {

}
