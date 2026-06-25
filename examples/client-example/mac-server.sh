#!/bin/bash

# Serves a local static site so the client example can load the local build.
#
# The example references ../../dist/maze-generator-v2.js (the repo's dist/),
# which lives two levels above this folder. A static server only serves files
# under its root, so we serve from the REPO ROOT (not this folder) and open the
# example by path.
#
# Usage:
#   $ chmod +x mac-server.sh
#   $ ./mac-server.sh
#   then open: http://localhost:8000/examples/client-example/
#
# Python 2's `SimpleHTTPServer` was removed from modern macOS; use Python 3.

cd "$(dirname "$0")/../.." || exit 1
echo "Serving repo root at http://localhost:8000/"
echo "Open: http://localhost:8000/examples/client-example/"
python3 -m http.server 8000
