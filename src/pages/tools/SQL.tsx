import React, { useEffect, useState } from "react";
import { DatabaseProvider } from "../../db/hooks/DatabaseContext.tsx";
import { useDatabase } from "../../db/hooks/useDatabase.tsx";
import { logger } from "../../lib/logger.ts";

//import { Ollama } from 'ollama';
//import { use } from "react";

//const ollama = new Ollama({ host: 'http://127.0.0.1:11434' })

async function getAI(msg: string) {
  // const response = await ollama.chat({
  //     //model: 'llama3.1',
  //     model: 'gemma3:270m',
  //     messages: [{ role: 'user', content: msg }],

  //   })

  //   return response;
  return "ok:" + msg;
}

function Content() {
  const { execute, isReady } = useDatabase();
  const [tasks, setTasks] = useState([]);

  const [c, setC] = React.useState("");

  const [d, setD] = React.useState("");
  const [msg, setMsg] = React.useState("why is the sky blue ?");

  useEffect(() => {
    if (isReady) {
      logger.debug("db isReady om SQL.tsx");
      // Initialize table if it doesn't exist
      execute(
        "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT)",
      );
      refreshTasks();
    }
  }, [isReady]);

  const refreshTasks = () => {
    const res = execute("SELECT * FROM todos");
    if (res.length > 0) {
      setTasks(res[0].values);
    }
  };

  if (!isReady) return <p>Loading Database...</p>;

  //  useEffect(() => {
  //   if (isReady) {
  //     Database.Categories.fetch();
  //   }
  //  },[isReady]);

  //gemma3:270m
  //qwen3:0.6b
  //smollm2:135m

  const handleAI = async () => {
    const r = await getAI(msg);

    logger.debug("msg:", r.message.content);
  };

  return (
    <div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.currentTarget.value)}
      ></input>
      <button onClick={handleAI}>Get msg from Ollama</button>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <input value={d} onChange={(e) => setD(e.currentTarget.value)}></input>
      <button
        onClick={() => {
          execute(`INSERT INTO todos (task) VALUES ('${d}')`);
          refreshTasks();
        }}
      >
        Add Task
      </button>
      {tasks.map((task) => (
        <div key={task[0]}>{task[1]}</div>
      ))}
      <hr />
      <button
        onClick={() => {
          execute("DELETE FROM TODOS");
          refreshTasks();
        }}
      >
        Delete all tasks
      </button>
      <hr />
      Category: {c}
      <hr />
      <button
        onClick={() => {
          // Database.Categories.fetch();
          // setC(JSON.stringify(Database.Categories));
        }}
      >
        Refresh categories
      </button>
    </div>
  );
}

function SQL() {
  return (
    <DatabaseProvider>
      <Content />
    </DatabaseProvider>
  );
}

export default SQL;
