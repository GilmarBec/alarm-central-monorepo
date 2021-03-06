export class ErrorResponse {
    static GENERIC_ERROR = new ErrorResponse('generic-0000', 'Generic error', 500);
    static NOT_FOUND = new ErrorResponse('generic-0001', 'Generic error', 404);
    static DAO_DOCUMENT_NOT_FOUND = new ErrorResponse('generic-0001', 'Document not found', 500);

    protected constructor(
        public readonly errorCode: string,
        public readonly message: string,
        public readonly status: number = 400,
        public details?: any,
    ) {}

    public addDetails(details: any) {
        this.details = details;
        return this;
    }
}
