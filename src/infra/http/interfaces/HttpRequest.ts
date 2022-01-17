export type HttpRequest<TBody = any, TParams = any, THeaders = any> = {
  body?: TBody;
  params?: TParams;
  headers?: THeaders;
};
