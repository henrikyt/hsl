import { faker } from "@faker-js/faker";
import { test as base, expect } from "@playwright/experimental-ct-react";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";
import { http } from "msw";
const Mocks = require("../src/api/gen/default/default.msw");

const fakerSeedNumber = 42;

export const handlers = [...Mocks.getDefaultMock()];

faker.seed(fakerSeedNumber);

// wire up mock server for unit tests
const test = base.extend<{
	worker: MockServiceWorker;
	http: typeof http;
}>({
	worker: createWorkerFixture(handlers),
	http,
});

export { expect, test };
