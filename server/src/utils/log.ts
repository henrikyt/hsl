/**
 * exposes all the console functions
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Console
 */
export interface ILogger extends Console {
	(message: string, ...parameters: unknown[]): void;
}

const fns = ["debug", "trace", "info", "log", "warn", "error"];

/**
 * Logger instance constructor
 */
export function Log(name: string): ILogger {
	// wrap the logger instance to allow direct calls to log function
	const fn = function (...args: unknown[]) {
		fn.log(...args);
	} as unknown as ILogger;
	Object.keys(console).forEach((key) => {
		// @ts-ignore
		fn[key as keyof ILogger] = fns.includes(key)
			? (msg, ...args) => (console[key as keyof ILogger] as any)(name + ": " + msg, ...args)
			: console[key as keyof ILogger];
	});
	return fn;
}

/**
 * Global logger instance
 */
export const Logger: ILogger = Log("");
