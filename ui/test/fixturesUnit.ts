import { faker } from "@faker-js/faker";
import { test as base, expect } from "@playwright/experimental-ct-react";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";
import { getDefaultMSW } from "../src/api/gen/default/default.msw";

const fakerSeedNumber = 42;

export const handlers = [...getDefaultMSW()];

faker.seed(fakerSeedNumber);

const test = base.extend<{
	worker: MockServiceWorker;
}>({
	worker: createWorkerFixture(handlers),
});

export { expect, test };
