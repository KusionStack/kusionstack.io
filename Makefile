dev:
	yarn run start

.PHONY: i18n
i18n:	
	yarn run build
	npx http-server ./build

i18n-upload:
	yarn run write-translations
	yarn run crowdin-upload

i18n-download:
	yarn run crowdin-download

check:
	yarn run write-translations
	yarn run build
	npx http-server ./build

build-dist:
	-rm -rf ./dist
	npm run build
	mv build/ dist/

commit-dist:
	git add .
	git commit -m 'chore: update dist/'

clean:
	-rm -rf ./build
