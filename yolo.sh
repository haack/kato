awk -F" " '{print $1}' places  | sort | uniq -c | sort
