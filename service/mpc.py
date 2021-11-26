"""
MPC encryption routines
"""

from pathlib import Path
import subprocess
import sys

key_path = Path('service/key')
if not key_path.exists():
    key_path.mkdir()


def password_to_int(password: str):
    byte_str = bytes(password, 'ascii')
    str_length = len(password)
    raw_int = int.from_bytes(byte_str, byteorder='little')
    return raw_int * 100 + str_length   # password length must not exceed 100


def int_to_password(n: int):
    str_length = n % 100
    raw_n = n // 100
    byte_str = int.to_bytes(raw_n, length=str_length, byteorder='little')
    return byte_str.decode('ascii')


def encode(account: str, password: str):
    n_pass = password_to_int(password)
    args = [sys.executable, 'service/bin/password_enc.py', '-M3', str(n_pass)]

    acc_path = key_path / account
    if not acc_path.exists():
        acc_path.mkdir()

    env = {'ACCOUNT': str(acc_path)}
    subprocess.run(args, env=env)


def decode(account: str):
    args = [sys.executable, 'service/bin/password_dec.py', '-M3']

    acc_path = key_path / account
    result = subprocess.run(args, env={'ACCOUNT': acc_path},
                            capture_output=True, text=True)

    n_pass = result.stdout.strip().split('\n')[-1]
    password = int_to_password(int(n_pass))
    return password


if __name__ == '__main__':
    password = 'wootie woot wooterson'
    account = 'mcwoot'

    # encode(account, password)
    password = decode(account)
    print('password: ', password)
