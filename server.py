import argparse
import logging
from typing import List

import requests
from flask import Flask, request, Response, jsonify, send_file, send_from_directory
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from nlp2 import *
import numpy as np

logger = logging.getLogger(__name__)  # pylint: disable=invalid-name


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


class ServerError(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        error_dict = dict(self.payload or ())
        error_dict['message'] = self.message
        return error_dict


def make_app(field_names: List[str] = None,
             static_dir: str = None) -> Flask:
    if static_dir is not None:
        static_dir = os.path.abspath(static_dir)
        if not os.path.exists(static_dir):
            logger.error("app directory %s does not exist, aborting", static_dir)
            sys.exit(-1)
    elif static_dir is None and field_names is None:
        print("Neither build_dir nor field_names passed. Demo won't render on this port.\n"
              "You must use nodejs + react app to interact with the server.")

    app = Flask(__name__)  # pylint: disable=invalid-name

    def handle_invalid_usage(error: ServerError) -> Response:  # pylint: disable=unused-variable
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.route('/')
    def index() -> Response:  # pylint: disable=unused-variable
        if static_dir is not None:
            return send_file(os.path.join(static_dir, 'index.html'))

    @app.route('/TAP/patent/KCM/W2V', methods=['GET'])
    def w2v() -> Response:
        result = requests.get(os.environ["USPTO"] + "/TAP/patent/KCM/W2V", params=request.args)
        return result.text

    @app.route('/TAP/IPC', methods=['GET'])
    def ipc() -> Response:
        result = requests.get(os.environ["IPC"] + "/TAP/IPC", params=request.args)
        return result.text

    @app.route('/<path:path>')
    def static_proxy(path: str) -> Response:  # pylint: disable=unused-variable
        if static_dir is not None:
            return send_from_directory(static_dir, path)
        else:
            raise ServerError("static_dir not specified", 404)

    return app


def main(args):
    parser = argparse.ArgumentParser(description='Serve up a simple model')

    parser.add_argument('--static-dir', type=str, help='serve index.html from this directory')
    parser.add_argument('--port', type=int, default=8000, help='port to serve the demo on')

    args = parser.parse_args(args)

    app = make_app(static_dir=args.static_dir)
    CORS(app)

    http_server = WSGIServer(('0.0.0.0', args.port), app)
    print(f"Model loaded, serving demo on port {args.port}")
    http_server.serve_forever()


if __name__ == "__main__":
    main(sys.argv[1:])
