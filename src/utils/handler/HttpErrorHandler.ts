class HttpException extends Error {
  public status: number;
  public message: string;
  public error_detail: string[];

  constructor(status: number, message: string, error_detail: string[] = []) {
    super(message);
    this.status = status || 500;
    this.message = message || "Something went wrong !";
    this.error_detail =
      error_detail && error_detail?.length > 0 ? error_detail : [];
  }
}

export default HttpException;
