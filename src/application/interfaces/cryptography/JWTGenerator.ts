export interface JWTGenerator {
  generate(payload: string): Promise<string>;
}
