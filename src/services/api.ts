import type { ApiErrorMessages } from '@/errors';
import {
  AuthenticationError,
  AuthorizationError,
  DuplicatedError,
  InternalServerError,
  NotFoundError,
  OperationError,
  UndefinedError,
  ValidationError
} from '@/errors';
import * as jsonUtils from '@/utils/jsonUtils';

type Params = Record<string, any>;

/**
 * Convert a `Response` which indicates an error into a mapped `Error` for each type
 * of the error.
 *
 * @param response The `Response` to be converted.
 * @returns The mapped `Error` to the error type of the specified `Response`.
 */
export async function convertResponseErrorToException(response: Response): Promise<Error> {
	const errorMessagesJson: string = await response.text();
	switch (response.status) {
    // Validation error
		case 400: {
      return new ValidationError(JSON.parse(errorMessagesJson) as ApiErrorMessages);
		}

    // Authentication error
		case 401: {
			return new AuthenticationError();
		}

    // Forbidden error
		case 403:
			return new AuthorizationError();

    // Not found error
		case 404:
      return new NotFoundError(jsonUtils.parseJson<ApiErrorMessages>(errorMessagesJson)!);

    // Duplicated error
		case 409:
      return new DuplicatedError(JSON.parse(errorMessagesJson) as ApiErrorMessages);

    // Business logic error
		case 422:
      return new OperationError(jsonUtils.parseJson<ApiErrorMessages>(errorMessagesJson)!);

    // Internal server error
		case 500:
			return new InternalServerError();

    // Undefined error
		default:
			return new UndefinedError();
	}
}

/**
 * Sends a request with the specfied `method` to the backend API's `endpointPath` with
 * the optionally specified `params` and `requestDto`.
 *
 * @param method The method of the sending request, must be one of the following: GET,
 * POST, PUT, DELETE.
 * @param endpointPath The relative path to the endpoint of the backend API.
 * @param requestDto (Optional) An object containing the data for the payload of the
 * request.
 * @param params (Optional) An object contaning the data that will be converted into a
 * `string` representing the query string and added into the final URL of the request.
 * @param delay A value specifying the minimum time that the operation
 * should wait before returning the response. This is for user experience enhancement.
 * @returns A `Task` which resolves to a `Response` instance containing the data in
 * the response from the server.
 */
export async function executeAsync(
  method: string,
  endpointPath: string,
  requestDto?: object,
  params?: Params,
  delay: number = 0
): Promise<Response> {
	// Determining the API's endpoint url.
	const isServer = typeof window === "undefined";
	let endpointUrl;
	if (isServer) {
		endpointUrl = import.meta.env.API_URL + endpointPath;
	} else {
		endpointUrl = "/api" + endpointPath;
	}

	if (params != null && getQueryString(params) != null) {
		endpointUrl += "?" + getQueryString(params);
	}

	let requestInit: RequestInit = {
		headers: { "Content-Type": "application/json" },
		credentials: "include" as RequestCredentials,
    method: method
	};
	if (requestDto) {
		requestInit = { ...requestInit, body: JSON.stringify(requestDto) };
	}

	const sendRequest = async () => fetch(endpointUrl, requestInit);
	let response: Response;
	if (!isServer) {
		[response] = await Promise.all([
			sendRequest(),
      new Promise((resolve) => setTimeout(resolve, delay))
		]);
	} else {
		response = await sendRequest();
	}

	if (response.ok) {
		return response;
	}

	throw await convertResponseErrorToException(response);
}

/**
 * Sends a GET request to the specified `endpointPath` with optionally specified `params`,
 * then parses the response body into a TypeScript/JavaScript object as the type specified
 * in the type parameter.
 *
 * @template TResponseDto The type of the object which is parsed from the response
 * body.
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @returns A `Promise` which resolves to an object as an implementation of type
 * `TResponseDto`.
 * @example getAsync<ResponseDtos.User.Detail>("user/1");
 */
export async function getAsync<TResponseDto>(
  endpointPath: string,
  params?: Params,
  delay?: number
): Promise<TResponseDto> {
	const response = await executeAsync("get", endpointPath, undefined, params, delay);
	const responseAsText = await response.text();
	return jsonUtils.parseJson<TResponseDto>(responseAsText)!;
}

/**
 * Sends a POST request to the specified `endpointPath` with the optionally specified
 * `params` and the `requestDto` object as the body, then parses the response body into a
 * TypeScript/JavaScript object as the type specified in the type parameter.
 *
 * @template TResponseDto The type of the object which is parsed from the response
 * body.
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param requestDto An object as the payload for the response body.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @example postAsync<int>("user");
 */
export async function postAsync<TResponseDto>(
  endpointPath: string,
  requestDto: object,
  params?: Params,
  delay?: number
): Promise<TResponseDto> {
	const response = await executeAsync("post", endpointPath, requestDto, params, delay);
	const responseAsText = await response.text();
	return jsonUtils.parseJson<TResponseDto>(responseAsText)!;
}

/**
 * Sends a POST request to the specified `endpointPath` with the optionally specified
 * `params` and the `requestDto` object as the body. The response will be ignored if the
 * response's status code is 201 (Created).
 *
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param requestDto An object as the payload for the response body.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @returns A `Promise` which resolves to an object as an implementation of type
 * `TResponseDto`.
 * @example postAndIgnoreAsync("user/changePasswordAsync/1");
 */
export async function postAndIgnoreAsync(
  endpointPath: string,
  requestDto: object,
  params?: Params,
  delay?: number
): Promise<void> {
	await executeAsync("post", endpointPath, requestDto, params, delay);
}

/**
 * Sends a PUT request to the specified `endpointPath` with the optionally specified `params`
 * and the `requestDto` object as the body, then parses the response body into a
 * TypeScript/JavaScript object as the type specified in the type parameter.
 *
 * @template TResponseDto The type of the object which is parsed from the response
 * body.
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param requestDto An object as the payload for the response body.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @returns A `Promise` which resolves to an object as an implementation of type
 * `TResponseDto`.
 * @example putAsync<boolean>("user/1", requestDto);
 */
export async function putAsync<TResponseDto>(
  endpointPath: string,
  requestDto: object,
  params?: Params,
  delay?: number
): Promise<TResponseDto> {
	const response = await executeAsync("put", endpointPath, requestDto, params, delay);
	const responseAsText = await response.text();
	return jsonUtils.parseJson<TResponseDto>(responseAsText)!;
}

/**
 * Sends a PUT request to the specified `endpointPath` with the optionally specified
 * `params` and the `requestDto` object as the body. The response will be ignored if the
 * response's status code is 200 (OK).
 *
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param requestDto An object as the payload for the response body.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @returns A `Promise` which resolves to an object as an implementation of type
 * `TResponseDto`.
 * @example putAndIgnoreAsync("user/1", requestDto);
 */
export async function putAndIgnoreAsync(
  endpointPath: string,
  requestDto: object,
  params?: Record<string, any>,
  delay?: number
): Promise<void> {
	await executeAsync("put", endpointPath, requestDto, params, delay);
}

/**
 * Sends a DELETE request to the specified `endpointPath` with the optionally specified
 * `params`, then parses the response body into a TypeScript/JavaScript object as the type
 * specified in the type parameter.
 *
 * @template TResponseDto The type of the object which is parsed from the response
 * body.
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @returns A `Promise` which resolves to an object as an implementation of type
 * `TResponseDto`.
 * @example deleteAsync<boolean>("user/1");
 */
export async function deleteAsync<TResponseDto>(
  endpointPath: string,
  params?: Params,
  delay?: number
): Promise<TResponseDto> {
	const response = await executeAsync("delete", endpointPath, undefined, params, delay);
	const responseAsText = await response.text();
	return jsonUtils.parseJson<TResponseDto>(responseAsText)!;
}

/**
 * Sends a DELETE request to the specified `endpointPath` with the optionally specified
 * `params`. The response will be ignored if the response's status code is 200 (OK).
 *
 * @param endpointPath The path of the api's endpoint to send the request.
 * @param params (Optional) An object containing the data which will be converted
 * into a query string and added into the request's url.
 * @param delay (Optional, default: 300) A value specifying the minimum time that the
 * operation should wait before returning the response. This is for user experience
 * enhancement.
 * @returns A `Promise` which resolves to an object as an implementation of type
 * `TResponseDto`.
 * @example deleteAndIgnoreAysnc("user/1");
 */
export async function deleteAndIgnoreAsync(
  endpointPath: string,
  params?: Params,
  delay?: number
): Promise<void> {
	await executeAsync("delete", endpointPath, undefined, params, delay);
}

/**
 * Convert a TypeScript/JavaScript object into a string representing the query string which
 * plays parameter role in request URL.
 *
 * @param params A TypeScript/JavaScript `object` to be converted.
 * @param prefix A string that is added to each query key as prefix, followed by a dot.
 * @returns The converted `string` as query string.
 */
export function getQueryString<TParams extends Record<string, any>>(
  params: TParams,
  prefix: string = ''
): string {
	return Object.keys(params)
    .map((key) => {
      const value = params[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        return getQueryString(value, prefixedKey);
      } else if (value !== undefined) {
        return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`;
      }
      return '';
    })
    .filter((part) => !!part)
    .join('&');
}