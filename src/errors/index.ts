export type ApiErrorMessages = Record<string, string[]>;

class IncludingMessagesError extends Error {
	public readonly errorMessages: ApiErrorMessages;

	constructor(modelStateErrors: ApiErrorMessages) {
		super();
		this.errorMessages = modelStateErrors;
	}
}

// Exceptions representing request error
export class ValidationError extends IncludingMessagesError {
}

export class DuplicatedError extends IncludingMessagesError {
}

export class OperationError extends IncludingMessagesError {
}

export class BadRequestError extends IncludingMessagesError {
}

export class NotFoundError extends IncludingMessagesError {
}

export class AuthenticationError extends Error {
}

export class AuthorizationError extends Error {
}

export class ConcurrencyError extends Error {
}

export class InternalServerError extends Error {
}

export class UndefinedError extends Error {
}

export class ConnectionError extends Error {
}

export class FileTooLargeError extends Error {
}