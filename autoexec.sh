#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd && echo x)"
DIR="${DIR%x}"

cd "$DIR/backend/sinatra"
bundle install

