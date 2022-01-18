export interface HashComparer {
  compare(plaintext: string, hash: string): Promise<boolean> | boolean;
}
