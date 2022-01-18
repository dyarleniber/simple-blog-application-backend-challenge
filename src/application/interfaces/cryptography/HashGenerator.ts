export interface HashGenerator {
  hash(data: string): Promise<string> | string;
}
