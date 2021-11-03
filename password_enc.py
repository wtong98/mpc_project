"""
Process to encrypt a password among m parties
"""

import sys
from mpyc.runtime import mpc

password_size = 8   # upto to 256 bit password
secbits = mpc.SecFld(2 ** password_size)
password = 0

participants = list(range(len(mpc.parties)))

if mpc.pid == 0:   # local user
    # specify as number for now, will need proper hashing later
    password = int(sys.argv[1])

mpc.run(mpc.start())
sec_pass = mpc.input(secbits(password), senders=participants)

rand_bits = [mpc.random._randbelow(secbits, 2 ** password_size)
             for _ in participants[1:]]

sec_pass = sec_pass[0]
for p, rand_str in zip(participants[1:], rand_bits):
    sec_pass = sec_pass ^ rand_str

results = []
results.append(mpc.run(mpc.output(sec_pass, receivers=0)))

for i in participants[1:]:
    results.append(mpc.run(mpc.output(rand_bits[i-1], receivers=i)))

mpc.run(mpc.shutdown())

my_result = int(results[mpc.pid])

with open(f'{mpc.pid}.key', 'w') as fp:
    fp.write(str(my_result))
