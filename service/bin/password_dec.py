"""
Decode password from key file
"""

import os
from pathlib import Path
from mpyc.runtime import mpc

parent_dir = Path(os.environ['ACCOUNT'])

password_size = 8 * 64
secbits = mpc.SecFld(2 ** password_size)

participants = list(range(len(mpc.parties)))

with open(parent_dir / f'{mpc.pid}.key') as fp:
    secret = int(fp.read())

mpc.run(mpc.start())
all_secrets = mpc.input(secbits(secret), senders=participants)

password = all_secrets[0]
for secret in all_secrets[1:]:
    password = password ^ secret

result = mpc.run(mpc.output(password, receivers=0))
mpc.run(mpc.output(secbits(0), receivers=participants[1:]))

mpc.run(mpc.shutdown())

if result != None:
    print(int(result))
