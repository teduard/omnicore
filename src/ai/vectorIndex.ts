export interface VectorRecord {
  id: string;
  text: string;
  vector: Float32Array;
}

export class VectorIndex {
  private items: VectorRecord[] = [];

  private readonly MIN_SEMANTIC_SCORE = 0.4;

  add(item: VectorRecord) {
    this.items.push(item);
  }

  search(q: string, query: Float32Array, topK = 5) {
    return this.items
      .map(item => ({
        id: item.id,
        score: dot(query, item.vector),
        vector: item.vector
      }))
      .map(item => {
        if (item.id.toLocaleLowerCase().includes(q.toLocaleLowerCase())) {
            console.log("item.id:", item.id, " included search text: ", q);
            return {
                id: item.id,
                score: Math.min(1, item.score + 0.25)
            }
            }
        return item;
        })
      .sort((a, b) => b.score - a.score)
      .filter(
        r => r.score > this.MIN_SEMANTIC_SCORE
        )
      .slice(0, topK);
  }
}

function dot(a: Float32Array, b: Float32Array) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}