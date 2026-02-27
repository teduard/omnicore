import { registerSW } from "virtual:pwa-register";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import { router } from "./router.tsx";
import { AppProviders } from "./providers.tsx";
import "../index.css";

registerSW(); // create PWA

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

if (redirect) {
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(
  <>
    <AppProviders>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProviders>
  </>,
);
