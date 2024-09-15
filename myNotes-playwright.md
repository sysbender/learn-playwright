###

- auto waiting
- jest assertion, web first assertion

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

## timeout and wait

- global time - default no

  - test timeout = 30s

    - action timeout = no
      click(), fill()
    - navigation timeout = no
      goto
    - expect timeout = 5s
      expect(locator).toHaveText("hello")

      configure timeout in playwright.config.ts

```typescript
timeout: 10000; //test
globalTimeout: 30000 //global
expect:{ timeout: 20000}
projects:[

use :{
    navigationTimeout: 123;
    actionTimeout: 456;

}
]

//
//testinfo to set timeout for suite
test(  'timeout', ()=>{
    test.setTimeout(10000)
    test.slow() // 3 times
})
page.locator('test').click({timeout:2000})

```
