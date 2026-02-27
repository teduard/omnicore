import { useState } from "react";

// import { pipeline, env } from "@xenova/transformers";

// interface IAIResponse {
//   message: string | null;
// }

// env.allowLocalModels = false;
// env.useBrowserCache = false;

// logger.debug('✅ Pipeline function is correctly loaded: \n', pipeline);
// logger.debug('❌ But attempting to create a pipeline fails: ');

// (async function () {
//   const pipe = await pipeline('sentiment-analysis', 'Xenova/all-MiniLM-L6-v2');
//   logger.debug("pipe", pipe);
// })();


//works
// (async function load () {
//   const pipe = await pipeline('sentiment-analysis', 'Xenova/all-MiniLM-L6-v2');
//   logger.debug("pipe", pipe);

//   window.embedder = pipe;
//   return pipe;
// })();

function useAi() { 
  // const [pipeline, setPipeline] = useState<object>();

  const [aiData] = useState<object>(
    {
      message: "empty"
    }
  );

  return {aiData};
}

const updateAI = async (text:string) => {
    await window.embedder(text, {
      pooling: "mean",
      normalize: true
    })
    // .then(r => {
    //   //const embedding = Array.from(r.data);
    //   //logger.debug("e length: ", embedding.length); // 384
    // })
  }

export {useAi, updateAI};