
all:
	hugo -D -d ./docs/ --minify
	./encrypt_secrets.sh ./docs/

