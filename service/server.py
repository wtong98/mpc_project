"""
Service for managing passwords with MPC
"""

from flask import Flask

app = Flask(__name__)


@app.route('/')
def main():
    return "woot!"


if __name__ == '__main__':
    app.run(debug=True, port=36227)
