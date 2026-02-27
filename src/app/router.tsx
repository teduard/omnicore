import { AppRoutes } from "../routes/index.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(AppRoutes, {
  basename: import.meta.env.BASE_URL,
});