import { logger } from "../lib/logger";
// import { pipeline, env } from "@xenova/transformers";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// let embedder: any;


// const isActive:boolean = false;

// env.allowLocalModels = false;
// env.useBrowserCache = true;

// //env.allowRemoteModels = false;

// await initEmbedder();

// export async function initEmbedder() {
// //  env.allowLocalModels = true;
// //env.useBrowserCache = true;
//   if(isActive)
//   embedder = await pipeline(
//     "feature-extraction",
//     "Xenova/all-MiniLM-L6-v2"
//   );
// }

// export async function embed(text: string): Promise<Float32Array> {
//   if(isActive) {
//   const output = await embedder(text, {
//     pooling: "mean",
//     normalize: true
//   });

//   return output.data;
//   }

//   return new Float32Array();
// }


export async function embed(text: string): Promise<Float32Array> {
  logger.debug(text)
  return new Float32Array();
}