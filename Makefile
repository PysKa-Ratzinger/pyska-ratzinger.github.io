
all:
	rm -rvf ./docs/
	hugo -D -d ./docs/ --minify
	./encrypt_secrets.sh ./docs/
	find docs/posts/ \
		\( -name "*.jpg" -or -name "*.jpeg" -or -name "*.png" \) \
		-type f \
		-exec rm -v {} +

