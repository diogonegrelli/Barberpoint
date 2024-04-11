#!/bin/bash
echo "\n"

echo "-----Encerrando todas as operações------"

echo "\n"

echo $(sudo lsof -i :8080 | awk 'NR==2 {print $2}' | xargs kill -7)

