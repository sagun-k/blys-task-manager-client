export class ServiceError extends Error {
    public readonly statusCode: number;
    public readonly messages?: string[];
    public readonly exception?: string;
    public readonly errorId?: string;

    /**
     *
     * @param message  main error message
     * @param statusCode http status code
     * @param messages (optional) additional error messages
     * @param errorId (optional) error id (this will be mainly provided through REST API)
     */
    constructor(message: string, statusCode: number, messages?: string[], errorId?: string) {
        super(message);
        this.messages = messages;
        this.statusCode = statusCode;
        this.errorId = errorId;
    }
}
