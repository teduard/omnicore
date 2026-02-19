import './About.css'
import '@cloudscape-design/global-styles/index.css';
import './styles/base.scss';
import './styles/top-navigation.scss';
import LandingPageLayout from './layouts/LandingPageLayout';

import { useAi, updateAI } from './hooks';


import { engine } from './ai/searchEngine';
import React from 'react';

function Docs() {
  const [text, setText] = React.useState("Lidl, dulce");

  const {aiData} = useAi();

  const [results, setResults] = React.useState([]);

  const f = () => {
    updateAI("Uber ride to airport 43.50 RON");
  }


  const handleButton = async (q:string) => {
    const res = await engine.search(q);
    console.log("search for: ", q)
    console.log(res);

    //setResults(res);
  }

  return (
    <>
      <LandingPageLayout
        content={
          <><br/><br/><br/><br/><br/>
          docs xx
          <br/><br/><br/><br/>
          aiData: {JSON.stringify(aiData)}
          <br/><br/><br/><br/><br/><br/><br/>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
          <br/>
          <button onClick={() => handleButton(text)}>update</button>
          <br/><br/><br/><br/>
          </>
        }
        header={false}
      />
    </>
  )
}

export default Docs