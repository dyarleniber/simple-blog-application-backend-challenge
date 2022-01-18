export interface JWTVerifier {
  verify(jwt: string): Promise<string | null>;
}
