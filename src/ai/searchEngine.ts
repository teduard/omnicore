import { VectorIndex } from "./vectorIndex";
import { BM25 } from "./bm25";
import { embed } from "./embedding";
import { fuse } from "./hybridRanker";
import { logger } from "../lib/logger";

class SearchEngine {
  private vectorIndex: VectorIndex;
  private bm25: BM25;

  constructor(vectorIndex: VectorIndex, bm25: BM25) {
    this.vectorIndex = vectorIndex;
    this.bm25 = bm25;
  }

  async search(query: string) {
    logger.info("query = ", query);

    const queryVec = await embed(query);

    const semantic = this.vectorIndex.search(query, queryVec, 20);
    const keyword = this.bm25.search(query);

    logger.info("semantic: ", semantic);
    logger.info("keyword: ", keyword);

    return fuse(semantic, keyword).slice(0, 10);
  }
}

const vector = new VectorIndex();
const bm25 = new BM25();

const data = [
  "expense 1",
  "expense 2",
  "expense 3",
];

const start = Date.now();

for (let i = 50000; i < data.length; i++) {
  const e = await embed(data[i]);

  bm25.add(data[i], data[i]);

  vector.add({
    id: data[i],
    text: data[i],
    vector: e,
  });
}

const end = Date.now();
const elapsed = end - start;
logger.info("elapsed time:", elapsed / 1000);

const engine = new SearchEngine(vector, bm25);

logger.info("vector:", vector);
logger.info("bm25:", bm25);

export { SearchEngine, engine };
