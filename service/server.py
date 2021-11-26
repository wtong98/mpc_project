"""
Service for managing passwords with MPC
"""

import json
import shutil
from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS

from .mpc import encode, decode

app = Flask(__name__)
CORS(app)


@app.route('/add', methods=['POST'])
def add_password():
    data = request.json
    account = data['account']
    password = data['password']

    encode(account, password)
    return {'status': 'ok'}


@app.route('/get/<string:account>', methods=['GET'])
def get_password(account):
    password = decode(account)
    return password


@app.route('/list', methods=['GET'])
def get_account_list():
    key_dir = Path('service/key')
    account_paths = list(key_dir.iterdir())
    accounts = [a.name for a in account_paths]
    return jsonify(accounts)


@app.route('/delete/<string:account>', methods=['GET'])
def delete_password(account):
    key_dir = Path('service/key')
    account_path = key_dir / account

    if account_path.exists():
        shutil.rmtree(account_path)

    return {'status': 'ok'}


if __name__ == '__main__':
    app.run(debug=True, port=36227)
