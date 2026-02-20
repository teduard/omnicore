import { pipeline, env } from "@xenova/transformers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embedder: any;

env.allowLocalModels = false;
env.useBrowserCache = true;

//env.allowRemoteModels = false;

await initEmbedder();

export async function initEmbedder() {
//  env.allowLocalModels = true;
//env.useBrowserCache = true;

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