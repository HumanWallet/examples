import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      // Only include specific polyfills that are actually needed
      include: ["buffer", "crypto", "stream", "util"],
      // Exclude polyfills that aren't needed
      exclude: ["fs", "path", "os"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@humanwallet/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router"],
          "wagmi-vendor": ["wagmi", "viem", "@tanstack/react-query"],
          "ui-vendor": ["lucide-react", "clsx", "tailwind-merge"],
          "humanwallet-vendor": ["@humanwallet/connector"],
        },
      },
    },
    // Increase chunk size warning limit since we're now splitting chunks
    chunkSizeWarningLimit: 1000,

    // Enable source maps for production debugging (optional)
    sourcemap: false,
  },
})
