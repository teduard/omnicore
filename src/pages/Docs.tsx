import LandingPageLayout from "../layouts/LandingPageLayout";
import { useAi } from "../hooks";
import { engine } from "../ai/searchEngine";
import React from "react";
import { logger } from "../lib/logger";

function Docs() {
  const [text, setText] = React.useState("Lidl, dulce");

  const { aiData } = useAi();

  const handleButton = async (q: string) => {
    const res = await engine.search(q);
    logger.debug("search for: ", q);
    logger.debug(res);
  };

  return (
    <>
      <LandingPageLayout
        content={
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            docs xx
            <br />
            <br />
            <br />
            <br />
            aiData: {JSON.stringify(aiData)}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            <button onClick={() => handleButton(text)}>update</button>
            <br />
            <br />
            <br />
            <br />
          </>
        }
        header={false}
      />
    </>
  );
}

export default Docs;
