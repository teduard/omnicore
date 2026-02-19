import { pipeline } from "@xenova/transformers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embedder: any;

await initEmbedder();

export async function initEmbedder() {
  embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );
}

export async function embed(text: string): Promise<Float32Array> {
  const output = await embedder(text, {
    pooling: "mean",
    normalize: true
  });

  return output.data;
}


