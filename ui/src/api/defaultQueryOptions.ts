const defaults = {
	retry: (failureCount: number, error: Partial<{ code: number }>) => error?.code?.toString().startsWith("4") || failureCount < 3,
	retryDelay: (attempt: number) => attempt * 1000,
	cacheTime: 15 * 60 * 1000,
	staleTime: 5 * 60 * 1000,
};

export function defaultQueryOptions<T>(opt: T) {
	return { ...defaults, ...opt } as T;
}

export default defaultQueryOptions;
