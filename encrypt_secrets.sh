#!/bin/sh

if [[ $# -ne 1 ]]; then
	echo "Usage: $0 [folder]"
	echo ""
	echo "The script will run through every file in this folder and "
	echo "encrypt (using Pagecrypt), every file which contains the "
	echo "following tag:"
	echo "    <ENCRYPT pass='password'/>"
	echo "or:"
	echo "    <ENCRYPT pass='\$env_var'/>"
	echo ""
	echo "The tag is removed before encrypting."
	exit 0
fi

. ./secrets/env

cd $1
grep -EIRno 'ENCRYPT \${[^}]+}' . | cut -d':' -f1 | grep "posts.*html$" | uniq | while read -r line ; do
	FILE="${line}"
	PASS="$(cat $line | grep -Eo 'ENCRYPT \${[^}]+}' | head -n1 | cut -d' ' -f2- | envsubst)"
	OUTFILE="$(dirname $FILE)/.tmp.html"
	cat "$FILE" | sed 's/ENCRYPT \${[^}]\+}//g' | envsubst > "$OUTFILE"
	npx pagecrypt "$OUTFILE" "$FILE" "$PASS"
	rm "$OUTFILE"
done

