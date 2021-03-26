#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

docker-compose -f ${DIR}/../infra.dev/compose.infra.yml -f ${DIR}/../infra.dev/compose.yml stop;
