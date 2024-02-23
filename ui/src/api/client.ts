import { Log } from "../util/log";

const log = Log("RequestClient");

type RequestArgs = {
	url: string;
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
	params?: Record<string, unknown>;
	data?: Record<string, unknown>;
	headers?: RequestInit["headers"];
	responseType?: string;
	signal?: AbortSignal;
};

export const requestClient = async <T>({ url, method, params, data, headers, signal }: RequestArgs): Promise<T> => {
	if (typeof url === "object") {
		method = (url as RequestArgs).method;
		params = (url as RequestArgs).params;
		data = (url as RequestArgs).data;
		method = (url as RequestArgs).method;
		signal = (url as RequestArgs).signal;
		headers = (url as RequestArgs).headers;
		url = (url as RequestArgs).url;
	}
	log.debug(method, url);
	let uri = `${process.env.API_URL || ""}${url}`;
	if (uri.endsWith("/")) uri = uri.slice(0, -1);
	if (params) uri += "?" + new URLSearchParams(params as Record<string, string>);
	const response = await fetch(uri, {
		method,
		headers,
		...(data ? { body: JSON.stringify(data) } : {}),
		signal,
	});

	if (!response.ok) {
		let proto = { code: response.status, message: response.statusText };
		try {
			const res = await response.json();
			proto = { ...proto, ...res };
		} catch (e) {
			// ignore error result parsing
		}
		log.warn(method, url, proto);
		return Promise.reject(proto);
	}
	return response.json();
};

export default requestClient;
