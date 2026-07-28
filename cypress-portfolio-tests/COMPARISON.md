# Cypress vs Playwright — Comparison Summary

Both tools were used to automate the same 3 scenarios against Nouman Parvaiz's portfolio website (site load & title, navbar navigation, contact form validation), so the comparison below is based on hands-on use rather than just documentation.

## What was tested
- **Scenario 1 — Site load & title:** Verified the page title and hero content load correctly (positive), and that the title doesn't match an unrelated placeholder (negative).
- **Scenario 2 — Navbar navigation:** Verified clicking nav links scrolls to the right section (positive), a non-existent nav item is absent (negative), and the mobile hamburger menu opens/closes correctly.
- **Scenario 3 — Contact form:** Verified empty and invalid-email submissions show the correct error messages (negative), and a valid submission shows a success message and resets the form (positive).

## Comparison

| Point | Cypress | Playwright |
|---|---|---|
| **Ease of setup** | One package (`cypress`) to install; `cypress open` walks you through project scaffolding interactively. Very beginner-friendly first run. | Needs `@playwright/test` plus a separate `npx playwright install` step to download browser binaries. Slightly more steps, but still simple. |
| **Learning curve** | Chainable `cy.` syntax feels intuitive early on, and the visual Test Runner makes it easy to see what's happening. Async behaviour is hidden, which helps beginners but can confuse once you need to understand *why* Cypress auto-retries. | Uses standard `async/await`, which is more explicit and predictable once you're used to JS promises, but requires understanding `await` up front — a bit more to learn on day one. |
| **Browser support** | Runs on Chromium-based browsers, Firefox, and Edge. No WebKit/Safari support. | Runs on Chromium, Firefox, **and WebKit** (Safari engine) — genuinely cross-browser, which mattered for testing this site on more device types. |
| **Execution speed** | Fast for a single browser, but each spec runs in its own browser reload, which adds overhead when running many small spec files. | Generally faster for larger suites — supports true parallel execution across multiple browser contexts at once (this project ran 4 browser/device projects in one command). |
| **Debugging experience** | Excellent — the Test Runner shows a live, time-travel view of every command, DOM snapshots at each step, and clear error overlays. Debugging failing selectors was noticeably easier here. | Good, but more code-driven — relies on `trace` viewer, screenshots, and videos after the run rather than a live interactive runner (though `--ui` mode narrows this gap). |
| **Reporting & usability** | Built-in `mochawesome`-style reporters are easy to add; default terminal output (`spec` reporter) is clean and readable. | Built-in HTML reporter (`npx playwright show-report`) is richer out of the box — includes traces, videos, and screenshots per test without extra plugins. |

## Overall takeaway
Cypress was quicker to get comfortable with and more pleasant for debugging thanks to its visual Test Runner, making it a strong choice for smaller projects or teams newer to automation. Playwright took slightly more setup but paid off with genuine multi-browser coverage (including WebKit), faster parallel execution, and a more complete built-in HTML report — better suited for a project that needs real cross-browser confidence, like this portfolio site.

## Evidence
- **Code:** this repository (`cypress-portfolio-tests/`), pushed alongside the earlier `playwright-portfolio-tests/` project for direct comparison.
- **Execution screenshots/videos:** captured automatically under `cypress/screenshots/` and `cypress/videos/` after running `npm test`.
- **Reports:** terminal output from `npm test` (spec reporter); optionally add `mochawesome` for an HTML report (see README).
