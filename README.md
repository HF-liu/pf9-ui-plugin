# Platform9 UI

This is the new home for all things Platform9 UI related.


# Getting started

`npm install`


# Running tests

We have several levels of testing: unit tests, integration tests, and end to
end tests (e2e).

Unit tests and integration tests are run through jest.

End to end tests are run through Mocha and the Selenium web driver.

If on Mac OS X, make sure to install the Selenium webdriver for chrome.  This
can be done with:

`brew install chromedriver`


## Linting tests

To run them:

`npm run lint`

We currently use `StandardJS` as our linting standard.

CI will run linting after every commit in a PR.


## Unit tests

To run them:

`npm run test:unit`

Unit tests are designed to run very fast.  Anything that can have an external
side effect is mocked out.  Jest will run the tests in parallel threads.

During active development a developer should be following a TDD (write tests
first) paradigm and running these in watch mode.

Unit tests should be run after each commit.  Ideally, locally before they are
pushed as well.

100% test coverage with unit tests is validated during tests and PRs will be
blocked unless they have 100% coverage.

CI will run unit tests after every commit in a PR.


## Integration tests

To run them:

`npm run test:integration`

Integration tests are designed to test larger swaths of the codebase.  They
should catch things that are missed by unit tests alone.

The general line between integration tests and e2e tests are that external APIs
are mocked out so there is no need for an actual server.  The API events are
either mocked out or simulated.

These tests will run in Jest and Enzyme.


## End-To-End tests

To run them:

1. Set up a test bed server.

2. Configure `config.json` to point to the correct server.  See
`config.example.json` for an example.

3. `npm run test:e2e`

End-to-end tests are run against an actual server in an actual browser.  We use
Mocha and Selenium for these tests.

A server must be provisioned before each one of these tests.  These tests are
very expensive to run (several hours) and designed to be run occasionally.
