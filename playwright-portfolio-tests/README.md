# Portfolio Website — Playwright Automation Project

Automated browser test suite for Nouman Parvaiz's one-page QA portfolio website, built with [Playwright](https://playwright.dev/) using the **Page Object Model (POM)**.

## Project structure

```
playwright-portfolio-tests/
├── package.json
├── playwright.config.js
├── site/                          # the portfolio website under test
│   ├── index.html                 # now includes a real contact form
│   ├── style.css
│   └── script.js                  # includes client-side form validation
├── pages/                         # Page Object Model
│   ├── HomePage.js                # nav, hero, sections, resume button
│   └── ContactFormPage.js         # contact form fields, submit, errors
└── tests/
    ├── 01-site-load-title.spec.js         # Scenario 1
    ├── 02-navbar-navigation.spec.js       # Scenario 2
    ├── 03-contact-form-validation.spec.js # Scenario 3 (invalid input)
    ├── 04-contact-form-submission.spec.js # Scenario 4 (valid input)
    ├── 05-ui-elements-flow.spec.js        # Scenario 5
    └── 06-responsive-visibility.spec.js   # Scenario 6
```

## 1. Install dependencies

```bash
npm install
npx playwright install
```

## 2. Run the tests

```bash
npm test
```

This automatically starts a local server (`http://localhost:4173`) serving `/site`, then runs all 6 scenario files across **4 browser/device projects**: Desktop Chrome, Desktop Firefox, Mobile Chrome, and Tablet — giving cross-browser and responsive coverage in a single run.

```bash
npm run test:headed   # visible browser window
npm run test:ui       # Playwright's interactive UI mode
npm run report        # open the last HTML report
```

## 3. Requirements checklist

| Requirement | Where it's satisfied |
|---|---|
| Automate at least 5 test scenarios | 6 scenario files, 20+ individual test cases total |
| Title verification and page navigation | `01-site-load-title.spec.js`, `02-navbar-navigation.spec.js` |
| Validate form behaviour (valid + invalid inputs) | `03-contact-form-validation.spec.js` (invalid), `04-contact-form-submission.spec.js` (valid) |
| Verify important UI elements and user flows | `05-ui-elements-flow.spec.js` |
| Capture screenshots or videos of execution | `playwright.config.js` (`screenshot`/`video` on failure) + explicit full-page screenshot in `06-responsive-visibility.spec.js` |
| Generate an HTML report | `playwright.config.js` → `reporter: [['html', ...]]`; view via `npm run report` |
| Run on at least 2 browsers | `playwright.config.js` projects: Desktop Chrome + Desktop Firefox (plus Mobile Chrome + Tablet) |
| Use Page Object Model | `pages/HomePage.js`, `pages/ContactFormPage.js` — all specs interact with the site only through these objects |

## About the contact form

The original portfolio only had `mailto:`/`tel:` contact cards, which can't demonstrate real form validation. A **Full Name / Email / Message** form was added to the Contact section with client-side JavaScript validation (required fields, email format check, minimum message length) so the "valid vs invalid input" requirement has something genuine to test. There's no backend — a successful submission just shows an in-page success message and resets the form. If you later wire up a real backend or email service, update `04-contact-form-submission.spec.js` accordingly.

## Notes

- `resumeBtn` test expects a browser `alert()` since `resume.pdf` isn't bundled — add your real resume file and update/remove that test as needed.
- Screenshots and any failure artifacts (traces, videos) are saved under `test-results/`.
- To add a new page area to test, create a new Page Object in `pages/` rather than writing raw selectors inside a spec file — keeps the suite maintainable.
