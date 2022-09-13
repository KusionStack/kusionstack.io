start:
	yarn run start

.PHONY: build
build:	
	yarn run build
	npx http-server ./build

check:
	yarn run write-translations
	yarn run build
	npx http-server ./build

clean:
	-rm -rf ./build
