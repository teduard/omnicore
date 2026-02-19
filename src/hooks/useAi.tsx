import { useEffect, useState } from "react";

import { pipeline, env } from "@xenova/transformers";


// interface IAIResponse {
//   message: string | null;
// }

env.allowLocalModels = false;
env.useBrowserCache = false;

console.log('✅ Pipeline function is correctly loaded: \n', pipeline);
console.log('❌ But attempting to create a pipeline fails: ');

// (async function () {
//   const pipe = await pipeline('sentiment-analysis', 'Xenova/all-MiniLM-L6-v2');
//   console.log("pipe", pipe);
// })();


(async function load () {
  const pipe = await pipeline('sentiment-analysis', 'Xenova/all-MiniLM-L6-v2');
  console.log("pipe", pipe);

  window.embedder = pipe;
  return pipe;
})();

function useAi() { 
  const [pipeline, setPipeline] = useState<object>();

  

  const [aiData, setAiData] = useState<object>(
    {
      message: "empty"
    }
  );

  const text = "Uber ride to airport 43.50 RON";


  useEffect(() => {
    if(window.embedder) {
      console.log("embedder:",window.embedder);
    }

    
  },[]);

  return {aiData};
}

const updateAI = async (text:string) => {
    await window.embedder(text, {
      pooling: "mean",
      normalize: true
    })
    // .then(r => {
    //   //const embedding = Array.from(r.data);
    //   //console.log("e length: ", embedding.length); // 384
    // })
  }

export {useAi, updateAI};