dev:
	yarn run start

check:
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
