#!/bin/sh

set -u

all_ok=true

for test_file in test/*
do
  res=$(node $test_file 2>&1)
  if [ "$res" = "ok" ]; then
    echo "ok: node $test_file"
  else
    echo "failed: node $test_file"
    echo $res
    echo
    all_ok=""
  fi
done

if [ $all_ok ]; then
  echo "ALL OK"
else
  echo "FAIL!"
  exit 1
fi
