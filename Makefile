
all: clean
	hugo -D -d ./docs/ --minify
	./encrypt_secrets.sh ./docs/
	find docs/posts/ \
		\( -name "*.jpg" -or -name "*.jpeg" -or -name "*.png" \) \
		-type f \
		-exec rm -v {} +

clean:
	rm -rvf ./docs/

serve:
	cd docs && python3 -m http.server 8080

