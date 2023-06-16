#!/usr/bin/bash
PS3="Select task number: "
select taskNumber in 01 02 03 04 05; do
  PATH_TO_FILE=$(find . -type d -name "*$taskNumber\_*")
  clear
  if [[ $taskNumber -eq 03 ]]; then
    echo "Go to folder $PATH_TO_FILE and use command 'npm run start' explicitly"
    echo "Use sub-command 'help' to read usage notes"
    exit 0
  fi
  ./scripts/npm-i.sh "$PATH_TO_FILE"
  break
done
