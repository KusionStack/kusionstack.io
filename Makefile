start:
	yarn run start

.PHONY: build
build:	
	yarn run build
	npx http-server ./build

check:
	yarn run build
	npx http-server ./build

.PHONY: i18n
i18n:
	yarn run write-translations

clean:
	-rm -rf ./build
