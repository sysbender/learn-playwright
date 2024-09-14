

### 
* auto waiting
* jest assertion, web first assertion


## setup

```shell
# scaffold
npm init playwright@latest

# without scaffold
npm init
npm  i -D @playwright/test
npx playwright install

# generate config
npx playwright config

```

### dotenv

```shell
npm install dotenv --save
```
## run test
### from cli
```sh
npx playwright test
npx playwright show-report

# select browser
npx playwright test --project=chrominum
# headed
npx playwright test --project=chromium --headed --slow-mo=1000
```