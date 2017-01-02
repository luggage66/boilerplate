class TypedError extends Error
{
    constructor(message) {
        super();

        this.stack = new Error().stack;
        this.message = this.constructor.name + ': ' + message;
        this.status = 500;
    }
}

export class InvalidOperationError extends TypedError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

export class AuthenticationError extends TypedError
{
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

export class AccessError extends TypedError {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}

export class RoutingError extends TypedError {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

export class InternalError extends TypedError {
    constructor(message) {
        super(message);
        this.status = 500;
    }
}
