#!/usr/bin/bash
PS3="Select task number: "
select task in "sort_cli" "fs_database" "telegram_mail" "weather_bot" "exchange_bot" "instagram_giveaway" "grouping-vacations" "json-sorting"; do
  PATH_TO_FILE=$(find . -type d -name "*$REPLY\_*")
  clear
  if [ $REPLY -eq 3 ]; then
    echo "Go to folder $PATH_TO_FILE and use command 'npm run start' explicitly"
    echo "Use sub-command 'help' to read usage notes"
    exit 0
  fi
  ./scripts/npm-i.sh "$PATH_TO_FILE"
  break
done
