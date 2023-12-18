import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "mV0b7xJI4BPiEVnEV7TF0-pxI3GXxAX7" }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
