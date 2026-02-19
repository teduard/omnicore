// import * as path from "path";
// import { fileURLToPath } from "url";
// import { defineConfig } from "vite";
// import { buildThemedComponents } from "@cloudscape-design/components-themeable/theming";

// const theme = { /* your theme */ };

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   // ...
//   plugins: [
//     {
//       apply: "build",
//       async buildStart() {
//         console.log("Building Cloudscape themed components");
//         await buildThemedComponents({ theme, outputDir: path.join(__dirname, "./src/components/themed") });
//       },
//     },
//     /* your plugins */
//   ],
// });