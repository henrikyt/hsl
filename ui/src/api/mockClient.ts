import { setupWorker } from "msw";
import { getDefaultMSW } from "./gen/default/default.msw";

export const handlers = [...getDefaultMSW()];

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
