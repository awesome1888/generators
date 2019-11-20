#!/usr/bin/env bash

VENDOR="<%- vendor_name %>"
APPLICATION_NAME="<%- application_code_global %>"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VERSION="${1:-latest}"

docker build --no-cache -t ${VENDOR}/${APPLICATION_NAME}:${VERSION} -f infra/production.dockerfile .;
