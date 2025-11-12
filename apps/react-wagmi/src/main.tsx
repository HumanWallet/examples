import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router"

import App from "./App"
import { ThemeProvider } from "./components/theme-provider"
import { WagmiProviders } from "./wagmi/provider"
import "../../../packages/ui/src/styles/globals.css"
import "./polyfills"

const root = document.getElementById("root")

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <WagmiProviders>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </WagmiProviders>
  </BrowserRouter>,
)
