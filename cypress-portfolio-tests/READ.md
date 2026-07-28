## Playwright

## 1. Install dependencies

```bash
npm install
npx playwright install
```

## 2. Run the tests

```bash
npm test
......



## Cypress
## 1. Install dependencies

```bash
npm install
```

Cypress downloads its own browser binary during install — no separate `install` command needed (unlike Playwright).

## 2. Run the tests

```bash
npm test
```

This uses `start-server-and-test` to:
1. Start a local static server on `http://localhost:4173` serving `/site`.
2. Wait until the server responds.
3. Run all specs headlessly (`cypress run`) and shut the server down afterwards.

To open Cypress's interactive Test Runner instead (recommended for debugging):

```bash
npm run test:open