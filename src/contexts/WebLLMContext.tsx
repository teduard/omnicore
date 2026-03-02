import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";
import { logger } from "../lib/logger";
import { useDatabase } from "../db/hooks/useDatabase";
import { DataSourceContext } from "./DataSourceContext";

type LoadingState = "idle" | "loading" | "ready" | "error";

interface IWebLLMContextValue {
  loadingState: LoadingState;
  loadingProgress: string;
  isEnabled: boolean;
  enable: () => Promise<void>;
  disable: () => void;
  ask: (question: string, context: string) => Promise<string>;
  isMobile: () => boolean;
}

const WebLLMContext = createContext<IWebLLMContextValue | null>(null);

const MODEL = "SmolLM2-135M-Instruct-q0f32-MLC";
//const MODEL = "SmolLM2-135M-Instruct-q0f16-MLC";
//const MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

const SYSTEM_PROMPT = `You are a data-driven financial coach analysing a user's personal expense data.
When given a summary of their spending, identify patterns, flag unusual items, compare across
categories, and give one concrete actionable suggestion. Be concise - under 200 words.
Only discuss what the data shows. Do not invent figures.`;

export const WebLLMProvider = ({ children }: { children: ReactNode }) => {
  const { isReady } = useDatabase();
  const [engine, setEngine] = useState<any>(null);
  const { preferencesService } = useContext(DataSourceContext);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [loadingProgress, setLoadingProgress] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("SessionUser")) {
      setIsSessionReady(true);
    }
  }, []);

  useEffect(() => {
    const handleSessionUserStorageChange = async (event: StorageEvent) => {
      if (event.key == "SessionUser") {
        logger.debug("SessionUser event picked up: ", event);
      }

      if (event.newValue) {
        // need to check the actual value
        setIsSessionReady(true);
      } else {
        setIsSessionReady(false);
      }

      window.addEventListener("storage", handleSessionUserStorageChange);
    };

    return () =>
      window.removeEventListener("storage", handleSessionUserStorageChange);
  }, []);

  useEffect(() => {
    logger.debug("in WebLLM Context, looking into webllm");
    if (!isReady || !isSessionReady) {
      logger.debug("user session or db not ready");
      return;
    }

    preferencesService.getPreferences().then((prefs) => {
      if (prefs?.webllm) {
        enable();
      }
    });
  }, [isReady, isSessionReady]);

  const enable = useCallback(async () => {
    if (engine || loadingState === "loading") return;

    setIsEnabled(true);
    setLoadingState("loading");
    setLoadingProgress("Initialising model...");

    try {
      const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

      const newEngine = await CreateMLCEngine(MODEL, {
        initProgressCallback: (progress) => {
          logger.debug("WebLLM progress:", progress);
          setLoadingProgress(progress.text ?? "Loading...");
        },
      });

      setEngine(newEngine);
      setLoadingState("ready");
      setLoadingProgress("");
    } catch (err) {
      logger.error("WebLLM failed to load:", err);
      setLoadingState("error");
      setIsEnabled(false);
    }
  }, [engine, loadingState]);

  const disable = useCallback(() => {
    setEngine(null);
    setIsEnabled(false);
    setLoadingState("idle");
    setLoadingProgress("");
  }, []);

  const ask = useCallback(
    async (question: string, expenseContext: string): Promise<string> => {
      if (!engine || loadingState !== "ready") {
        throw new Error("Model is not loaded.");
      }

      const reply = await engine.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Expense data:\n${expenseContext}\n\nQuestion: ${question}`,
          },
        ],
      });

      return reply.choices[0].message.content ?? "";
    },
    [engine, loadingState],
  );

  const isMobile = (): boolean => {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(
      navigator.userAgent,
    );
    if (isMobile) return true;

    return false;
  }

  return (
    <WebLLMContext.Provider
      value={{ loadingState, loadingProgress, isEnabled, enable, disable, ask, isMobile }}
    >
      {children}
    </WebLLMContext.Provider>
  );
};

export const useWebLLM = () => {
  const ctx = useContext(WebLLMContext);
  if (!ctx) throw new Error("useWebLLM must be used within WebLLMProvider");
  return ctx;
};
