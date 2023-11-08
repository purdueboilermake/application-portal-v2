
export type StringFieldValidator = (input: string | null) => string | null;
export type NumberFieldValidator = (input: number) => string | null;

export const combineValidators = (validators: StringFieldValidator[]): StringFieldValidator => {

    return (value: string | null) => validators
        .map(validator => validator(value))
        .find(value => value !== null) ?? null;
}

export const nonBlankString: StringFieldValidator = (value: string | null) => {
    return value && value.trim().length > 0 ? null : 'Value must not be blank';
}

export const validEmail: StringFieldValidator = (value: string | null) => {

    if (!value || value.length === 0) {
        return null;
    }

    const emailRegex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value)
        ? null
        : 'Input is not a valid email';
}

export const maxLength = (max: number): StringFieldValidator => {
    return (value: string | null) => {
        if (!value) {
            return null;
        }

        const trimmedInput = value.trim();
        return trimmedInput.length > max
            ? `Input is ${trimmedInput.length - max} characters too long (max is ${max})`
            : null;
    }
}

export const validAge: NumberFieldValidator = (value: number) => {

    if (value <= 0) {
        return 'Input must be greater than zero';
    }

    return null;
}