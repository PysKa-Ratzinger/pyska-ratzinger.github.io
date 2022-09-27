
all:
	rm -rvf ./docs/
	hugo -D -d ./docs/ --minify
	./encrypt_secrets.sh ./docs/

