# Portfolio Website — Cypress Automation Project

Cypress test suite for Nouman Parvaiz's portfolio website, built to compare Cypress with the existing Playwright suite ([`playwright-portfolio-tests/`](../playwright-portfolio-tests)) on the same scenarios.

## Project structure

```
cypress-portfolio-tests/
├── package.json
├── cypress.config.js
├── site/                              # the portfolio website under test
│   ├── index.html
│   ├── style.css
│   └── script.js
├── cypress/
│   ├── e2e/
│   │   ├── 01-site-load-title.cy.js       # Scenario 1
│   │   ├── 02-navbar-navigation.cy.js     # Scenario 2
│   │   └── 03-contact-form-validation.cy.js # Scenario 3
│   └── support/
│       ├── commands.js                # reusable custom commands
│       └── e2e.js                     # loaded before every spec
└── COMPARISON.md                      # Cypress vs Playwright write-up
```

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
```

## 3. Requirements checklist

| Requirement | Where it's satisfied |
|---|---|
| Automate at least 3 web scenarios | 3 spec files, 11 individual test cases total |
| Use `beforeEach` or suitable hooks | Every spec uses `beforeEach(() => cy.visit(...))` |
| Positive and negative assertions | Each spec includes `[positive]` and `[negative]` labelled tests |
| Capture screenshots or videos | `cypress.config.js` → `video: true`, `screenshotOnRunFailure: true` |
| Organize test files clearly | Numbered spec files in `cypress/e2e/`, shared logic in `cypress/support/commands.js` |
| Compare Cypress with Playwright | See [`COMPARISON.md`](./COMPARISON.md) |

## Where evidence is saved

After running `npm test`:
- **Videos:** `cypress/videos/*.mp4` (one per spec file)
- **Screenshots:** `cypress/screenshots/` (auto-captured on any failure)

## Notes

- This project tests the **same portfolio site** used in the Playwright project, including the contact form with client-side validation (required fields, email format check, minimum message length).
- `cy.fillContactForm()` and `cy.submitContactForm()` are custom commands defined in `cypress/support/commands.js` — this keeps spec files readable, similar in spirit to the Page Object Model used on the Playwright side.
- To add an HTML report, install `mochawesome`: `npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator`, then set `reporter: 'mochawesome'` in `cypress.config.js`.
