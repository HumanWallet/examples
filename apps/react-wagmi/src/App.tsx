import { Routes, Route } from "react-router"

import { Header } from "./components/layout"
import Home from "./pages/home"
import MultiChain from "./pages/multi-chain"
import { NotFoundPage } from "./pages/not-found"
import { PasskeyAuthenticationPage } from "./pages/passkey-authentication"
import StakingDemo from "./pages/staking-demo"

function App() {
  return (
    <div className="grid min-h-dvh [grid-template-rows:auto_1fr_auto] sm:overflow-y-scroll">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route path="/staking-demo" element={<StakingDemo />} />
          <Route path="/multi-chain" element={<MultiChain />} />
          <Route path="/passkey-authentication" element={<PasskeyAuthenticationPage />} />

          {/* Fallback route for non-existing paths */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
