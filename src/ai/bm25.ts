import { logger } from "../lib/logger";

export class BM25 {
  private docs: Map<string, string[]> = new Map();
  private df: Map<string, number> = new Map();
  private N = 0;

  add(id: string, text: string) {
    const tokens = tokenize(text);
    this.docs.set(id, tokens);
    this.N++;

    const unique = new Set(tokens);
    unique.forEach(token => {
      this.df.set(token, (this.df.get(token) || 0) + 1);
    });
  }

  search(query: string) {
    const tokens = tokenize(query);

    return Array.from(this.docs.entries()).map(([id, docTokens]) => {
      const score = tokens.reduce((sum, token) => {
        const tf = docTokens.filter(t => t === token).length;
        const df = this.df.get(token) || 1;
        const idf = Math.log((this.N - df + 0.5) / (df + 0.5));
        return sum + tf * idf;
      }, 0);

      return { id, score };
    });
  }

  show() {
    logger.info("bm25 docs");
    logger.info(this.docs);
  }
}

function tokenize(text: string) {
  return text.toLowerCase().split(/\W+/);
}