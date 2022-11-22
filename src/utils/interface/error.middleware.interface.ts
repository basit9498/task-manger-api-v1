export default interface ErrorMiddleware {
  status: number;
  message: string;
  error_detail: string[];
}
