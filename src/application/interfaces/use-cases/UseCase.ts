export interface UseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
