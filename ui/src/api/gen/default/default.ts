/**
 * Generated by orval 🍺
 * Do not edit manually.
 * HSL Realtime
 * OpenAPI spec version: 0.0.1
 */
import { useQuery } from "@tanstack/react-query";
import type { QueryFunction, QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { GetApiVehicleParams, SessionResponseSchema, TokenResponseSchema, VehiclesResponseSchema } from ".././schemas";
import { requestClient } from "../../client";
import { defaultQueryOptions } from "../../defaultQueryOptions";

export const getApiSession = (signal?: AbortSignal) => {
	return requestClient<SessionResponseSchema>({ url: `/api/session/`, method: "GET", signal });
};

export const getGetApiSessionQueryKey = () => {
	return [`/api/session/`] as const;
};

export const useGetApiSessionQueryOptions = <TData = Awaited<ReturnType<typeof getApiSession>>, TError = unknown>(options?: {
	query?: UseQueryOptions<Awaited<ReturnType<typeof getApiSession>>, TError, TData>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiSessionQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSession>>> = ({ signal }) => getApiSession(signal);

	const customOptions = defaultQueryOptions({ ...queryOptions, queryKey, queryFn });

	return customOptions as UseQueryOptions<Awaited<ReturnType<typeof getApiSession>>, TError, TData> & { queryKey: QueryKey };
};

export type GetApiSessionQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSession>>>;
export type GetApiSessionQueryError = unknown;

export const useGetApiSession = <TData = Awaited<ReturnType<typeof getApiSession>>, TError = unknown>(options?: {
	query?: UseQueryOptions<Awaited<ReturnType<typeof getApiSession>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useGetApiSessionQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const getApiSessionToken = (signal?: AbortSignal) => {
	return requestClient<TokenResponseSchema>({ url: `/api/session/token`, method: "GET", signal });
};

export const getGetApiSessionTokenQueryKey = () => {
	return [`/api/session/token`] as const;
};

export const useGetApiSessionTokenQueryOptions = <TData = Awaited<ReturnType<typeof getApiSessionToken>>, TError = unknown>(options?: {
	query?: UseQueryOptions<Awaited<ReturnType<typeof getApiSessionToken>>, TError, TData>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiSessionTokenQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiSessionToken>>> = ({ signal }) => getApiSessionToken(signal);

	const customOptions = defaultQueryOptions({ ...queryOptions, queryKey, queryFn });

	return customOptions as UseQueryOptions<Awaited<ReturnType<typeof getApiSessionToken>>, TError, TData> & { queryKey: QueryKey };
};

export type GetApiSessionTokenQueryResult = NonNullable<Awaited<ReturnType<typeof getApiSessionToken>>>;
export type GetApiSessionTokenQueryError = unknown;

export const useGetApiSessionToken = <TData = Awaited<ReturnType<typeof getApiSessionToken>>, TError = unknown>(options?: {
	query?: UseQueryOptions<Awaited<ReturnType<typeof getApiSessionToken>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useGetApiSessionTokenQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};

export const getApiVehicle = (params: GetApiVehicleParams, signal?: AbortSignal) => {
	return requestClient<VehiclesResponseSchema>({ url: `/api/vehicle/`, method: "GET", params, signal });
};

export const getGetApiVehicleQueryKey = (params: GetApiVehicleParams) => {
	return [`/api/vehicle/`, ...(params ? [params] : [])] as const;
};

export const useGetApiVehicleQueryOptions = <TData = Awaited<ReturnType<typeof getApiVehicle>>, TError = unknown>(
	params: GetApiVehicleParams,
	options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getApiVehicle>>, TError, TData> },
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiVehicleQueryKey(params);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiVehicle>>> = ({ signal }) => getApiVehicle(params, signal);

	const customOptions = defaultQueryOptions({ ...queryOptions, queryKey, queryFn });

	return customOptions as UseQueryOptions<Awaited<ReturnType<typeof getApiVehicle>>, TError, TData> & { queryKey: QueryKey };
};

export type GetApiVehicleQueryResult = NonNullable<Awaited<ReturnType<typeof getApiVehicle>>>;
export type GetApiVehicleQueryError = unknown;

export const useGetApiVehicle = <TData = Awaited<ReturnType<typeof getApiVehicle>>, TError = unknown>(
	params: GetApiVehicleParams,
	options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getApiVehicle>>, TError, TData> },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
	const queryOptions = useGetApiVehicleQueryOptions(params, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

	query.queryKey = queryOptions.queryKey;

	return query;
};
