import { CreateMLCEngine } from "@mlc-ai/web-llm";



const loadLLM:boolean = false;

if(loadLLM) {

  console.log("WebLLM loaded successfully!");

const initProgressCallback = (progress) => {
     console.log("Model loading progress:", progress);
 };

const engine = await CreateMLCEngine("SmolLM2-135M-Instruct-q0f32-MLC", { initProgressCallback });

const messages = [
    { role: "system", content: "You are a witty, data-driven financial coach. I will provide a summary of a user's monthly spending. Identify the biggest 'budget leak,' compare it to the previous month, and give one actionable tip to save $50 next month. Keep it under 200 words. " },
    { role: "user", content: `This is the current month summary:
"June Spending: $3,200. Groceries up 20% vs May. Subscription services cost $120. Top merchant: Amazon ($400)."` }
];

const reply = await engine.chat.completions.create({
    messages,
});

console.log(reply.choices[0].message);
console.log(reply.usage);

} else {
  console.log("WebLLM not loaded!");
}

function WebLLM() {



   return (
    <>webllm <br/>loadLLM: {loadLLM ? "true" : "false"}</>
  );
}

export default WebLLM