export type HttpResponse<T = any> = {
  statusCode: number;
  body?: T;
};
