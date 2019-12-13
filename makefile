default: clean build

clean-hard: 
	git clean -f -d -X
	git clean -f -d

clean: 
	find . \
		-maxdepth 1 \
		! -name src \
		! -name .gitignore \
		! -name package.json \
		! -name tsconfig.json \
		! -name tslint.json \
		! -name jest.config.js \
		! -name gulpfile.js \
		! -name yarn.lock \
		! -name webpack \
		! -name gulp \
		! -name node_modules \
		! -name .git \
		! -name __docs__ \
		! -name makefile \
		! -name . \
		! -name .. \
		-exec rm -r -f '{}' +

build:
	npx gulp build

watch:
	make build
	npx gulp watch

test:
	npx jest --passWithNoTests

test-watch:
	npx jest --watch --passWithNoTests

lint:
	npx tslint "__src__/**/*.{ts,tsx}"

lint-fix: 
	npx tslint --fix "__src__/**/*.{ts,tsx}"