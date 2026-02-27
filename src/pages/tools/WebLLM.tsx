// import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { useEffect, useState } from "react";
import { logger } from "../../lib/logger";

const loadLLM:boolean = false;

// if(loadLLM) {

//   logger.debug("WebLLM loaded successfully!");

// const initProgressCallback = (progress) => {
//      logger.debug("Model loading progress:", progress);
//  };

// const engine = await CreateMLCEngine("SmolLM2-135M-Instruct-q0f32-MLC", { initProgressCallback });

// const messages = [
//     { role: "system", content: "You are a witty, data-driven financial coach. I will provide a summary of a user's monthly spending. Identify the biggest 'budget leak,' compare it to the previous month, and give one actionable tip to save $50 next month. Keep it under 200 words. " },
//     { role: "user", content: `This is the current month summary:
// "June Spending: $3,200. Groceries up 20% vs May. Subscription services cost $120. Top merchant: Amazon ($400)."` }
// ];

// const reply = await engine.chat.completions.create({
//     messages,
// });

// logger.debug(reply.choices[0].message);
// logger.debug(reply.usage);

// } else {
//   logger.debug("WebLLM not loaded!");
// }

const initProgressCallback = (progress) => {
     logger.debug("Model loading progress:", progress);
 };

function WebLLM() {
  const [engine, setEngine] = useState(null);
  
  useEffect(() => {
    if(loadLLM) {
      const initAI = async () => {
        logger.debug("webllm loading");

        const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
        const newEngine = await CreateMLCEngine("SmolLM2-135M-Instruct-q0f32-MLC", { initProgressCallback });
        //const newEngine = new CreateMLCEngine.Engine();
        setEngine(newEngine);

        const messages = [
              { role: "system", content: "You are a witty, data-driven financial coach. I will provide a summary of a user's monthly spending. Identify the biggest 'budget leak,' compare it to the previous month, and give one actionable tip to save $50 next month. Keep it under 200 words. " },
              { role: "user", content: `This is the current month summary:
          "June Spending: $3,200. Groceries up 20% vs May. Subscription services cost $120. Top merchant: Amazon ($400)."` }
          ];

          const reply = await newEngine.chat.completions.create({
              messages,
          });

          logger.debug(reply.choices[0].message);
          logger.debug(reply.usage);
      };

      initAI();
    }
  },[]);


   return (
    <>webllm <br/>loadLLM: {loadLLM ? "true" : "false"}</>
  );
}

export default WebLLM