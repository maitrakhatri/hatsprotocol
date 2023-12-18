import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import { getPublicClient } from "@wagmi/core";
import { HatsClient } from "@hatsprotocol/sdk-v1-core";

function App() {
  const { chain } = useNetwork();
  const publicClient = getPublicClient({ chainId: 5 });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const hatsClient = new HatsClient({
    chainId: chain?.id || 5,
    publicClient,
    walletClient: walletClient!,
  });

  const hatsProtocol = async () => {
    const hatId = BigInt(
      "161760091391597659884661404783576847334135720567102765703756909641728"
    );
    const hat = await hatsClient.viewHat(hatId);
    const isActive = await hatsClient.isActive(hatId);
    const isEligible = await hatsClient.isEligible({
      wearer: address!,
      hatId,
    });

    const isWearer = await hatsClient.isWearerOfHat({
      wearer: address!,
      hatId,
    });
    console.log({ hat, isActive, isEligible, isWearer });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => hatsProtocol()}>count is </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
