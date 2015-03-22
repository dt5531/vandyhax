#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Working in directory: $DIR"
cd "$DIR/backend/sinatra" && ruby <<EOF
require 'rubygems'
require 'bundler/setup'

Bundler.with_clean_env do
  system "bundle install"
end
EOF

text -d "$DIR/backend/sinatra/tmp" || mkdir "$DIR/backend/sinatra/tmp"
touch "$DIR/backend/sinatra/tmp/restart.txt"

