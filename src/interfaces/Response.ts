export interface ResponseType<T = any> {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  errors?: string[] | string;
  data?: T;
}
