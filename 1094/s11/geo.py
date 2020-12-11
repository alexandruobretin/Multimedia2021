from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('geo.html')


if __name__ == '__main__':
    app.run(debug=True, ssl_context='adhoc', host='192.168.1.7', port=8030)